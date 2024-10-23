import React from 'react';
import { isFavorite } from "../../services/favorites";
import Image from "next/image";
import Link from "next/link";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function Card({ data }) {
    return (
        <div className="relative w-full h-[198px] group flex justify-center items-center">
            <Link href={`/single/${data.imdbID}`} className="w-full max-w-[140px] h-full flex justify-center items-center relative">
                {data.Poster !== "N/A" ? (
                    <Image
                        src={data.Poster}
                        alt={data.Title}
                        width={140}
                        height={198}
                        className="w-full h-full object-cover rounded-xl overflow-hidden"
                    />
                ) : (
                    <div className="w-full h-[198px] bg-gray-300 flex justify-center items-center text-center px-4 rounded-xl overflow-hidden">
                        {data.Title}
                    </div>
                )}
                <div className="absolute inset-0 flex flex-col justify-between items-center bg-[#192228] bg-opacity-90 text-white rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"> {/* Alteração aqui */}
                    <div className="w-full flex justify-end p-2">
                        {isFavorite(data.imdbID) ? (
                            <MdFavorite className="w-6 h-6 text-red-500" data-testid="favorite-icon" />
                        ) : (
                            <MdFavoriteBorder className="w-6 h-6 text-gray-300" data-testid="non-favorite-icon" />
                        )}
                    </div>
                    <div className="w-full p-2">
                        <h3 className="text-base font-bold">{data.Title}</h3>
                        <p className="text-sm">{data.Year}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
