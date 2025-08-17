import React from 'react';
import Head from 'next/head';
import { RoomData } from '../../types/poker';
import { Participant } from './Participant';
import { Results } from './Results';
import { Card } from './Card';

interface PokerRoomProps {
  roomName: string;
  userName: string;
  roomData: RoomData;
  currentUserId: string;
  actions: {
    castVote: (vote: string) => void;
    toggleCardsVisibility: () => void;
    startNewRound: () => void;
    handleLeaveRoom: () => void;
  };
}

export const PokerRoom: React.FC<PokerRoomProps> = ({ roomName, userName, roomData, currentUserId, actions }) => {
    const { castVote, toggleCardsVisibility, startNewRound, handleLeaveRoom } = actions;
    const usersArray = Object.entries(roomData.users || {}).map(([id, data]) => ({ id, ...data }));
    const currentUserVote = roomData.users?.[currentUserId]?.vote;
    const cardValues = ['0', '1', '2', '3', '5', '8', '13', '21', '?', '☕'];

    // Calculate voting progress
    const totalUsers = usersArray.length;
    const votedUsers = usersArray.filter(user => user.vote !== null && user.vote !== undefined).length;
    const votingProgress = totalUsers > 0 ? (votedUsers / totalUsers) * 100 : 0;

    return (
        <>
            <Head><title>Phòng: {roomName}</title></Head>
            <div className="w-full max-w-6xl mx-auto p-4 md:p-6 min-h-screen bg-gray-50">
                <header className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Phòng: <span className="text-indigo-600">{roomName}</span></h1>
                        <p className="text-gray-500">Chào mừng <span className="font-semibold">{userName}</span>!</p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <button onClick={toggleCardsVisibility} className="bg-indigo-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                            {roomData.cardsVisible ? 'Ẩn bài' : 'Lật bài'}
                        </button>
                        <button onClick={startNewRound} className="bg-gray-200 text-gray-700 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300 transition shadow-sm">Vòng mới</button>
                        <button onClick={handleLeaveRoom} className="bg-red-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-600 transition shadow-sm">Rời phòng</button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center justify-between mb-4 border-b pb-2">
                            <h2 className="text-xl font-bold">Người tham gia ({usersArray.length})</h2>
                            <div className="text-sm">
                                <span className={`font-medium ${votedUsers === totalUsers && totalUsers > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                    {votedUsers}/{totalUsers} đã vote
                                </span>
                            </div>
                        </div>

                        {/* Voting Progress Bar */}
                        <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        votedUsers === totalUsers && totalUsers > 0 ? 'bg-green-500' : 'bg-indigo-500'
                                    }`}
                                    style={{ width: `${votingProgress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {usersArray.map(user => (
                                <Participant key={user.id} {...user} cardsVisible={roomData.cardsVisible} isCurrentUser={user.id === currentUserId} />
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Kết quả</h2>
                            <div className="text-center py-8">
                                {roomData.cardsVisible ? <Results users={roomData.users} /> : <p className="text-gray-500">Kết quả sẽ hiển thị sau khi lật bài.</p>}
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Chọn thẻ bài</h2>
                            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-7 gap-4">
                                {cardValues.map(value => <Card key={value} value={value} isSelected={currentUserVote === value} onSelect={castVote} />)}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};
