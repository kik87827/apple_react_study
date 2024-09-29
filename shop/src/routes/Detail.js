import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import '../Detail.module.css';

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
    let [count, setCount] = useState(0);
    let [alert, setAlert] = useState(true);
    let [inputPro, setInputpro] = useState('');
    let [warn, setWarn] = useState(false);

    useEffect(() => {
        /* console.log('useEffect 실행'); */
        let timer = setTimeout(()=>{
            setAlert(false);
        },2000);
        console.log(1);

        // 대충 서버로 데어터 요청하는 코드(2초 소요)

        console.log();
        setWarn(isNaN(inputPro));

        return ()=>{
            // useEffect 동작 전에 실행됨
            // clean up function
            // 기존 데이터요청은 제거해주세요~
            if(timer){
                clearTimeout(timer);
            }

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
            <div className="container">
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
                        <button className="btn btn-danger">주문하기</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Detail;