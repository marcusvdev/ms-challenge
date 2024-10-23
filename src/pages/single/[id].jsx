import React from 'react';
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    addFavorite,
    removeFavorite,
    isFavorite,
} from "../../services/favorites";
import { getDetails } from "../../services/omdb";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { GoArrowLeft } from "react-icons/go";

export default function Single({ data }) {
    const [isFav, setIsFav] = useState(false);
    const router = useRouter();

    console.log(data);

    useEffect(() => {
        setIsFav(isFavorite(data.imdbID));
    }, [data?.imdbID]);

    const handleFavoriteClick = () => {
        if (isFav) {
            removeFavorite(data?.imdbID);
            setIsFav(false);
        } else {
            addFavorite(data);
            setIsFav(true);
        }
    };

    const handleBack = () => {
        router.push("/");
    };

    return (
        <>
            <Head>
                <title>{data?.Title} | Movies and Series | Challenge</title>
                <meta name="description" content={data?.Plot} />
            </Head>
            <div className="w-full mb-2">
                <GoArrowLeft
                    className="w-6 h-6 text-primary-gray cursor-pointer mb-2"
                    onClick={handleBack}
                />
                <ul className="flex justify-start items-center">
                    <li className="text-primary-gray">{data?.Runtime}</li>
                    {data?.Year && (
                        <>
                            <li className="text-primary-gray mx-2">•</li>
                            <li className="text-primary-gray">{data?.Year}</li>
                        </>
                    )}
                    {data?.Rated && (
                        <>
                            <li className="text-primary-gray mx-2">•</li>
                            <li className="bg-primary-gray font-bold p-1 rounded-lg">{data?.Rated}</li>
                        </>
                    )}
                </ul>
            </div>
            <div className="w-full min-h-screen flex justify-between items-start">
                <div className="w-full md:w-7/12">
                    <h1 className="text-white text-6xl font-bold mb-8 pt-4">
                        {data?.Title}
                    </h1>
                    <div className="w-full mb-8 flex items-center gap-4">
                        <div className="flex items-stretch border-[1px] border-[#171C21] rounded-lg text-primary-gray">
                            <Image
                                src="/images/imdb.png"
                                alt="IMDb logo"
                                width={52}
                                height={32}
                                className="rounded-tl-lg rounded-bl-lg max-h-8"
                            />
                            <span className="text-white leading-8 px-2 text-xs">
                                {data.Ratings.find(
                                    (rating) => rating.Source === "Internet Movie Database"
                                )?.Value || "N/A"}
                            </span>
                        </div>
                        <div className="flex items-stretch border-[1px] border-[#171C21] rounded-lg text-primary-gray">
                            <Image
                                src="/images/rottentomatoes.png"
                                alt="Rotten Tomatoes logo"
                                width={42}
                                height={32}
                                className="rounded-tl-lg rounded-bl-lg max-h-8"
                            />
                            <span className="text-white leading-8 px-2 text-xs">
                                {data.Ratings.find(
                                    (rating) => rating.Source === "Rotten Tomatoes"
                                )?.Value || "N/A"}
                            </span>
                        </div>
                        <button
                            className="flex justify-center items-center border-[1px] border-[#171C21] rounded-lg text-xs leading-8 px-2 text-primary-gray gap-2 cursor-pointer"
                            onClick={handleFavoriteClick}
                        >
                            {isFav ? (
                                <>
                                    <MdFavorite className="w-4 h-4 text-red-500" /> Remove from
                                    favorites
                                </>
                            ) : (
                                <>
                                    <MdFavoriteBorder className="w-4 h-4 text-primary-gray" /> Add
                                    to favorites
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-white mb-8">
                        <span className="block text-primary-gray font-medium">Plot</span>
                        {data?.Plot}
                    </p>

                    <div className="w-full mb-4 flex justify-between items-start gap-8">
                        <div className="flex flex-col">
                            <span className="text-primary-gray font-medium mb-2">Cast</span>
                            <ul className="text-white">
                                {data?.Actors.split(", ").map((actor, index) => (
                                    <li key={index}>{actor}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-primary-gray font-medium mb-2">Genre</span>
                            <ul className="text-white">
                                {data?.Genre.split(", ").map((genre, index) => (
                                    <li key={index}>{genre}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-primary-gray font-medium mb-2">
                                Director
                            </span>
                            <ul className="text-white">
                                <li>{data?.Director}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative w-full md:w-4/12 h-[50vh] md:h-[90vh]">
                    <Image
                        src={data?.Poster}
                        alt={data?.Plot}
                        width={360}
                        height={508}
                        className="w-full max-h-full object-cover rounded-2xl overflow-hidden"
                    />
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const data = await getDetails(id);

    return {
        props: {
            data,
        },
    };
}
