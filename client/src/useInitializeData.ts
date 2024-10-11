import {useAtom} from "jotai";
import {PapersAtom} from "./atoms/PapersAtom.tsx";
import {useEffect} from "react";
import {http} from "./http.ts";
import {TotalCountAtom, TotalCountCustomersAtom} from "./atoms/TotalCountAtom.tsx";

export function useInitializeData() {
    
    const [, setTotalCount] = useAtom(TotalCountAtom);
    const [, setTotalCountCustomers] = useAtom(TotalCountCustomersAtom);


    useEffect(() => {
        http.api.paperGetTotalPapersCount().then((response) => {
            setTotalCount(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    useEffect(() => {
        http.api.paperGetTotalPapersCountCustomers().then((response) => {
            setTotalCountCustomers(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

}