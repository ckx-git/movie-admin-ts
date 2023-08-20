import Express from 'express'
import { MovieService } from '../services/MovieService'
import { ResponseHelper } from "./ResponseHelper"

const router = Express.Router()

// 根据ID查询电影
router.get('/:id', async (req, res) => {
  console.log(req.params.id)
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

// 分页查询
router.get('/', async (req, res) => {
  const result = await MovieService.find(req.query)
  ResponseHelper.sendPageData(result, res)
})

// 添加电影
router.post('/', async (req, res) => {
  console.log(req.body)
  const result = await MovieService.add(req.body)
  if (Array.isArray(result)) {
    ResponseHelper.sendError(result, res)
  }
  else {
    ResponseHelper.sendData(result, res)
  }
})

// 修改电影
router.put('/:id', async (req, res) => {
  try {
    const result = await MovieService.edit(req.params.id, req.body)
    if (result.length) {
      ResponseHelper.sendError(result, res)
    }
    else {
      ResponseHelper.sendData(true, res)
    }
  } catch {
    ResponseHelper.sendError('id错误', res)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await MovieService.delete(req.params.id)
    ResponseHelper.sendData(true, res)
  } catch {
    ResponseHelper.sendError('id错误', res)
  }
})

export default router