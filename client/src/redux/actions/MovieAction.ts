// action的创建函数

import { IMovie, MovieService } from "../../services/MovieService"
import { IAction } from "./ActionTypes"
import { ISearchCondition } from "../../services/CommonTypes"
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers/RootReducer"


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

// 根据条件从服务器获取电影数据
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
  return async (dispatch, getState) => {
    // 1. 设置加载状态
    dispatch(setLoadingAction(true))
    // 2. 设置条件
    dispatch(setConditionAction(condition))
    // 3. 获取服务器数据
    const curCondition = getState().movie.condition
    const res = await MovieService.getMovies(curCondition)
    // 4. 更改仓库的数据
    dispatch(saveMoviesAction(res.data, res.total))
    // 关闭加载状态
    dispatch(setLoadingAction(false))
  }
}

// 删除电影
function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
  return async (dispatch) => {
    dispatch(setLoadingAction(true))
    await MovieService.delete(id)
    dispatch(deleteAction(id)) // 删除本地仓库数据
    dispatch(setLoadingAction(false))
  }
}


export default {
  saveMoviesAction,
  setLoadingAction,
  setConditionAction,
  deleteAction,
  fetchMovies,
  deleteMovie
}
