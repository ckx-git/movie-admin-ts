import { Type } from "class-transformer"
import { IsInt, Min } from "class-validator"
import { BaseEntity } from "./BaseEntity"

export class SearchCondition extends BaseEntity {
  /**
   * 页码，默认1
   */
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小值为1' })
  @Type(() => Number)
  public page: number = 1

  /**
   * 页容量（每页记录条数）
   */
  @IsInt({ message: '页容量必须是整数' })
  @Min(1, { message: '页容量最小值为1' })
  @Type(() => Number)
  public limit: number = 10

  /**
   * 搜索关键词
   */
  @Type(() => String)
  public key: string = ''

  /**
   * 建一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   */
  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject)
  }
  
}