const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'cropguru';
const client = new MongoClient(uri);
let db;

async function connect() {
  await client.connect();
  db = client.db(dbName);
  console.log('Connected to MongoDB:', uri, 'DB:', dbName);
}
connect().catch((e) => {
  console.error('Mongo connection error', e);
  process.exit(1);
});

const col = (name) => db.collection(name);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Chat
app.get('/api/chat', async (_req, res) => {
  const docs = await col('messages').find().sort({ _id: -1 }).limit(50).toArray();
  res.json(docs);
});
app.post('/api/chat', async (req, res) => {
  const { message, language } = req.body || {};
  const doc = { message, language, type: 'user', createdAt: new Date() };
  await col('messages').insertOne(doc);
  res.json(doc);
});

// Tasks
app.get('/api/tasks', async (_req, res) => {
  const docs = await col('tasks').find().sort({ _id: -1 }).limit(100).toArray();
  res.json(docs);
});
app.post('/api/tasks', async (req, res) => {
  const task = { ...req.body, createdAt: new Date() };
  await col('tasks').insertOne(task);
  res.json(task);
});

// Notifications (read-only stub)
app.get('/api/notifications', async (_req, res) => {
  const docs = await col('notifications').find().sort({ _id: -1 }).limit(100).toArray();
  res.json(docs);
});

// Predictions
app.get('/api/predictions', async (_req, res) => {
  const docs = await col('predictions').find().sort({ _id: -1 }).limit(50).toArray();
  res.json(docs);
});
app.post('/api/predictions/yield', async (req, res) => {
  const { crop } = req.body || {};
  const doc = { crop: crop || 'general', status: 'requested', createdAt: new Date() };
  await col('prediction_requests').insertOne(doc);
  res.json({ ok: true, request: doc });
});

// Irrigation & Alerts
app.post('/api/irrigation', async (req, res) => {
  const action = { type: 'irrigation', ...req.body, createdAt: new Date() };
  await col('actions').insertOne(action);
  res.json({ ok: true });
});
app.post('/api/alerts/weather', async (req, res) => {
  const alert = { type: 'weather', ...req.body, createdAt: new Date() };
  await col('alerts').insertOne(alert);
  res.json({ ok: true });
});

// Satellite & Weather
app.post('/api/analyze/field', async (_req, res) => {
  const doc = { startedAt: new Date(), status: 'started' };
  await col('field_analyses').insertOne(doc);
  res.json({ ok: true });
});
app.get('/api/forecast', async (req, res) => {
  const days = Number(req.query.days || 30);
  res.json({ days: Array.from({ length: days }, (_, i) => ({ day: i + 1, rain: Math.random() < 0.3 })) });
});
app.post('/api/location', async (req, res) => {
  const { location } = req.body || {};
  await col('settings').updateOne(
    { key: 'location' },
    { $set: { key: 'location', location, updatedAt: new Date() } },
    { upsert: true }
  );
  res.json({ ok: true });
});

// Disease
app.get('/api/disease/history', async (_req, res) => {
  const docs = await col('analyses').find().sort({ _id: -1 }).limit(50).toArray();
  res.json(docs);
});
app.post('/api/disease/analyze', async (req, res) => {
  const { imageBase64 } = req.body || {};
  const doc = {
    imageLen: imageBase64 ? imageBase64.length : 0,
    status: 'analyzed',
    result: { healthy: Math.random() > 0.5 },
    createdAt: new Date(),
  };
  await col('analyses').insertOne(doc);
  res.json(doc);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
