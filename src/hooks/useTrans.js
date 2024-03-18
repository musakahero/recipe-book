/* Tracks and changes the state of the element on mount. */
import { useEffect, useState } from "react";

export const useTrans = ({defaultState}) => {
    const [mounted, setMounted] = useState(defaultState);
    useEffect(() => {
        setMounted(true);
    }, [])
    return {mounted}
}