import { toast } from "sonner";
import { Button } from "./ui/button";

// @ts-ignore 
export function Hero({ setType }) {
    const set = (t: String) => {
        setType(t)
        toast.success("Wallet selected. Please generate a wallet to continue.")
    }
    return (<>
        <div className="pt-20">
            <div className="text-4xl md:text-5xl font-bold">
                Custody supports multiple blockchains
            </div>
            <div className="text-xl text-gray-700 dark:text-gray-300 my-2 font-medium">Choose a blockchain to get started.</div>
            <div className="flex gap-2 h-11 w-30 mt-4">
                <Button onClick={() => set("sol")} className="h-full w-full">Solana</Button>
                {/* <Button size={"lg"} onClick={() => set("sol")} className="">Solana</Button> */}
                <Button onClick={() => set("eth")} className="h-full w-full">Etherium</Button>
            </div>
        </div>
    </>)
}