import mysql from 'mysql'

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'my_db_01'
})


export const query = <T = any>(sqlStr: string, values?: unknown[]): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err)
        return
      }
      try {
        connection.query(sqlStr, values, (err, rows) => {
          connection.release()
          if (err) {
            reject(err)
          } else {
            resolve(rows as T[])
          }
        })
      } catch (e) {
        connection.release()
        reject(e)
      }
    })
  })
}

export const closePool = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.end((err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}