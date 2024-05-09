import React from 'react';
import { Link } from 'react-router-dom'; // React Router를 사용해 SPA 방식의 라우팅 처리
import './Header.css'; // CSS 파일 import

const Header = () => {
    return (
        <div className="navbar">
            <div className="navbar__name">
                <Link to="/game">
                    <i className="fas fa-gamepad"></i> {/* FontAwesome 아이콘 사용 */}
                </Link>
                <Link to="/game">Professor vs Student</Link>
            </div>
            <ul className="navbar__menu">
                <li><a href="#" id="modal_btn">게임 방법</a></li>
                <li><Link to="/rank">랭킹</Link></li>
                <li><Link to="/guestbook">방명록</Link></li> {/* 링크 수정 */}
            </ul>
            <ul className="navbar__icons">
                <i className="fas fa-share-alt-square"></i>
            </ul>
        </div>
    );
};

export default Header;