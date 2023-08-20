import Express from 'express'
import multer from 'multer'
import path from 'path'
import { ResponseHelper } from './ResponseHelper'

const router = Express.Router()

// 保存文件配置 见multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename: function (req, file, cb) {
    // 文件名 - 不能用客户端文件的原始名
    const time = new Date().getTime()
    // 后缀名
    const originalFileName = file.originalname
    const extname = path.extname(originalFileName)
    cb(null, `${time}.${extname}`)
  }
})

const allowedExtensions = [".jpg", ".png", ".gif", ".bmp", ".jiff"];
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 // 文件最多1M
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    if (allowedExtensions.includes(ext)) {
      cb(null, true)
    }
    else {
      cb(new Error('文件类型不正确'), false)
    }
  }
}).single('imgfile')

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // 发生错误
      ResponseHelper.sendError(err.message, res)
    } else {
      // 一切都好
      const url = `/upload/${req.file.filename}`
      ResponseHelper.sendData(url, res)      
    }
  })
})


export default router