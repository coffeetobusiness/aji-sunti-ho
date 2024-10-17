// pages/api/users/[id]/todos.js

import { connectToDatabase } from '../../../../lib/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const todos = await db.collection('todos').find({ userId: id }).toArray();
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    }
  } else if (req.method === 'POST') {
    try {
      const { body } = req.body;
      const result = await db.collection('todos').insertOne({ userId: id, body });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create todo' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}