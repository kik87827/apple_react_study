import React, { useContext, useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import '../Detail.module.css';

import { Context1 } from './../App.js'
import { orderTake } from "./../store/cartSlice.js"


{/* <Detail2></Detail2>
class Detail2 extends React.Component{
    componentDidMount(){

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){

    }
}
 */}
let QuadBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg == "blue" ? "white" : "black"};
    padding : 10px;
`

let NewBtn = styled(QuadBtn)`
    padding : 20px;
`


let BlockBox = styled.div`
    background : gray;
    padding : 20px;
`


function Detail(props) {

    let {stock, shoes} = useContext(Context1);
    let navigate = useNavigate(); // 페이지 이동도와주는

    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [inputPro, setInputpro] = useState('');
    let [warn, setWarn] = useState(false);

    let [tab, setTab] = useState(0);

    let [fade, setFade] = useState('');

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();

    useEffect(() => {
        /* console.log('useEffect 실행'); */
        let timer = setTimeout(()=>{
            setAlert(false);
        },2000);
        let aniTimer = setTimeout(()=>{
            setFade('end');
        },100);
        console.log(1);

        // 대충 서버로 데어터 요청하는 코드(2초 소요)

        setWarn(isNaN(inputPro));

        return ()=>{
            // useEffect 동작 전에 실행됨
            // clean up function
            // 기존 데이터요청은 제거해주세요~
            if(timer){
                clearTimeout(timer);
            }

            setFade('');
            console.log('clean up');
        }
    },[inputPro]); // 컴포넌트 mount시 1회만 실행하고 싶으면 []


    let { id } = useParams();
    let findProduct = props.shoes.find((x) => {
        return x.id == id
    });

    if (!props.shoes[id]) {
        return (<div>상품이 없습니다.</div>)
    } else {
        return (
            <div className={`container start `+fade}>
                {
                    alert ? <div className="alert alert-warning">
                        2초 이내 구매시 할인
                    </div>
                        : null
                }
                {
                    warn ? <div className="alert alert-warning">
                        숫자만 입력하세요
                    </div>
                        : null
                }
                {count}<button onClick={() => { setCount(count + 1); }}>버튼</button>
                <BlockBox>
                    <QuadBtn bg="blue">버튼</QuadBtn>
                    <NewBtn>버튼상속</NewBtn>
                </BlockBox>
                {stock[0]}
                <div className="row">
                    <div className="col-md-6">
                        <img src='https://codingapple1.github.io/shop/shoes1.jpg' width="100%" />
                    </div>
                    <div className="col-md-6">
                        <div className="item-form-row">
                            <input type="text" className="form-item" onInput={(e)=>{
                                let inputValue = e.target.value;
                                // if(typeof inputValue !== "number"){
                                //    
                                // }
                                setInputpro(inputValue);
                                //setWarn(isNaN(inputValue));
                            }} />
                        </div>
                        <h4 className="pt-5">{findProduct.title}</h4>
                        <p>{findProduct.content}</p>
                        <p>{findProduct.price}원</p>
                        <button className="btn btn-danger" onClick={()=>{
                            let getCopy = Object.assign({},findProduct);
                            getCopy.name = getCopy.title;
                            getCopy.count = 5;
                            getCopy.id = 3;
                            dispatch(
                                orderTake(getCopy)
                            );
                            navigate('/cart');
                        }}>주문하기</button>
                    </div>
                </div>

                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link onClick={()=>{ setTab(0); }} eventKey="link0">버튼0</Nav.Link>
                    </Nav.Item>            
                    <Nav.Item>
                        <Nav.Link onClick={()=>{ setTab(1); }} eventKey="link1">버튼1</Nav.Link>
                    </Nav.Item>            
                    <Nav.Item>
                        <Nav.Link onClick={()=>{ setTab(2); }} eventKey="link2">버튼2</Nav.Link>
                    </Nav.Item>            
                </Nav>
                <TabContent tab = { tab } />
            </div>
        )
    }
    
}
/* 
function TabContent(props){
    if(props.tab === 0){
        return <div>내용0</div>
    }else if(props.tab === 1){
        return <div>내용1</div>
    }else if(props.tab === 2){
        return <div>내용2</div>
    }
} */

function TabContent({tab , shoes}){
    /* if(tab === 0){
        return <div>내용0</div>
    }else if(tab === 1){
        return <div>내용1</div>
    }else if(tab === 2){
        return <div>내용2</div>
    } */

    let [fade, setFade] = useState('');
    let {stock} = useContext(Context1);

    useEffect(()=>{
        let timer = setTimeout(()=>{
            setFade('end');
        },100);
        return ()=>{
            clearTimeout(timer);
            setFade('');
        }
    }, [tab])

    return (
        <div className={`start ${fade}`}>
            {[<div>{stock}</div>,<div>내용1</div>,<div>내용2</div>][tab]}
        </div>
    )
}

export default Detail;