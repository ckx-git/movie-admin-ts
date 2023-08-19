import { validate } from "class-validator"
import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer"

export abstract class BaseEntity {
  /**
   * 验证当前电影对象
   */
  public async validateThis(skipMissing = false): Promise<string[]> {
    const errors = await validate(this, {
      skipMissingProperties: skipMissing
    })
    const temp = errors.map(e => Object.values(e.constraints!))
    const result: string[] = []
    
    temp.forEach(t => {
      result.push(...t)
    })

    return result

    /*
    errors: [
      {
        constraints: {
          IsNotEmpty: '电影名称不能为空'
        }
      },
      {
        constraints: {
          IsNotEmpty: '时长不能为空',
          IsInt: '时长必须是整数'
        }
      },
      ...
    ]
    */
  }

  /**
   * 建一个平面对象转换为Movie类的对象
   * @param plainObject 平面对象
   */
  protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject
    }
    return plainToClass(cls, plainObject)
  }
}