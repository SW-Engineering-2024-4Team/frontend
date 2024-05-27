import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PersonalBoard from './views/boards/PersonalBoard';

describe('PersonalBoard Component', () => {
    test('plow 메소드의 기본 기능 확인', () => {
      const { getByText, getAllByRole } = render(<PersonalBoard />);
      const plots = getAllByRole('button');
  
      // 첫 번째 빈 밭 클릭하여 다이얼로그 열기
      fireEvent.click(plots[0]);
  
      // 다이얼로그에서 "Plow Field" 버튼 클릭
      fireEvent.click(getByText('Plow Field'));
  
      // 상태가 "plow"로 변경되었는지 확인
      expect(plots[0].textContent).toBe('Plowed');
    });
  
    test('인접한 곳에 밭이 있어야만 plow 선택 가능 여부 확인', () => {
      const { getByText, getAllByRole } = render(<PersonalBoard />);
      const plots = getAllByRole('button');
  
      // 첫 번째 빈 밭 클릭하여 다이얼로그 열기
      fireEvent.click(plots[0]);
  
      // 다이얼로그에서 "Plow Field" 버튼 클릭
      fireEvent.click(getByText('Plow Field'));
  
      // 두 번째 빈 밭 클릭하여 다이얼로그 열기 (인접한 곳에 밭이 있으므로 가능)
      fireEvent.click(plots[1]);
      fireEvent.click(getByText('Plow Field'));
      expect(plots[1].textContent).toBe('Plowed');
  
      // 인접한 곳에 밭이 없는 빈 밭 클릭하여 다이얼로그 열기 (예: 4번째 빈 밭)
      const nonAdjacentPlot = 4; // 비인접한 빈 밭의 인덱스
      fireEvent.click(plots[nonAdjacentPlot]);
      fireEvent.click(getByText('Plow Field'));
      expect(plots[nonAdjacentPlot].textContent).not.toBe('Plowed');
    });
  });