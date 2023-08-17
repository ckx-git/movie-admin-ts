import "reflect-metadata"
import { validate } from "class-validator";
import { Movie } from "./entities/Movie";
import { plainToClass } from 'class-transformer'

const m: any = {}
m.name = 123
m.types = ['剧情']
m.areas = 345
m.isClassic = true
m.timeLong = 2

// 将plain object转换未Movie对象

const movie = plainToClass(Movie, m)

console.log(movie, typeof movie.name)

validate(movie).then(errs => {
  console.log(errs)
})