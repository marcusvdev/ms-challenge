/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skeleton";

export default function Home() {
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (query) => {
        console.log(query);
        setIsSearching(true);

        setTimeout(() => {
            setIsSearching(false);
        }, 10000);
    };

    return (
        <>
            <Head>
                <title>Movies and Series | Challenge</title>
                <meta name="description" content="Movies and Series | Challenge" />
            </Head>

            <SearchBar onSearch={handleSearch} />

            <div className="flex flex-col items-center space-y-4">
                {isSearching ? (
                    <Skeleton className="w-32" />
                ) : (
                    <>
                        <Image
                            src="/images/empty.png"
                            alt="Don't know what to search?"
                            width={275}
                            height={112}
                        />
                        <p className="text-white text-2xl font-bold">
                            Don't know what to search?
                        </p>
                        <p className="text-gray-400">Here's an offer you can't refuse</p>
                    </>
                )}
            </div>
        </>
    );
}
