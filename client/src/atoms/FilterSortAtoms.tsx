import { atom } from 'jotai';
import {PaperDto} from "../Api.ts";

export const SelectedPropertyAtom = atom<string>("");
export const SelectedPriceRangeAtom = atom<string>("");
export const SortFieldAtom = atom<string | null>(null);
export const SortOrderAtom = atom<string | null>(null);
export const FilterSortPapersAtom = atom<PaperDto[]>([]);
export const IsFilterActive = atom<boolean>(false);

