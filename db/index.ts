import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db_01'
})


export const query = <T = any>(sqlStr: string, values?: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      try {
        connection.query(sqlStr, values, (err, rows, fields) => {
          if (err && err.fatal) {
            connection.destroy()
            return reject(err)
          }
          connection.release()
          if (err) {
            return reject(err)
          }
          resolve(rows as T)
        })
      } catch (e) {
        connection.release()
        reject(e)
      }
    })
  })
}