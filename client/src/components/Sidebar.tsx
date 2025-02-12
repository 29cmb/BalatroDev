import { useEffect, useState } from "react"
export default function Sidebar({ id }: {id: string}) {
    interface Guide {
        name: string;
        file: string;
        $id: string;
    }

    const [guides, setGuides] = useState<Guide[]>([])

    useEffect(() => {
        fetch(`${process.env.CLIENT_URL}/api/v1/guides`)
            .then(r => r.json())
            .then(data => {
                if(data.success) {
                    setGuides(data.guides)
                }
            })
    }, [])

    return (
        <div className="h-screen w-[25em] bg-[#0b0b0c] fixed left-0">
            <div className="h-full overflow-y-auto">
                <h2 className="text-white font-bold text-[30px] m-[20px] mt-[10px] mb-[0px]">Guides</h2>
                <div className="flex flex-col">
                    {
                        guides.map((guide, i) => {
                            const style = { color: "#9ca3af" }
                            if(guide.$id == id){
                                style.color = "#fff"
                            }
    
                            return <button 
                                className="mx-[20px] py-[4px] text-[20px] text-left w-full px-4 hover:bg-[#1f1f1f] transition-all duration-200" 
                                style={style} 
                                key={i} 
                                onClick={() => {
                                    window.location.href = `/docs/guide/${guide.$id}`
                                }}
                            >
                                {guide.name}
                            </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}