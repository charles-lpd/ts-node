import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// 数据库连接池配置（密码通过环境变量传入，禁止硬编码）
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'test',
});

/**
 * 执行数据库查询
 * @param sqlStr  SQL 语句（建议使用 ? 占位符防注入）
 * @param values  参数列表
 * @returns       查询结果
 */
export const query = (sqlStr: string, values?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    // 直接使用 pool.query，内部自动管理连接，无需手动 getConnection/release
    db.query(sqlStr, values, (err, rows) => {
      if (err) {
        console.error('[DB Error]', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export default db;