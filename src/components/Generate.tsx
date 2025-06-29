import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Generate({ setPhrase } : { setPhrase: React.Dispatch<React.SetStateAction<string[]>>}) {
    const [val, setVal] = useState("")
    const getPhrase = () => {
        if (val.split(" ").length == 12) {
             setPhrase(val.split(" "))
             toast.success("Wallet Restored!")
        }
        else{
            const mnemonic = generateMnemonic()
            setPhrase(mnemonic.split(" "))
        }
    }
    return (<>
        <div className="pt-20">
            <div className="text-4xl md:text-5xl font-bold tracking-tighter">
                Secret Recovery Phrase
            </div>
            <div className="text-xl text-gray-700 dark:text-gray-300 my-2 font-medium">Save these words in a safe place.</div>
            <div className="flex flex-col md:flex-row w-full items-center gap-2 mt-5">
                <Input onChange={(e) => setVal(e.target.value)} className="h-11" type="email" placeholder="Enter your secret phrase (Or leave blank to generate)" />
                <Button onClick={getPhrase} className="h-11 w-full md:w-40" type="submit" variant="default">
                    Generate
                </Button>
            </div>
        </div>
    </>)
}