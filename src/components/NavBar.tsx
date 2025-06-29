import { Badge } from "./ui/badge";
import { ModeToggle } from "./ui/ModeToogle";
import { Wallet } from 'lucide-react';

export function NavBar() {
    return <>
        <nav>
            <div className=" flex items-center justify-between">
                <div className="flex gap-2 text-3xl items-center">
                    <span className="text-gray-500">
                        {/* $ */}
                        <Wallet className="size-8" />
                    </span>
                    <span className="font-bold">
                        Custody
                    </span>
                    <Badge variant={"outline"} className="h-5 mt-2">v1.0</Badge>
                </div>
                <div className="flex px-5 md:px-10">
                    <ModeToggle />

                </div>
            </div>
        </nav>
    </>
}