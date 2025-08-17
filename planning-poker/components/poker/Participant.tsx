import React from 'react';

interface ParticipantProps {
  name: string;
  vote: string | null;
  cardsVisible: boolean;
  isCurrentUser: boolean;
}

export const Participant: React.FC<ParticipantProps> = ({ name, vote, cardsVisible, isCurrentUser }) => {
    const hasVoted = vote !== null && vote !== undefined;

    const VoteDisplay = () => {
        if (cardsVisible) {
            return <span className="font-bold text-lg text-indigo-700 w-8 text-center">{vote ?? '-'}</span>;
        }
        return hasVoted ? (
            <div className="flex items-center space-x-2">
                <div className="w-6 h-4 rounded-sm bg-green-500 shadow-sm" title="Đã vote"></div>
                <span className="text-xs text-green-600 font-medium">Đã vote</span>
            </div>
        ) : (
            <div className="flex items-center space-x-2">
                <div className="w-6 h-4 rounded-sm bg-gray-300 border border-gray-400" title="Chưa vote"></div>
                <span className="text-xs text-gray-500">Chưa vote</span>
            </div>
        );
    };

    return (
        <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
            isCurrentUser ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'
        } ${hasVoted && !cardsVisible ? 'ring-1 ring-green-200' : ''}`}>
            <span className={`font-medium ${isCurrentUser ? 'text-indigo-800' : ''}`}>
                {name} {isCurrentUser && '(Bạn)'}
            </span>
            <VoteDisplay />
        </div>
    );
};
