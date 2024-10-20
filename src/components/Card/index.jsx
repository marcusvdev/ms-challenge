import { isFavorite } from "../../services/favorites";
import Image from "next/image";
import Link from "next/link";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function Card({ data }) {
    return (
        <div className="relative w-full h-[198px] group"> {/* Adicionando o group aqui */}
            <Link href={`/single/${data.imdbID}`} className="w-full h-full flex justify-center items-center relative">
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
            </Link>
            {/* O overlay agora usa group-hover */}
            <div className="absolute inset-0 flex flex-col justify-between items-center bg-[#192228] bg-opacity-90 text-white rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"> {/* Alteração aqui */}
                <div className="w-full flex justify-end p-2">
                    {isFavorite(data.imdbID) ? (
                        <MdFavorite className="w-6 h-6 text-red-500" />
                    ) : (
                        <MdFavoriteBorder className="w-6 h-6 text-gray-300" />
                    )}
                </div>
                <div className="w-full p-2">
                    <h3 className="text-lg font-bold">{data.Title}</h3>
                    <p className="text-sm">{data.Year}</p>
                </div>
            </div>
        </div>
    );
}
