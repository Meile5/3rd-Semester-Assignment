import {atom} from "jotai";
import {Paper} from "../Api_Assignment.ts";

// some mock data
const mockPapers: Paper[] = [
    {
        id: 1,
        name: "Paper 1",
        discontinued: false,
        stock: 50,
        price: 15.5,
    },
    {
        id: 2,
        name: "Paper 2",
        discontinued: false,
        stock: 20,
        price: 10.0,
    },
    {
        id: 3,
        name: "Paper 3",
        discontinued: false,
        stock: 5,
        price: 8.75,
    },
];

export const PapersAtom = atom<Paper[]>(mockPapers);