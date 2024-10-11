import {atom} from "jotai";

interface LoggedCustomer {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
}

export const LoggedCustomerAtom = atom<LoggedCustomer>({
    id: 1,
    name: "John Doe",
    address: "123 Main St, Springfield",
    phone: "+1-555-123-4567",
    email: "john.doe@easv.com",
});