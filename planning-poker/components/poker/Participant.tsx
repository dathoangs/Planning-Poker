import React from 'react';

interface ParticipantProps {
  name: string;
  vote: string | null;
  cardsVisible: boolean;
  isCurrentUser: boolean;
}

export const Participant: React.FC<ParticipantProps> = ({ name, vote, cardsVisible, isCurrentUser }) => {
    const hasVoted = vote !== null;
    const VoteDisplay = () => {
        if (cardsVisible) {
            return <span className="font-bold text-lg text-indigo-700 w-8 text-center">{vote ?? '-'}</span>;
        }
        return hasVoted ? (
            <div className="w-6 h-4 rounded-sm bg-green-400" title="Đã vote"></div>
        ) : (
            <div className="w-6 h-4 rounded-sm bg-gray-200" title="Chưa vote"></div>
        );
    };
    return (
        <div className={`flex items-center justify-between p-3 rounded-lg ${isCurrentUser ? 'bg-indigo-50' : 'bg-gray-50'}`}>
            <span className={`font-medium ${isCurrentUser ? 'text-indigo-800' : ''}`}>
                {name} {isCurrentUser && '(Bạn)'}
            </span>
            <VoteDisplay />
        </div>
    );
};
