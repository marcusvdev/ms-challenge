/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skeleton";
import Card from "../components/Card";
import { getSearch } from "../services/omdb";

export default function Home() {
    const [isSearching, setIsSearching] = useState(false);
    const [resultData, setResultData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const lastQuery = localStorage.getItem("lastSearchQuery");
        if (lastQuery) {
            setSearchQuery(lastQuery);
            handleSearch(lastQuery);
        }
    }, []);

    const handleSearch = async (query) => {
        setIsSearching(true);
        setSearchQuery(query);

        localStorage.setItem("lastSearchQuery", query);

        try {
            const moviesData = await getSearch(query);
            setResultData(moviesData);
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setTimeout(() => {
                setIsSearching(false);
            }, 2000);
        }
    };

    return (
        <>
            <Head>
                <title>Movies and Series | Challenge</title>
                <meta name="description" content="Movies and Series | Challenge" />
            </Head>

            <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />

            <div className="flex flex-col items-center space-y-4 mt-6">
                {isSearching ? (
                    <Skeleton className="w-32" />
                ) : resultData.length > 0 ? (
                    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 xl:gap-8">
                        {resultData.map((movie) => (
                            <Card key={movie.imdbID} data={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-44 text-center flex items-center flex-col">
                        <Image
                            src="/images/empty.png"
                            alt="Don't know what to search?"
                            width={275}
                            height={112}
                        />
                        <p className="text-white text-2xl font-bold mb-2 mt-6">
                            Don't know what to search?
                        </p>
                        <p className="text-[#7B8C98] text-base">Here's an offer you can't refuse</p>
                    </div>
                )}
            </div>
        </>
    );
}

