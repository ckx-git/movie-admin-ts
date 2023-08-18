export interface ISearchResult<T> {
  count: number // 总数
  data: T[]
  errors: string[]
}