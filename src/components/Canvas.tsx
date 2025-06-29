import type { ReactNode } from "react";

export function Canvas({ children }: {children: ReactNode}) {
    return (<>
        <div className="m-5 md:m-7 pt-1 md:px-20">
            {children}
        </div>
    </>)
}