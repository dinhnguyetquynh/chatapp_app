import {create} from 'zustand';
import {UserRes} from '../models/user';

interface UserState {
  user: UserRes | null;
  setUser: (user: UserRes) => void;
}

export const userStore = create<UserState>(set => ({
  user: null,
  setUser: (user: UserRes) => set({user: user}),
}));
