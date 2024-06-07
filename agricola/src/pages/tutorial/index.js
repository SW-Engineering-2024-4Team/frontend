import React from 'react';
import WebSocketPage from '../../components/WebSocketPage';

function App() {
  return (
    <div className="App">
      <WebSocketPage 
        roomId="1" 
        message="아 진짜 아그리콜라 귀낯ㅎ"
      />
    </div>
  );
}

export default App;
