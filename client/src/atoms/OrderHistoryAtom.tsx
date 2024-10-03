import {atom} from "jotai";
import {OrderDto} from "../Api";

export const OrderHistoryAtom = atom<OrderDto[]>([]);