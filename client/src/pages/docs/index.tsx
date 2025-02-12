import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import "@/styles/globals.css";

export default function DocsPage(){
    return <>
        <Topbar/>
        <Sidebar id=""/>
        <div className="ml-[25em] flex-1 p-[20px]">
            <h1 className="font-bold text-[35px]">Select a page to get started!</h1>
        </div>
    </>
}