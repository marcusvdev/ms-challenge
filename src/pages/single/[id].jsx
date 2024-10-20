import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../../services/favorites";
import { getDetails } from "../../services/omdb";

export default function Single({ movie }) {
    const [isFav, setIsFav] = useState(false);

    useEffect(() => {
        setIsFav(isFavorite(movie.imdbID));
    }, [movie.imdbID]);

    const handleFavoriteClick = () => {
        if (isFav) {
            removeFavorite(movie.imdbID);
            setIsFav(false);
        } else {
            addFavorite(movie);
            setIsFav(true);
        }
    };

    return (
        <div>
            <h1>{movie.Title}</h1>
            <p>{movie.Plot}</p>
            <button onClick={handleFavoriteClick}>
                {isFav ? "💖 Remover dos Favoritos" : "🤍 Adicionar aos Favoritos"}
            </button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const movie = await getDetails(id);

    return {
        props: {
            movie, 
        },
    };
}
