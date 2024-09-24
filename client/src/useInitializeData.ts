import {useAtom} from "jotai";
import {PapersAtom} from "./atoms/PapersAtom.tsx";
import {useEffect} from "react";
import {http} from "./http.ts";

export function useInitializeData() {
    
    const [, setPatients] = useAtom(PapersAtom);
    
    
    useEffect(() => {
        http.api.paperGetAllPapers().then((response) => {
            setPatients(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])
}