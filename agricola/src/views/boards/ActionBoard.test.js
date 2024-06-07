import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // @testing-library/jest-dom의 matcher를 사용하기 위해 import
import ActionBoard from './ActionBoard'; // 테스트할 ActionBoard 컴포넌트를 import

// ActionBoard 컴포넌트 테스트를 위한 테스트 스위트
describe('ActionBoard 컴포넌트', () => {
  // 첫 번째 테스트: 모든 ActionCard가 올바른 초기 상태로 렌더링되는지 확인
  test('모든 ActionCard가 올바른 초기 상태로 렌더링', () => {
    // 테스트를 위해 ActionBoard 컴포넌트를 렌더링
    render(<ActionBoard currentPlayer={1} />);
    
    // 역할이 'button'인 모든 요소를 찾음 (카드 버튼)
    const cards = screen.getAllByRole('button');
    
    // 총 14개의 카드가 렌더링되는지 확인
    expect(cards.length).toBe(14);
  });

  // 두 번째 테스트: 클릭된 카드의 상태가 업데이트되는지 확인
  test('클릭된 카드의 상태를 업데이트', () => {
    // 테스트를 위해 ActionBoard 컴포넌트를 렌더링
    render(<ActionBoard currentPlayer={1} />);
    
    // 역할이 'button'인 모든 요소를 찾음 (카드 버튼)
    const cards = screen.getAllByRole('button');
    
    // 첫 번째 카드를 클릭하는 이벤트를 시뮬레이션
    fireEvent.click(cards[0]);
    
    // 클릭 후 alt 텍스트가 'coverImage'인 모든 img 요소를 찾음
    const updatedCoverImgs = screen.getAllByAltText('coverImage');

    // src가 '../../image/ClickedCard/clicked-action1.png'인 img 요소를 찾음
    const updatedCoverImg = updatedCoverImgs.find(img => img.getAttribute('src') === '../../image/ClickedCard/clicked-action1.png');
    
    // 해당 img 요소가 문서에 존재하는지 확인
    expect(updatedCoverImg).toBeInTheDocument();
  });
});
