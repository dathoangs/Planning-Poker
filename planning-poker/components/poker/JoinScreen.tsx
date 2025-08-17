import React from 'react';

interface JoinScreenProps {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  roomName: string;
  setRoomName: React.Dispatch<React.SetStateAction<string>>;
  handleJoin: () => void;
  error: string;
}

export const JoinScreen: React.FC<JoinScreenProps> = ({ userName, setUserName, roomName, setRoomName, handleJoin, error }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Planning Poker</h1>
            <p className="text-center text-gray-500 mb-8">Tạo phòng và mời đồng đội cùng tham gia.</p>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tên của bạn</label>
                    <input type="text" id="name" value={userName} onChange={(e) => setUserName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400" placeholder="Nhập tên hiển thị" />
                </div>
                <div>
                    <label htmlFor="room" className="block text-sm font-medium text-gray-700 mb-1">Tên phòng</label>
                    <input type="text" id="room" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400" placeholder="Nhập tên phòng để tạo hoặc vào" />
                </div>
                <button onClick={handleJoin} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition transform hover:scale-105">
                    Tạo / Vào phòng
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        </div>
    </div>
);
