import React from 'react';
import { PokerUser } from '@/types/poker';

interface ResultsProps {
  users: { [uid: string]: PokerUser };
}

export const Results: React.FC<ResultsProps> = ({ users }) => {
    const votes = Object.values(users).map(u => u.vote).filter(v => v !== null);
    if (votes.length === 0) return <p className="text-gray-500">Chưa có ai vote.</p>;

    const numericVotes = votes.map(v => parseInt(v, 10)).filter(v => !isNaN(v));
    const average = numericVotes.length > 0
        ? (numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length).toFixed(1)
        : 'N/A';

    const voteCounts = votes.reduce((acc, vote) => {
        if(vote) acc[vote] = (acc[vote] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="flex flex-col items-center">
            <p className="text-lg font-medium text-gray-600">
                Điểm trung bình: <span className="font-bold text-2xl text-indigo-600">{average}</span>
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
                {Object.entries(voteCounts).map(([vote, count]) => (
                    <div key={vote} className="text-center p-3 bg-gray-100 rounded-lg">
                        <p className="text-3xl font-bold text-indigo-700">{vote}</p>
                        <p className="text-sm text-gray-500">{count} vote</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
