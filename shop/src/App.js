import { createContext, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js';

export let Context1 = createContext();

function App() {
  let [shoes,shoesSet] = useState(data);
  let [stock, stockSet] = useState([10,11,12]);
  let navigate = useNavigate(); // 페이지 이동도와주는
  let [name, nameSet] = useState(['shoes1.jpg','shoes2.jpg','shoes3.jpg']);
  let [more, moreSet] = useState(0);
  let [loading, loadingSet] = useState(false);
  let [nodata, nodataSet] = useState(false);
  /* console.log(shoes); */
  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
          {/*   <Link to="/">홈</Link>
            <Link to="/detail">상세페이지</Link> */}
            <Nav.Link onClick={ ()=>{
              navigate('/');
            }}>Home</Nav.Link>
            <Nav.Link onClick={ ()=>{
              navigate(-1);
            }}>-1</Nav.Link>
            <Nav.Link onClick={ ()=>{
              navigate('/detail');
            } }>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      
      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage : 'url('+ bg +')'}}></div>
            
            <div>
              <button onClick={()=>{
                let copyData = [...shoes];
                let sortData = copyData.sort((a,b)=>{
                  return a.title.localeCompare(b.title)
                });
                shoesSet(sortData);
              }}>가나다 정렬</button>
            </div>

            <div className="container">
              <div className="row">
                {/* <Card title = { shoes[index].title } price = { shoes[index].price } index = {index} key={index} /> */}
                {
                  shoes.map((data,index)=>{
                    return(
                      
                      <Card shoes = { shoes[index] } index = {index} key = {index} />
                    )
                  })
                }
              </div>
            </div>
            {
              loading ? <div style = {{backgroundColor : 'lightGray', padding : '20px'}}>
                로딩중
            </div> : null
            }
            {
              nodata ? <div style = {{backgroundColor : 'lightblue', padding : '20px'}}>
              더 상품이 없다.
            </div> : null
            }
            
            <button onClick={()=>{ 
              let moreCount = more + 1;
              if(moreCount > 2){
                nodataSet(true);
                return;
              }

              const urls = ['https://codingapple1.github.io/shop/data2.json','https://codingapple1.github.io/shop/data3.json'];
              fetchData(urls[moreCount - 1]);


              moreSet(moreCount);

              function fetchData(url){
                loadingSet(true);
                setTimeout(()=>{
                  
                  axios.get(url).then(result => {
                    let copyData = [...shoes,...result.data];
                    shoesSet(copyData);
                    loadingSet(false);
                  })
                  .catch(()=>{
                    console.log('error');
                  });
                },500);
              }
              
              // axios.post('/sadfdas',{name : 'kim'})

              // Promise.all([axios.get('/url1'), axios.get('/url2')])
              // .then(()=>{

              // })
              // axios.get('/url1')
              // axios.get('/url2')

              /*fetch('https://codingapple1.github.io/shop/data2.json')
              .then(result => {
                result.json() // JSON => array/object 변환과정 필요
              })*/

              // 원래는 서버와 문자만 주고받을 수 있다.
             }}>버튼</button>
          </>
        } />
        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock, shoes }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />


        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />}></Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>

      
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet />
    </div>
  )
}

function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </div>
  )
}


function Card(props){
  return(
    <div className="col-md-4">
      <img src={ "https://codingapple1.github.io/shop/shoes"+(props.index+1)+".jpg" } width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}



export default App;
