import mysql from 'mysql'

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Lpeidong0916..',
  database: 'my_db_01'
})


export const query = (sqlStr:string, values?:any):Promise<any> => {
  return new Promise((resolve, reject)=>{
    db.getConnection((err,connection)=>{
      if(err){
        reject(err)
      }else{
        connection.query(sqlStr,values,(err,rows,fields)=>{
          if(err){
            reject(err)
          }else{
            console.log(rows)
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}