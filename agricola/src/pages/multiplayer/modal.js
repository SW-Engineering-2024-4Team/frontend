// src/Modal.js
import React, { useState } from 'react';
import './Modal.css'; // 모달 관련 CSS

const Modal = () => {
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => setIsVisible(true);
    const closeModal = () => setIsVisible(false);

    return (
        <div>
            <button id="modal_btn" onClick={openModal}>게임 방법</button>
            {isVisible && (
                <div className="modal_back" style={{ display: 'block' }}>
                    <div className="modal">
                        <div className="modal_body">
                            <h2>게임 방법</h2>
                            <p>1. 제일 처음 접속한 플레이어가 호스트이다.</p>
                            <p>2. 호스트가 게임 시작 버튼을 누른다.</p>
                            <p>3. 사방에서 날아오는 적들을 방향키로 피한다.</p>
                            <p>4. 게임은 총 8스테이지이며, 각 스테이지는 15초 동안 진행된다.</p>
                            <p>5. 아이템을 획득하면 특정한 효과를 누릴 수 있다.</p>
                            <p>6. 한 플레이어라도 살아남을 경우 다음 스테이지에서 전원 부활된다.</p>
                            <button className="close_modal" onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;