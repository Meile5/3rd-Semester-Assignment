import { atom } from 'jotai';

export const SelectedPropertyAtom = atom<string | null>(null);
export const SelectedPriceRangeAtom = atom<string | null>(null);
export const SortFieldAtom = atom<string | null>(null);
export const SortOrderAtom = atom<string | null>(null);
