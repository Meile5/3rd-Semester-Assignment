import {atom} from "jotai";
import {Order} from "../Api";

export const OrderHistoryAtom = atom<Order[]>([]);