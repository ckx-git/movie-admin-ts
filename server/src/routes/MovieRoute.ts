import Express from 'express'
import { MovieService } from '../services/MovieService'
import { ResponseHelper } from "./ResponseHelper"

const router = Express.Router()

router.get('/:id', async (req, res) => {
  try {
    const movieid = req.params.id;
    const movie = await MovieService.findById(movieid);
    // 响应：服务器的接口的响应格式，往往是一种标准格式
    ResponseHelper.sendData(movie, res);
  }
  catch {
    ResponseHelper.sendData(null, res);
  }
})

router.post('/', (req, res) => {
  res.send('post 请求')
})

router.put('/', (req, res) => {
  res.send('put 请求')
})

router.delete('/', (req, res) => {
  res.send('delete 请求')
})

export default router