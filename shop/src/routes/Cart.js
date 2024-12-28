import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge } from "./../store/userSlice.js"
import { changeCount } from "./../store/cartSlice.js"

function Cart(){

    let state = useSelector((state)=>state);
    let dispatch = useDispatch();

    return (
        <div>

            <p>{state.user.name} {state.user.age}의 장바구니</p>
            <button onClick={()=>{
                dispatch(changeAge(10));
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((data,index)=> 
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.count}</td>
                                <td><button onClick={()=>{
                                    dispatch(changeCount(data.id));
                                }}>+</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart