const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!', timestamp: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is working!', timestamp: new Date().toISOString() });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API test endpoint is working!', 
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

app.get('/api/data', (req, res) => {
  res.json({ 
    message: 'Data endpoint working',
    data: users,
    count: users.length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/data', (req, res) => {
  res.json({ 
    message: 'Data received successfully',
    received: req.body,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.originalUrl });
});

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
}

module.exports = app;