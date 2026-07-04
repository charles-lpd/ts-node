import express from 'express';
import cors from 'cors';
import { router } from './router';

const app = express();
const PORT = process.env.PORT || 8000;

// 中间件
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json()); // Express >=4.16 自带的 JSON 解析器，无需 body-parser
app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});