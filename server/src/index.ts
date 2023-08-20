import "reflect-metadata"
import Express from 'express'
import MovieRouter from './routes/MovieRoute'
import UploadRouter from './routes/UploadRoute'

const app = Express()

app.use('/upload', Express.static('public/upload'))

// 配置中间件，用于解析请求体中的json格式数据
app.use(Express.json())

// 使用postman进行测试
app.use('/api/movie', MovieRouter)

// 文件上传
// 通常情况下，服务器会提供一个统一的api接口，用于处理上传文件
app.use('/api/upload', UploadRouter)

app.listen(3000)
