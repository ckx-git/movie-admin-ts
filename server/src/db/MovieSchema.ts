import Mongoose from "mongoose";
import { Movie } from "../entities/Movie";

// 定义一个IMovie接口，这里为了少些代码，可取巧让其继承Movie类。
// 同时Mongoose里要求该接口继承Mongoose.Document，表示它是一个文档
export interface IMovie extends Movie, Mongoose.Document {

}

// 为了在使用该schema时获得ts提示，这里允许为其传入一个泛型
const movieSchema = new Mongoose.Schema<IMovie>({
  name: String,
  types: [String],
  areas: [String],
  timeLong: Number,
  isHot: Boolean,
  isComing: Boolean,
  isClassic: Boolean,
  description: String,
  poster: String
}, {
  versionKey: false
})

export default Mongoose.model<IMovie>('Movie', movieSchema)