import { Router } from 'express';
import { User } from '../models/UserSchema';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().lean();
    const nodes = users.map(u => ({
      id: u.id,
      username: u.username,
      age: u.age,
      hobbies: u.hobbies,
      popularityScore: u.popularityScore,
      createdAt: u.createdAt
    }));

    const seen = new Set<string>();
    const edges: Array<{ id: string; source: string; target: string }> = [];
    for (const u of users) {
      for (const fId of u.friends) {
        const key = [u.id, fId].sort().join('--');
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ id: `e-${key}`, source: u.id, target: fId });
        }
      }
    }

    res.json({ nodes, edges });
  } catch (err) { next(err); }
});

export default router;
