'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { usePokerRoom } from '../hooks/usePokerRoom';
import { JoinScreen } from '../components/poker/JoinScreen';
import { PokerRoom } from '../components/poker/PokerRoom';

// Hàm tạo UUID tương thích với mọi trình duyệt
const generateUUID = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback cho các trình duyệt không hỗ trợ crypto.randomUUID
    return 'xxxx-xxxx-4xxx-yxxx-xxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Hàm helper để quản lý user ID và name trong local storage
const getOrCreateUser = (): { userId: string; userName: string } => {
    let userId = localStorage.getItem('pokerUserId');
    if (!userId) {
        userId = generateUUID();
        localStorage.setItem('pokerUserId', userId);
    }
    const userName = localStorage.getItem('pokerUserName') || 'Anonymous';
    return { userId, userName };
};

export default function PlanningPokerPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const [view, setView] = useState<'join' | 'room'>('join');
    const [userName, setUserName] = useState<string>('');
    const [roomName, setRoomName] = useState<string>('');
    const [joinError, setJoinError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Khởi tạo user từ local storage
    useEffect(() => {
        const user = getOrCreateUser();
        setUserId(user.userId);
        setUserName(user.userName);

        const sessionRoom = sessionStorage.getItem('pokerRoomId');
        if (sessionRoom) {
            setRoomName(sessionRoom);
            setView('room');
        }
        setIsLoading(false);
    }, []);

    const { roomData, error: roomError, actions } = usePokerRoom(
        view === 'room' ? userId : null,
        roomName,
        userName
    );

    const handleLeaveRoom = useCallback(() => {
        actions.removeUser(); // Xóa user khỏi DB
        sessionStorage.removeItem('pokerRoomId');
        setRoomName('');
        setJoinError(''); // Clear any join errors
        setView('join');
    }, [actions]);

    useEffect(() => {
        // Only handle room errors when we're actually trying to stay in a room
        if (roomError && view === 'room' && roomName) {
            // Auto-redirect to join screen if room doesn't exist
            handleLeaveRoom();
        }
    }, [roomError, handleLeaveRoom, view, roomName]);

    const handleJoin = () => {
        if (!userName || !roomName) {
            setJoinError('Vui lòng nhập đầy đủ tên và tên phòng.'); return;
        }
        setJoinError('');
        localStorage.setItem('pokerUserName', userName);
        sessionStorage.setItem('pokerRoomId', roomName);
        setView('room');
    };

    if (isLoading || !userId) {
        return <div className="flex items-center justify-center min-h-screen bg-gray-50"><p>Đang tải...</p></div>;
    }

    if (view === 'join') {
        return (
            <>
                <JoinScreen
                    userName={userName} setUserName={setUserName}
                    roomName={roomName} setRoomName={setRoomName}
                    handleJoin={handleJoin} error={joinError}
                />
            </>
        );
    }

    if (view === 'room' && roomData) {
        return <PokerRoom
                    roomName={roomName} userName={userName}
                    roomData={roomData} currentUserId={userId}
                    actions={{...actions, handleLeaveRoom}}
               />;
    }

    return <div className="flex items-center justify-center min-h-screen bg-gray-50"><p>Đang vào phòng...</p></div>;
}
