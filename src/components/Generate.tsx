import { generateMnemonic } from "bip39";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Generate({ type, setPhrase }) {
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
            <div className="text-5xl font-bold">
                Secret Recovery Phrase
            </div>
            <div className="text-xl text-gray-700 dark:text-gray-300 my-2 font-medium">Save these words in a safe place.</div>
            <div className="flex w-full items-center h-11 gap-2 pt-5">
                <Input onChange={(e) => setVal(e.target.value)} className="h-11" type="email" placeholder="Enter your secret phrase (Or leave blank to generate)" />
                <Button onClick={getPhrase} className="h-11 w-40" type="submit" variant="default">
                    Generate
                </Button>
            </div>
        </div>
    </>)
}