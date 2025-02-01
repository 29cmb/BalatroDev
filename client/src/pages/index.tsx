import "@/styles/globals.css";
import Image from "next/image";
import BalatroLogo from "@/assets/images/Balatro.png"

export default function Homepage(){
    return <>
        <h1 className="text-center text-[80px] font-bold mt-[30px]">Balatro<span className="text-[#eb3434]">.dev</span></h1>
        <div className="flex items-center justify-center gap-2 mt-[-20px]">
            <p className="font-semibold text-[40px]">The all-in-one documentation for</p>
            <Image 
                src={BalatroLogo} 
                alt="Balatro" 
                width={120} 
                className="m-0 p-0 object-contain"
            />
        </div>
    </>
}