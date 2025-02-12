import "@/styles/globals.css";
import Image from "next/image";
import BalatroLogo from "@/assets/images/Balatro.png"
import Button from "@/components/Button";

export default function Homepage(){
    return <>
        <h1 className="text-center text-[80px] font-bold mt-[70px]">Balatro<span className="text-[#eb3434]">.dev</span></h1>
        <div className="flex items-center justify-center gap-2 mt-[-20px]">
            <p className="font-semibold text-[40px]">The all-in-one documentation for modding</p>
            <a href="https://www.playbalatro.com/" target="_blank">
                <Image 
                    src={BalatroLogo} 
                    alt="Balatro" 
                    width={120} 
                    className="m-0 p-0 object-contain"
                />
            </a>
            
        </div>
        <div className="flex justify-center mt-4">
            <Button px={30} py={11} mx={10} text_size={30} onClick={() => {
                window.location.href = "/docs";
            }}>Getting Started</Button>
            <Button px={30} py={11} mx={10} text_size={30} style="outlined" color={"green"} onClick={() => {
                // TODO
            }}>API Docs</Button>
        </div>
    </>
}