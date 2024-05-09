// StartPage.js
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom'; // 페이지 이동을 위해 react-router-dom의 useHistory 사용

const StartPage = () => {
    const [nickname, setNickname] = useState('');
    const history = useHistory(); // 페이지 이동을 위한 hook

    const enterGame = () => {
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
                text: "닉네임은 최소 2자에서 최대 8자입니다.",
                confirmButtonText: "네",
                confirmButtonColor: '#FC5296'
            });
        } else {
            localStorage.setItem("nickName", nickname);
            history.push("/game"); // React Router를 사용한 페이지 이동
        }
    };

    return (
        <div>
            <input
                type="text"
                id="enter"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
            />
            <button onClick={enterGame}>게임 시작</button>
        </div>
    );
};

export default StartPage;