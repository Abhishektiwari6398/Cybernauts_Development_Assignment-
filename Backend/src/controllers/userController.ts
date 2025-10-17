import { Request, Response, NextFunction } from 'express';
import { User } from '../models/UserSchema';
import { ApiError } from '../utils/apiError';
import { computePopularityForUser, recomputePopularityForUsers } from '../services/scoreService';
import mongoose from 'mongoose';


function validateUserBody(body: any) {
  if (!body.username || typeof body.username !== 'string' || body.username.trim() === '') throw new ApiError(400, 'username required');
  if (typeof body.age !== 'number' || body.age < 0) throw new ApiError(400, 'age must be positive number');
  if (!Array.isArray(body.hobbies)) throw new ApiError(400, 'hobbies must be array');
}


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) { next(err); }
};


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateUserBody(req.body);
    const hobbies = Array.from(new Set(req.body.hobbies.map((h: any) => String(h))));
    const user = await User.create({ username: req.body.username.trim(), age: req.body.age, hobbies });
    await computePopularityForUser(user.id);
    res.status(201).json(user);
  } catch (err) { next(err); }
};


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates: any = {};
    if (req.body.username) updates.username = req.body.username.trim();
    if (req.body.age !== undefined) updates.age = req.body.age;
    if (req.body.hobbies) updates.hobbies = Array.from(new Set(req.body.hobbies.map((h: any) => String(h))));

    const user = await User.findOneAndUpdate({ id }, updates, { new: true }).lean();
    if (!user) throw new ApiError(404, 'User not found');

    if (updates.hobbies) {
      await recomputePopularityForUsers([user.id, ...(user.friends || [])]);
    } else {
      await computePopularityForUser(user.id);
    }
    res.json(user);
  } catch (err) { next(err); }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) throw new ApiError(404, 'User not found');

    if ((user.friends || []).length > 0) throw new ApiError(409, 'Cannot delete user — unlink first');

    await User.deleteOne({ id });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
};


export const linkUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  try {
    const { id } = req.params;
    const { targetId } = req.body;
    if (!targetId) throw new ApiError(400, 'targetId required');
    if (id === targetId) throw new ApiError(400, 'Cannot link self');

    const user = await User.findOne({ id }).session(session);
    const target = await User.findOne({ id: targetId }).session(session);
    if (!user || !target) throw new ApiError(404, 'User(s) not found');

    if (user.friends.includes(targetId) || target.friends.includes(id)) throw new ApiError(409, 'Users already linked');

    try {
      session.startTransaction();
      user.friends.push(targetId);
      target.friends.push(id);
      await user.save({ session });
      await target.save({ session });
      await session.commitTransaction();
    } catch {
      await session.abortTransaction();
      await User.updateOne({ id }, { $addToSet: { friends: targetId } });
      await User.updateOne({ id: targetId }, { $addToSet: { friends: id } });
    } finally { session.endSession(); }

    await recomputePopularityForUsers([id, targetId]);
    res.status(201).json({ success: true, message: 'Users linked' });
  } catch (err) { session.endSession(); next(err); }
};

export const unlinkUser = async (req: Request, res: Response, next: NextFunction) => {
  const session = await mongoose.startSession();
  try {
    const { id } = req.params;
    const { targetId } = req.body;
    
    if (!targetId) throw new ApiError(400, 'targetId required');
    if (id === targetId) throw new ApiError(400, 'Cannot unlink self');

    const user = await User.findOne({ id }).session(session);
    const target = await User.findOne({ id: targetId }).session(session);
    if (!user || !target) throw new ApiError(404, 'User(s) not found');

    if (!user.friends.includes(targetId) || !target.friends.includes(id)) {
      throw new ApiError(409, 'Users not linked');
    }

    try {
      session.startTransaction();
      user.friends = user.friends.filter(fid => fid !== targetId);
      target.friends = target.friends.filter(fid => fid !== id);
      await user.save({ session });
      await target.save({ session });
      await session.commitTransaction();
    } catch {
      await session.abortTransaction();
      await User.updateOne({ id }, { $pull: { friends: targetId } });
      await User.updateOne({ id: targetId }, { $pull: { friends: id } });
    } finally { 
      session.endSession(); 
    }

    await recomputePopularityForUsers([id, targetId]);
    res.json({ success: true, message: 'Users unlinked' });
  } catch (err) { 
    session.endSession(); 
    next(err); 
  }
};
