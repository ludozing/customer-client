import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateCustomer(props) {
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        c_name: "",
        c_phone: "",
        c_birthday: "",
        c_gender: "",
        c_addr: ""
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
        axios.post("http://localhost:8080/addCustomer", formData)   // axios.post("보내는 주소", 보내는 데이터)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.error(err)
        })
    }
    return (
        <div>
            <h2>신규 고객 등록하기</h2>
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

export default CreateCustomer;