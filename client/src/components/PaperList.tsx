import {PapersAtom} from "../atoms/PapersAtom.tsx"
import {useAtom} from "jotai";
import {useNavigate} from "react-router-dom";


export default function PaperList() {

    const [papers] = useAtom(PapersAtom);
    const navigate = useNavigate();

    return (<>

        <div>
            <div className="flex ml-9">
                <button className="btn btn-primary" onClick={e => navigate('/')}>Back</button>
            </div>

            <div>
                <div className="flex items-center justify-between p-5">
                    <h1 className="menu-title text-5xl">Papers</h1>
                </div>
            </div>

            {
                papers.length >= 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-10 mt-10">
                        {papers.map(paper => (
                            <div key={paper.id}>
                                <div className="card bg-base-100 w-96 shadow-xl">
                                    <figure className="px-10 pt-10">
                                        <img
                                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                            alt="Shoes"
                                            className="rounded-xl"/>
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">Paper details:</h2>
                                        <p>{paper.name}</p>
                                        <div className="card-actions mt-2">
                                            <button className="btn btn-primary"
                                                    //onClick={event => navigate('/papers/' + paper.id)}
                                                    key={paper.id}>Open Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>

    </>)
}