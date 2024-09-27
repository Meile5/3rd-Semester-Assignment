import {useAtom} from "jotai";
import {PapersAtom} from "./atoms/PapersAtom.tsx";
import {useEffect} from "react";
import {http} from "./http.ts";

export function useInitializeData() {
    
    const [, setPapers] = useAtom(PapersAtom);
    
    
    useEffect(() => {
        http.api.paperGetAllPapers().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])
}