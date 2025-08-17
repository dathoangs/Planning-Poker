import { useState, useEffect, useCallback } from 'react';
import { db, ref, onValue, update, remove, onDisconnect } from '../lib/firebase';
import { RoomData } from '../types/poker';

export const usePokerRoom = (userId: string | null, roomName: string, userName: string) => {
    const [roomData, setRoomData] = useState<RoomData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const appId = process.env.NEXT_PUBLIC_APP_ID || 'planning-poker-default';

    useEffect(() => {
        if (!roomName || !userId) {
            setRoomData(null);
            return;
        };

        const roomRef = ref(db, `${appId}/public/data/rooms/${roomName}`);
        const userRef = ref(db, `${appId}/public/data/rooms/${roomName}/users/${userId}`);

        // Lắng nghe thay đổi của cả phòng
        const unsubscribe = onValue(roomRef, (snapshot) => {
            if (snapshot.exists()) {
                setRoomData(snapshot.val() as RoomData);
            } else {
                // Nếu phòng không tồn tại, set data về null để component cha xử lý
                setRoomData(null);
                setError("Phòng không tồn tại hoặc đã bị xóa.");
            }
        });

        // Thêm người dùng vào phòng
        const join = async () => {
             await update(userRef, { name: userName, vote: null });
             // Tự động xóa người dùng khi họ ngắt kết nối
             await onDisconnect(userRef).remove();
        }
        join();

        return () => unsubscribe();
    }, [roomName, userId, userName, appId]);

    const castVote = useCallback(async (vote: string) => {
        if (!userId || !roomData) return;
        const userRef = ref(db, `${appId}/public/data/rooms/${roomName}/users/${userId}`);
        const currentVote = roomData.users?.[userId]?.vote;
        const newVote = currentVote === vote ? null : vote;
        await update(userRef, { vote: newVote });
    }, [roomName, userId, roomData, appId]);

    const toggleCardsVisibility = useCallback(async () => {
        if (!roomData) return;
        const roomRef = ref(db, `${appId}/public/data/rooms/${roomName}`);
        await update(roomRef, { cardsVisible: !roomData.cardsVisible });
    }, [roomName, roomData, appId]);

    const startNewRound = useCallback(async () => {
        if (!roomData) return;
        const roomRef = ref(db, `${appId}/public/data/rooms/${roomName}`);
        const updates: Record<string, boolean | null> = { 'cardsVisible': false };
        Object.keys(roomData.users).forEach(uid => {
            updates[`/users/${uid}/vote`] = null;
        });
        await update(roomRef, updates);
    }, [roomName, roomData, appId]);

    const removeUser = useCallback(async () => {
        if (!userId || !roomData) return;

        const userRef = ref(db, `${appId}/public/data/rooms/${roomName}/users/${userId}`);
        await remove(userRef);

        // Check if this was the last user in the room
        const remainingUsers = Object.keys(roomData.users).filter(uid => uid !== userId);
        if (remainingUsers.length === 0) {
            // Remove the entire room if no users left
            const roomRef = ref(db, `${appId}/public/data/rooms/${roomName}`);
            await remove(roomRef);
        }
    }, [roomName, userId, roomData, appId]);


    return { roomData, error, actions: { castVote, toggleCardsVisibility, startNewRound, removeUser } };
};
