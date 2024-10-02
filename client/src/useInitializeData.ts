import {useAtom} from "jotai";
import {PapersAtom} from "./atoms/PapersAtom.tsx";
import {useEffect} from "react";
import {http} from "./http.ts";
import {TotalCountAtom} from "./atoms/TotalCountAtom.tsx";

export function useInitializeData() {
    
    const [, setPapers] = useAtom(PapersAtom);
    const [, setTotalCount] = useAtom(TotalCountAtom);
    
    /*
    useEffect(() => {
        http.api.paperGetAllPapers().then((response) => {
            setPapers(response.data);
        }).catch(e => {
            console.log(e)
        })
    }, [])
     */

    useEffect(() => {
        http.api.paperGetTotalPapersCount().then((response) => {
            setTotalCount(response.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

}