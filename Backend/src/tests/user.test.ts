import request from 'supertest';
import app from '../app';
import { User } from '../models/UserSchema';

describe('User API Logic Tests', () => {
  it('should create a user and compute popularity', async () => {
    const res = await request(app).post('/api/users').send({
      username: 'Abhishek',
      age: 22,
      hobbies: ['coding', 'reading']
    });
    expect(res.status).toBe(201);
    expect(res.body.popularityScore).toBe(0);
  });

  it('should link users and update popularity', async () => {
    const u1 = await User.create({ username: 'A', age: 20, hobbies: ['x'] });
    const u2 = await User.create({ username: 'B', age: 21, hobbies: ['x','y'] });
    
    const res = await request(app).post(`/api/users/${u1.id}/link`).send({ targetId: u2.id });
    expect(res.status).toBe(201);

    const updatedU1 = await User.findOne({ id: u1.id }).lean();
    const updatedU2 = await User.findOne({ id: u2.id }).lean();
    expect(updatedU1?.popularityScore).toBe(1 + 1*0.5);
    expect(updatedU2?.popularityScore).toBe(1 + 1*0.5);
  });

  it('should prevent deleting a linked user', async () => {
    const u1 = await User.create({ username: 'X', age: 23, hobbies: [] });
    const u2 = await User.create({ username: 'Y', age: 24, hobbies: [] });
    await request(app).post(`/api/users/${u1.id}/link`).send({ targetId: u2.id });
    
    const res = await request(app).delete(`/api/users/${u1.id}`);
    expect(res.status).toBe(409);
  });
});
