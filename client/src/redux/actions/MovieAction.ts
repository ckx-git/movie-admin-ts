// action的创建函数

import { IMovie } from "../../services/MovieService"
import { IAction } from "./ActionTypes"
import { ISearchCondition } from "../../services/CommonTypes"


// 保存电影action
export type SaveMoviesAction = IAction<'movie_save', {
  movies: IMovie[]
  total: number
}>

function saveMoviesAction(movies: IMovie[], total: number): SaveMoviesAction {
  return {
    type: 'movie_save',
    payload: {
      movies,
      total
    }
  }
}

// 上面相当于下面的写法
// type SaveMoviesAction = {
//   type: 'movie_save',
//   payload: {
//     movies: IMovie[],
//     total: number
//   }
// }

// 设置加载状态action
export type SetLoadingAction = IAction<'movie_setLoading', boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction {
  return {
    type: 'movie_setLoading',
    payload: isLoading
  }
}

// 设置查询条件action
export type SetConditionAction = IAction<'movie_setConditon', ISearchCondition>

function setConditionAction(condition: ISearchCondition): SetConditionAction {
  return {
    type: 'movie_setConditon',
    payload: condition
  }
}

// 设置删除电影action
export type DeleteAction = IAction<'movie_delete', string>

function deleteAction(id: string): DeleteAction {
  return {
    type: 'movie_delete',
    payload: id
  }
}

export type MovieActions = SaveMoviesAction | SetConditionAction | SetLoadingAction | DeleteAction;

export default {
  saveMoviesAction,
  setLoadingAction,
  setConditionAction,
  deleteAction
}
