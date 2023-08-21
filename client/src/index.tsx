import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MovieService } from './services/MovieService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// MovieService.add({
//   name: 'abc',
//   timeLong: 33,
//   types: ['喜剧'],
//   areas: ['大陆'],
//   isHot: false,
//   isComing: false,
//   isClassic: false
// }).then(res => {
//   if (res.err) {
//     console.log(res.err)
//   }
// })

MovieService.getMovies({}).then(movies => {
  movies.data.forEach(m => {
    console.log(m.name, m.types)
  })
})