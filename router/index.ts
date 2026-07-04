import { Router, Request, Response } from 'express';
import { query } from '../db';

const router = Router();

/**
 * GET /data
 * 查询用户数据
 * 查询参数: username (可选，默认 'liu')
 * 返回: 用户信息数组
 */
router.get('/data', async (req: Request, res: Response) => {
  try {
    const username = (req.query.username as string) || 'liu';
    const data = await query('SELECT username FROM users WHERE username = ?', [username]);
    res.json(data);
  } catch (error) {
    console.error('[路由错误] /data 查询失败:', error);
    res.status(500).json({ error: '服务器内部错误' });
  }
});

export default router;