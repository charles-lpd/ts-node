import mysql from 'mysql';

// 数据库密码通过环境变量配置，不再硬编码
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD, // 必须通过 .env 或环境变量设置
  database: process.env.DB_NAME || 'test'
});

// 简化后的 query 函数，直接使用 pool.query 自动管理连接
export const query = (sqlStr: string, values?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(sqlStr, values, (err, rows) => {
      if (err) {
        console.error('[DB ERROR]', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};