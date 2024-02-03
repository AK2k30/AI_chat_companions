"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

export const SearchInput = () => {
    const router = useRouter();
    const SearchParams = useSearchParams();
    const categoryId = SearchParams.get("categoryId");
    const name = SearchParams.get("name");
    const [value, setValue] = useState(name || "");
    const debounceValue = useDebounce<String>(value, 500);
    
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    useEffect(() => {
        const query = {
            name: debounceValue,
            categoryId: categoryId || null,
        };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query,
        }, { skipEmptyString: true, skipNull: true });

        router.push(url);
    }, [debounceValue, router, categoryId]);

    return(
        <div className="relative">
            <Search className="absolute h-4 w-4 top-3 left-4 text-text-muted-foreground"/>
            <Input onChange={onChange} value={value} placeholder="search" className="pl-10 bg-primary/10"/>
        </div>
    )
}