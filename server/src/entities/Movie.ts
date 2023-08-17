import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min } from "class-validator";

export class Movie {
  @IsNotEmpty({ message: '电影名称不能为空' })
  @Type(() => String) // 通过装饰器将类型带入到运行时，这样通过plainToClass转换后的数据始终是指定类型。且这里的String必须是大写，因为JS中不存在string
  public name: string

  @IsNotEmpty({ message: '电影类型不能为空' })
  @ArrayMinSize(1, { message: '电影类型至少有1个' })
  @IsArray({message: '电影类型必须是数组'})
  @Type(() => String) // 如果类型是字符串数组，这里没法指定返回对应类型，class-metadata库建议这里指定为数组中每一项的类型。
  public types: string[]

  @IsNotEmpty({ message: '上映地区不能为空' })
  @ArrayMinSize(1, { message: '上映地区至少有1个' })
  @IsArray({message: '地区必须是数组'})
  @Type(() => String)
  public areas: string[]

  @IsNotEmpty({ message: '时长不能为空' })
  @IsInt({ message: '时长必须是整数' })
  @Min(1, { message: '时长最小1分钟' })
  @Max(999999, {message: '时长过长'})
  @Type(() => Number)
  public timeLong: number

  @IsNotEmpty({message: '是否热映不可以为空'})
  @Type(() => Boolean)
  public isHot: boolean = false
  
  @IsNotEmpty({message: '是否即将上映不可以为空'})
  @Type(() => Boolean)
  public isComing: boolean = false

  @IsNotEmpty({message: '是否是经典影片不可以为空'})
  @Type(() => Boolean)
  public isClassic: boolean = false

  @Type(() => String)
  public description?: string

  @Type(() => String)
  public poster?: string
}