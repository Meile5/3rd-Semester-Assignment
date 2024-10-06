import {atom} from "jotai";
import {PaperDto} from "../Api"
export const SharedPapersAtom = atom<PaperDto[]>([]);