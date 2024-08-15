/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [title, titleFunc] = useState(['남자 코트 추천','강남 우동 맛집', '파이썬독학']);
  let [like, likeFunc] = useState(0);


  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'blue' , fontSize : "12px"}}>ReactBlog</h4>
      </div>
      <div>
        <button onClick={()=>{ 
          let copytitle = [...title];
          copytitle[0] = '여자 코트 추천';
          titleFunc(copytitle);
        }}>글변경</button>
      </div>
      <div className="list">
        <h4>{ title[0] } <span onClick={ ()=>{likeFunc(like+1)} }>👍</span> {like} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;
