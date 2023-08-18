// - 处理planObject的转换
// import "reflect-metadata"
// import { validate } from "class-validator";
// import { Movie } from "./entities/Movie";
// import { plainToClass } from 'class-transformer'

// const m: any = {}
// m.name = 123
// m.types = ['剧情']
// m.areas = 345
// m.isClassic = true
// m.timeLong = 2

// // 将plain object转换未Movie对象

// const movie = plainToClass(Movie, m)

// console.log(movie, typeof movie.name)

// validate(movie).then(errs => {
//   console.log(errs)
// })

// - mongodb 链接测试
// import "reflect-metadata"
// import { MovieModel } from "./db"

// MovieModel.find().then(ms => {
//   console.log(ms)
// })

// - Movie 验证测试
// import "reflect-metadata"
// import { Movie } from "./entities/Movie"

// const m = new Movie()
// m.name = 'abc'

// m.validateThis().then(errs => {
//   console.log(errs)
// })

// - 查找测试
// import "reflect-metadata"
// import { MovieService } from "./services/MovieService"
// import { MovieModel } from "./db";


// MovieModel.findById('64deed9fe3305922c44f9b99').then(res => {
//   console.log(res)
// })

// import "reflect-metadata"
// import { MovieModel } from "./db"
// import { Movie } from "./entities/Movie"
// import { MovieService } from "./services/MovieService"

// function getRandom(min: number, max: number) {
//   const dec = max - min

//   return Math.floor(Math.random() * dec + min)
// }

// for (let i = 0; i < 100; i++) {
//   const m = new Movie()
//   m.name = '电影' + (i + 1)
//   m.areas = ['中国大陆', '美国']
//   m.types = ['喜剧', '动作']
//   m.isClassic = true
//   m.timeLong = getRandom(70, 240)
//   MovieService.add(m)
// }

import 'reflect-metadata'
import { MovieService } from './services/MovieService'

const con: any = {
  page: 2,
  limit: 5,
  key: 1
}

MovieService.find(con).then(res => {
  if (res.errors.length) {
    console.log(res.errors)
  }
  else {
    console.log(res.data.map(item => item.name))
  }
  console.log('总数', res.count)
})