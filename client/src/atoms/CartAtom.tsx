import {atom} from "jotai";
import {PaperDto} from "../Api"

interface CartItem extends PaperDto {
    quantity: number;  
}


export const CartAtom = atom<CartItem[]>([]);