export interface PokerUser {
  name: string;
  vote: string | null;
}

export interface RoomData {
  users: { [uid: string]: PokerUser };
  cardsVisible: boolean;
}
