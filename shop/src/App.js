import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';

function App() {
  let [shoes,shoesSet] = useState(data);
  let navigate = useNavigate(); // 페이지 이동도와주는
  let [name, nameSet] = useState(['shoes1.jpg','shoes2.jpg','shoes3.jpg']);

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
                console.log(sortData);
                shoesSet(sortData);
              }}>가나다 정렬</button>
            </div>

            <div className="container">
              <div className="row">
                {
                  shoes.map((data,index)=>{
                    return(
                      <Card name = { process.env.PUBLIC_URL + '/img/shoes'+(shoes[index].id+1)+'.jpg' } title = { shoes[index].title } price = { shoes[index].price } key={index} />
                    )
                  })
                }
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />


        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>

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
      <img src={ props.name } width="80%" />
      <h4>{ props.title }</h4>
      <p>{ props.price }</p>
    </div>
  )
}



export default App;
