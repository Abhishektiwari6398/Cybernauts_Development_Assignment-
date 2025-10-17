import { User } from '../models/UserSchema';
import { ApiError } from '../utils/apiError';


  // popularityScore = number_of_unique_friends + (total shared hobbies * 0.5)
 
export async function computePopularityForUser(userId: string): Promise<number> {
  const user = await User.findOne({ id: userId }).lean();
  if (!user) throw new ApiError(404, 'User not found');

  const uniqueFriends = Array.from(new Set(user.friends || []));
  if (uniqueFriends.length === 0) {
    await User.updateOne({ id: userId }, { $set: { popularityScore: 0 } });
    return 0;
  }

  const friends = await User.find({ id: { $in: uniqueFriends } }).lean();
  const userHobbiesSet = new Set(user.hobbies.map(h => h.toString()));
  let sharedCount = 0;

  for (const f of friends) {
    const friendHobbiesSet = new Set(f.hobbies.map(h => h.toString()));
    for (const h of userHobbiesSet) {
      if (friendHobbiesSet.has(h)) sharedCount++;
    }
  }

  const score = uniqueFriends.length + sharedCount * 0.5;
  await User.updateOne({ id: userId }, { $set: { popularityScore: score } });
  return score;
}


  //  Recompute popularity for multiple users
 
export async function recomputePopularityForUsers(userIds: string[]) {
  await Promise.all(userIds.map(id => computePopularityForUser(id).catch(() => {})));
}
