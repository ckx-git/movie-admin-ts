import { IMovie } from "../db/MovieSchema";
import { Movie } from "../entities/Movie";
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";

export class MovieService {
  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1.类型转换
    movie = Movie.transform(movie)
    // 2.数据验证
    const errors = await movie.validateThis()
    // 3.添加数据库
    if (errors.length > 0) {
      return errors
    }
    return await MovieModel.create(movie)
  }

  public static async edit(id: string, movie: Movie): Promise<string[]> {
    // 1.类型转换
    const movieObj = Movie.transform(movie) // 为了避免将未修改的属性更新为默认值，转换后的对象只参与验证。更新时使用传过来的对象
    // 2.数据验证
    const errors = await movieObj.validateThis(true)
    // 3.添加数据库
    if (errors.length > 0) {
      return errors
    }
    await MovieModel.updateOne({_id: id}, movie)

    return []
  }

  public static async delete(id: string): Promise<void> {
    await MovieModel.deleteOne({_id: id})
  }
  
  public static async findById(id: string): Promise<IMovie | null> {
    return MovieModel.findById(id)
  }

  /**
   * 
   * @param contion page, limit, key
   */
  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
    // 1.类型转换
    const conObj = SearchCondition.transform(condition)
    // 2.数据验证
    const errors = await conObj.validateThis()
    if (errors.length > 0) {
      return {
        count: 0,
        data: [],
        errors
      }
    }
    // 3.查询
    const movies = await MovieModel.find({
      name: {$regex: new RegExp(conObj.key)}
    }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit)
    const count = await MovieModel.find({
      name: {$regex: new RegExp(conObj.key)}
    }).countDocuments()

    return {
      count,
      data: movies,
      errors: []
    }
  }
}