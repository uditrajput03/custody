import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { DialogClose } from "@radix-ui/react-dialog"

export function DialogDelete({ clear }) {
    return (<>
        <Dialog>
            <DialogTrigger>
                <Button className="h-11" variant={"destructive"}>Clear Wallets</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete all your wallet.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>

                        <Button className="" variant={"default"}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={clear} variant={"destructive"}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>)
}