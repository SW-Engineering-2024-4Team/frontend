import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LoginPage from './LoginPage';

// 테스트 스위트 시작
describe('LoginPage 컴포넌트', () => {
    
  // 테스트 케이스: 사용자 입력 테스트
  it('사용자 입력 테스트', () => {
    const { getByLabelText } = render(<LoginPage />);

    // 텍스트 필드에 입력값 설정
    const roomInput = getByLabelText('방 이름');
    const nameInput = getByLabelText('내 이름');
    fireEvent.change(roomInput, { target: { value: 'Test Room' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    // 입력값이 올바르게 변경되었는지 확인
    expect(roomInput.value).toBe('Test Room');
    expect(nameInput.value).toBe('Test User');
  });

  // 테스트 케이스: 버튼 클릭 테스트
  it('버튼 클릭 테스트', () => {
    const btnFunction = jest.fn(); // 버튼 클릭 시 호출될 가짜 함수 생성
    const { getByText } = render(<LoginPage btnFunction={btnFunction} />);

    // 버튼 클릭 시 동작 확인
    const startGameButton = getByText('게임 시작');
    const tutorialButton = getByText('연습 모드');
    fireEvent.click(startGameButton);
    fireEvent.click(tutorialButton);

    // 버튼 클릭 시 제대로 호출되는지 확인
    expect(btnFunction).toHaveBeenCalledTimes(2);
    expect(btnFunction).toHaveBeenCalledWith('', '', 'join'); // 게임 시작 버튼
    expect(btnFunction).toHaveBeenCalledWith('', '', 'tutorial'); // 연습 모드 버튼
  });
});
