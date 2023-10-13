import { useEffect, useState } from "react";
import {getCategories} from "../api/search-api/categories";

export const useCategories = () => {
    const [categories, setCategories] = useState([]) as any[];

    useEffect(() => {
        if (!categories.length) {
            getCategories().then((categories) => {
                console.log(categories);
                setCategories(categories);
            });
        }
    }, []);

    return categories;
};