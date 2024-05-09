import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate  } from 'react-router-dom';

const NicknameForm = () => {
    const [nickname, setNickname] = useState('');
    const history = useNavigate ();

    const enterGame = () => {
        if (nickname.length === 0) {
            Swal.fire("게임 알림", "닉네임을 입력해주세요", "error");
        } else if (nickname.length < 2 || nickname.length > 8) {
            Swal.fire("게임 알림", "닉네임은 최소 2자에서 최대 8자입니다.", "error");
        } else {
            localStorage.setItem("nickName", nickname);
            history.push('/game');
        }
    };

    return (
        <Router>
            <div className="nickname__wrapper">
                <div className="second_wrapper">
                    <div className="nickname__discription">게임 내에서 사용하실 닉네임을 입력해주세요.</div>
                    <input type="text" className="nickname__input" value={nickname} onChange={e => setNickname(e.target.value)} placeholder="최소 2자 ~ 최대 8자" />
                    <button style={{ cursor: 'pointer' }} type="button" className="button" onClick={enterGame}>
                        Enter
                    </button>
                </div>
            </div>
        </Router>  
    );
}

export default NicknameForm;