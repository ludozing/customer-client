import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useAsync from '../hooks/useAsync';

function UpdateCustomer(props) {
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
    const [ formData, setFormData ] = useState({
        c_name: '',
        c_phone: '',
        c_birthday: '',
        c_gender: '',
        c_addr: ''
    })
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    // form onSubmit 시 get 방식으로 전송되지 않도록 방지
    const onSubmit = (e) => {
        e.preventDefault();
        insertCustomer();
        navigate(-1);
    }
    // post 전송 axios
    function insertCustomer(){
        axios.post("http://localhost:8080/customers/:id/update", formData)   // axios.post("보내는 주소", 보내는 데이터)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.error(err)
        })
    }
    const state = useAsync(getCustomer);
    const { loading, error, data: customer } = state;
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
                                <input name="c_name" type="text" value={formData.c_name} onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>연락처</TableCell>
                            <TableCell>
                                <input name="c_phone" type="text" value={formData.c_phone} onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>생년월일</TableCell>
                            <TableCell>
                                <input name="c_birthday" type="date" value={formData.c_birthday} onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>성별</TableCell>
                            <TableCell>
                                남성 <input name="c_gender" type="radio" value="남성" onChange={onChange} />
                                여성 <input name="c_gender" type="radio" value="여성" onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>주소</TableCell>
                            <TableCell>
                                <input name="c_addr" type="text" value={formData.c_addr} onChange={onChange} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="btnsArea">
                                <button type="submit">수정</button>
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