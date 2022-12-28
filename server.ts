import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import useRouter from './router/index'
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/', useRouter)
app.listen(8000,()=>{
  console.log('测试 push 是否自动上传')
  console.log('启动')
  console.log('dddddddddd')
})
