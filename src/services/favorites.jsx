export const getFavorites = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
};

export const addFavorite = (movie) => {
    const favorites = getFavorites();
    const updatedFavorites = [...favorites, movie];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const removeFavorite = (id) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

export const isFavorite = (id) => {
    const favorites = getFavorites();
    return favorites.some(movie => movie.imdbID === id);
};
