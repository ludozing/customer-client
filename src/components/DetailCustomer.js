import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAsync from '../hooks/useAsync';
import axios from 'axios';

function DetailCustomer(props) {
    const param = useParams();
    // Customer.js에서 <Link to={`/customer/${data.c_no}`}>로 주소를 지정해주었고,
    // App.js에서 <Route path="/customer/:id" element={<DetailCustomer />}/>로 data.c_no를 id라는 파라미터로 지정했기 때문에
    // useParams()는 해당 페이지의 id(전 data.c_no) 값이 id: 값 형태로 담긴 객체가 된다.
    const { id } = param;   // param은 객체이므로, id의 값만 구조분해할당으로 빼낸다.
    async function getCustomer(){
        const response = await axios.get(
            `http://localhost:8080/customers/${id}`
        )
        return response.data;
    }
    const navigate = useNavigate();
    // 삭제하기
    const onDelete = () => {
        axios.delete(`http://localhost:8080/customers/${id}`)
        .then((result)=>{
            console.log('삭제되었습니다.');
            navigate(-1);
        }).catch(err=>{
            console.error(err);
        })
    }
    const state = useAsync(getCustomer);
    const { loading, error, data: customer } = state;
    if(loading) return <div>로딩중...</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customer) return null;
    return (
        <div>
            <h2>고객 상세 정보</h2>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>{customer[0].c_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>연락처</TableCell>
                        <TableCell>{customer[0].c_phone}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>생년월일</TableCell>
                        <TableCell>{customer[0].c_birthday}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>성별</TableCell>
                        <TableCell>{customer[0].c_gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>주소</TableCell>
                        <TableCell>{customer[0].c_addr}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2} className="btnsArea">
                            <button onClick={e=>{e.preventDefault()}}><Link to={`/customer/${id}/update`}>수정</Link></button>
                            <button onClick={onDelete}>삭제</button>
                            <button onClick={e=>{e.preventDefault()}}><Link to="/">리스트</Link></button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default DetailCustomer;