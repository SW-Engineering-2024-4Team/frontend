// src/NicknameInput.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
// import './NicknameInput.css';

function NicknameInput({ onEnterGame }) {
    const [nickname, setNickname] = useState('');

    const handleInputChange = (e) => {
        setNickname(e.target.value);
    };

    const handleEnterGame = () => {
        if (nickname.length === 0) {
            Swal.fire({
                title: "게임 알림",
                text: "닉네임을 입력해주세요",
                confirmButtonText: "네",
                confirmButtonColor: '#FC5296'
            });
        } else if (nickname.length < 2 || nickname.length > 8) {
            Swal.fire({
                title: "게임 알림",
                text: "닉네임은 최소 2자에서 최대 8자 입니다.",
                confirmButtonText: "네",
                confirmButtonColor: '#FC5296'
            });
        } else {
            localStorage.setItem("nickName", nickname);
            // Replace location.href with an event callback
            onEnterGame(nickname);
        }
    };

    return (
        <div className="nickname__wrapper">
            <div className="second_wrapper">
                <div className="nickname__description">게임 내에서 사용하실 닉네임을 입력해주세요.</div>
                <input
                    type="text"
                    className="nickname__input"
                    placeholder="최소 2자 ~ 최대 8자"
                    value={nickname}
                    onChange={handleInputChange}
                />
                <button style={{ cursor: 'pointer' }} type="button" className="button" onClick={handleEnterGame}>
                    Enter
                </button>
            </div>
        </div>
    );
}

export default NicknameInput;