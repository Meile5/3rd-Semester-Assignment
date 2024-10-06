// src/atoms/FilteredPapersAtom.tsx
import { atom } from 'jotai';
import { PaperDto } from '../Api.ts';

export const FilteredPapersAtom = atom<PaperDto[]>([]);
