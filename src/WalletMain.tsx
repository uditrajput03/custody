import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import AnimationWrap from "./components/AnimationWrap";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl"
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58"
import { Wallet } from "./components/Wallet";
import { DialogDelete } from "./components/DIalog";
import { Toggle } from "./components/ui/toggle";
import { HDNodeWallet, Wallet as weth } from "ethers"

export type WalletType = {
    id: number,
    pri: string,
    pub: string
}

export function WalletMain({ type = "sol", phrase, clear }: {type: String, phrase: String[], clear: () => void}) {
    const [wallets, setWallets] = useState<WalletType[]>([])
    const [tile, setTile] = useState(false)
    const [count, setCount] = useState(0)

    const addWallet = () => {
        const path = type == "sol" ? `m/44'/501'/${count}'/0'` : `m/44'/60'/${count}'/0'`
        if (type == "sol") {
            const seed = mnemonicToSeedSync(phrase.join(" ")).toString("hex")
            const derivedSeed = derivePath(path, seed).key
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const pub = Keypair.fromSecretKey(secret).publicKey.toBase58()
            const pri = bs58.encode(secret)

            setWallets([...wallets, { id: count, pub, pri }])
        }
        else {
            // const node = HDNodeWallet.fromPhrase((phrase.join(" ")))
            const node = HDNodeWallet.fromSeed(mnemonicToSeedSync(phrase.join(" ")))
            const child = node.derivePath(path)

            const wallet = new weth(child.privateKey)
            const pub = wallet.address
            const pri = wallet.privateKey
            setWallets([...wallets, { id: count, pub, pri }])
        }
        setCount(p => p + 1)
        toast.success("Wallet generated successfully!")
    }

    const handleCopy = () => {
        copyToClipboard(phrase.join(" "));
        toast.success("Copied to clipboard")
    };
    useEffect(() => {
        addWallet()
    }, [])
    return (<>
        <div className="pt-10">
            <Accordion className="border rounded-md" type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="p-5 py-10 text-2xl font-semibold">Your Secret Phrase</AccordionTrigger>
                    <AnimationWrap delay={2}> {/* why animation is not working  */}
                        <AccordionContent onClick={() => handleCopy()} className="md:px-10 px-5">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {phrase.map((w: String) => {
                                    return (<Button className="w-full" variant={"secondary"}>{w}</Button>)
                                })}
                            </div>
                            <div className="flex pt-10 gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-copy size-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
                                <div> Click Anywhere To Copy</div>
                            </div>
                        </AccordionContent>
                    </AnimationWrap>
                </AccordionItem>
            </Accordion>
        </div>
        <div className="flex flex-col md:flex-row pt-10 pb-10 md:justify-between justify-start md:items-center">
            <div className="text-3xl md:text-4xl font-bold">
                {type == "sol" ? <>Solana Wallet</> : <>Etherium Wallet</>}
            </div>
            <div className="flex pt-4 md:pt-0 gap-2 items-center">
                <Toggle onPressedChange={() => setTile(t => !t)} className="hidden md:block mx-2">{!tile ? <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 2H8V7H13V2.5C13 2.22386 12.7761 2 12.5 2ZM13 8H8V13H12.5C12.7761 13 13 12.7761 13 12.5V8ZM7 7V2H2.5C2.22386 2 2 2.22386 2 2.5V7H7ZM2 8V12.5C2 12.7761 2.22386 13 2.5 13H7V8H2ZM2.5 1C1.67157 1 1 1.67157 1 2.5V12.5C1 13.3284 1.67157 14 2.5 14H12.5C13.3284 14 14 13.3284 14 12.5V2.5C14 1.67157 13.3284 1 12.5 1H2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}</Toggle>
                <Button onClick={addWallet} className="h-11">Add Wallet</Button>
                <div>
                    <DialogDelete clear={clear} />
                </div>
            </div>
        </div>
        <div className={`grid grid-cols-1 truncate gap-5 ${tile ? "md:grid-cols-2 lg:grid-cols-3" : ""}`}>
            {wallets.map(e => <AnimationWrap><Wallet id={e.id} pri={e.pri} pub={e.pub} setWallets={setWallets} /></AnimationWrap>)}
        </div>
    </>)
}


export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy!", err);
    }
}
