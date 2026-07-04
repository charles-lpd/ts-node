import express from 'express';
import router from './router';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// 使用内置 JSON 解析（Express >= 4.16），替代 body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 限制 CORS 来源（生产环境请替换为实际前端域名）
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});