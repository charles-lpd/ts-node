import express, { Request, Response } from 'express';
import { query } from '../db';

export const router = express.Router();

/**
 * GET /data
 * 查询用户数据
 * 响应格式: 用户记录数组
 * 示例: { "id": 1, "username": "liu", "password": "xxx" }
 */
router.get('/data', async (req: Request, res: Response) => {
  try {
    const data = await query('SELECT username, password FROM users WHERE username = ?', ['liu']);
    res.send(data);
  } catch (error) {
    console.error('[Route Error] GET /data 查询失败:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;