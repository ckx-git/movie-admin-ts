import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store';
import MovieAction from './redux/actions/MovieAction';


// store.subscribe(() => {
//   console.log(store.getState())
// })

store.dispatch(MovieAction.setLoadingAction(true))
store.dispatch(MovieAction.setConditionAction({
  page: 2
}))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// action：平面对象，plain object，它描述了数据变化的方式
// reducer：数据变化的具体内容，它需要一个action来触发
// store：存储数据的仓库
// 副作用：redux-thunk、redux-saga、dva、umijs

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

