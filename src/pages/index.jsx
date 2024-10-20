/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import SearchBar from "../components/SearchBar";
import Skeleton from "../components/Skeleton";
import Card from "../components/Card";
import { getSearch } from "../services/omdb";

export default function Home() {
    const [isSearching, setIsSearching] = useState(false);
    const [resultData, setResultData] = useState([]);

    const handleSearch = async (query) => {
        setIsSearching(true);

        try {
            const moviesData = await getSearch(query);
            setResultData(moviesData);
            console.log(moviesData);
        } catch (error) {
            console.error("Failed to fetch movies", error);
        } finally {
            setTimeout(() => {
                setIsSearching(false);
            }, 3000);
        }
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
                ) : resultData.length > 0 ? (
                    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                        {resultData.map((movie) => (
                            <Card key={movie.imdbID} data={movie} />
                        ))}
                    </div>
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

