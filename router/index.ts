
import express,{Request, Response} from 'express'
import { query } from '../db/index'
const router = express.Router()

router.get('/data',async (req:Request, res:Response)=>{
  // const insertSql = 'insert into users set ?'
  // const status = await query(insertSql, { username: 'liu111222', password: '000111'})
  // if(status.name === 1){
  //   const data = await query('select * from users')
  //   console.log(data)
  // }
  const data = await query('select * from users WHERE username = ?',['liu'])
res.send(data)
})



export default router

