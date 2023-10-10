import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export const useSessionToken = () => {
    const { get, set } = useLocalStorage();
    const sessionToken = useMemo(() => {
        if (!get("sessionToken")) {
            set("sessionToken", uuidv4());
        }
        return get("sessionToken");
    }, [get]);

    return sessionToken;
};