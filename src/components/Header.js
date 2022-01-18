import React from "react";
import { Link } from "react-router-dom";

function Header({title}){
    return(
        <div className="header">
            <h1><Link to="/">{title}</Link></h1>
            <ul>
                <li><Link to="/">고객리스트 보기</Link></li>
                <li><Link to="/create">신규고객 등록하기</Link></li>
                <li>고객 검색</li>
            </ul>
        </div>
    )
}
export default Header;