"use client";
import { useEffect, useState } from "react";


// check

export default function MessageTime({ stamp }: { stamp: number }) {
    const [formatted, setFormatted] = useState("");

    useEffect(() => {
        setFormatted(
            new Date(stamp).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            })
        );
    }, [stamp]);

    return <>{formatted}</>;
}
