import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import Swal from 'sweetalert2';

const GamePage = () => {
    const canvasRef = useRef(null);
    const [balls, setBalls] = useState([]);
    const [enemys, setEnemys] = useState([]);
    const [straightEnemys, setStraightEnemys] = useState([]);
    const [items, setItems] = useState([]);
    const [stage, setStage] = useState(1);
    const [isStart, setIsStart] = useState(false);
    const [stageClear, setStageClear] = useState(false);
    const [timer, setTimer] = useState(15.00);
    const [myId, setMyId] = useState(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(); // Connect to server
        setSocket(newSocket);
        setupSocketListeners(newSocket);
        return () => newSocket.close();
    }, []);

    const setupSocketListeners = (socket) => {
        socket.on('user_id', (data) => {
            setMyId(data);
        });
        socket.on('join_user', (data) => {
            const newBall = new PlayerBall(data.id, data.color, data.x, data.y);
            setBalls(prev => [...prev, newBall]);
        });
        socket.on('leave_user', (id) => {
            setBalls(prev => prev.filter(ball => ball.id !== id));
        });
        socket.on('update_state', (data) => {
            setBalls(prev => prev.map(ball => ball.id === data.id ? {...ball, x: data.x, y: data.y} : ball));
        });
        socket.on('collision_update', (data) => {
            setBalls(prev => prev.map(ball => ball.id === data.id ? {...ball, state: 0} : ball));
        });
        socket.on('start_game', () => {
            setIsStart(true);
            playBackgroundMusic();
        });
        socket.on('stage_clear', (data) => {
            handleStageClear(data.stage);
        });
        socket.on('end_waiting', () => {
            setIsStart(false);
            setStageClear(false);
            setTimer(15);
        });
        // Add other socket event listeners
    };

    const handleStageClear = (nextStage) => {
        setIsStart(false);
        setStageClear(true);
        setStage(nextStage);
    };

    const playBackgroundMusic = () => {
        const bgm = document.getElementById("bgm");
        if (bgm) {
            bgm.volume = 0.3;
            bgm.play();
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                if (ball.state !== 0) {
                    ctx.beginPath();
                    ctx.fillStyle = ball.color;
                    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            });
            // Draw enemys, straightEnemys, and items
            requestAnimationFrame(draw);
        };

        draw();
    }, [balls, enemys, straightEnemys, items]);

    return (
        <div>
            <canvas ref={canvasRef} width="1024" height="768"></canvas>
        </div>
    );
};

export default GamePage;