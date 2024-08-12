import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '강남 우동 맛집';
  let [title, b] = useState('남자 코트 추천');

  return (
    <div className="App">
      <div className="black-nav">
        <h4 style={{ color: 'blue' , fontSize : "12px"}}>ReactBlog</h4>
      </div>
      <div className="list">
        <h4>{ title }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>글제목</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>글제목</h4>
        <p>2월 17일 발행</p>
      </div>
      <h4>{post}</h4>
    </div>
  );
}

export default App;
