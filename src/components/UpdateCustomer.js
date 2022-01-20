import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAsync from '../hooks/useAsync';

function UpdateCustomer(props) {
    const param = useParams();
    const { id } = param;
    const [ gender, setGender ] = useState('');
    const onChange = (e) => {
        customer[0].c_gender = e.target.value;
        setGender(e.target.value);
    }
    // form onSubmit 시 get 방식으로 전송되지 않도록 방지
    const onSubmit = (e) => {
        e.preventDefault();
        insertCustomer(e.target);
        navigate(-1);
    }
    // post 전송 axios
    function insertCustomer(form){
        axios.post(`http://localhost:8080/customers/${id}/update`, {
            c_name: form.c_name.value,
            c_phone: form.c_phone.value,
            c_birthday: form.c_birthday.value,
            c_gender: form.c_gender.value,
            c_addr: form.c_addr.value
        })   // axios.post("보내는 주소", 보내는 데이터)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.error(err)
        })
    }
    
    async function getCustomer(){
        const response = await axios.get(
            `http://localhost:8080/customers/${id}`
        )
        return response.data;
    }
    const dataState = useAsync(getCustomer);
    const { loading, error, data: customer } = dataState;
    const navigate = useNavigate();
    if(loading) return <div>로딩중...</div>
    if(error) return <div>페이지를 나타낼 수 없습니다.</div>
    if(!customer) return null;
    return (
        <div>
            <h2>고객 정보 수정하기</h2>
            <form onSubmit={onSubmit}>
                <Table className='createTable'>
                    <TableBody>
                        <TableRow>
                            <TableCell>이름</TableCell>
                            <TableCell>
                                <input name="c_name" type="text" onChange={onChange} defaultValue={customer[0].c_name} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" onChange={onChange} defaultValue={customer[0].c_phone} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birthday" type="date" onChange={onChange} defaultValue={customer[0].c_birthday} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                남성 <input name="c_gender" type="radio" value="남성" onChange={onChange} checked={customer[0].c_gender==='남성'? true:false} />
                                여성 <input name="c_gender" type="radio" value="여성" onChange={onChange} checked={customer[0].c_gender==='여성'? true:false} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_addr" type="text" onChange={onChange} defaultValue={customer[0].c_addr} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="btnsArea">
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </div>
    );
}

export default UpdateCustomer;