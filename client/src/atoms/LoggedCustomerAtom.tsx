import {atom} from "jotai";

interface LoggedCustomer {
    id: number,
    name: string,
    address: string,
    phone: string,
    email: string,
}

// Initialize the atom with mock data
export const LoggedCustomerAtom = atom<LoggedCustomer>({
    id: 1,
    name: "John Doe",
    address: "123 Main St, Springfield",
    phone: "12345678",
    email: "john.doe@easv.com",
});