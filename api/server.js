import express from 'express';
import cors from 'cors';
import chatHandler from './chat.js';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', chatHandler);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});

