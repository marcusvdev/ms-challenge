import { getFavorites, addFavorite, removeFavorite, isFavorite } from './../../services/favorites';

describe('favoritesService', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('getFavorites retorna lista vazia quando não há favoritos', () => {
        const favorites = getFavorites();
        expect(favorites).toEqual([]);
    });

    test('getFavorites retorna os favoritos corretos', () => {
        const mockFavorites = [{ imdbID: 'tt1234567', title: 'Movie 1' }];
        localStorage.setItem('favorites', JSON.stringify(mockFavorites));
        
        const favorites = getFavorites();
        expect(favorites).toEqual(mockFavorites);
    });

    test('addFavorite adiciona um filme aos favoritos', () => {
        const movie = { imdbID: 'tt1234567', title: 'Movie 1' };
        addFavorite(movie);
        
        const favorites = getFavorites();
        expect(favorites).toEqual([movie]);
    });

    test('addFavorite adiciona um novo filme à lista existente de favoritos', () => {
        const movie1 = { imdbID: 'tt1234567', title: 'Movie 1' };
        const movie2 = { imdbID: 'tt2345678', title: 'Movie 2' };
        addFavorite(movie1);
        addFavorite(movie2);

        const favorites = getFavorites();
        expect(favorites).toEqual([movie1, movie2]);
    });

    test('removeFavorite remove o filme correto dos favoritos', () => {
        const movie1 = { imdbID: 'tt1234567', title: 'Movie 1' };
        const movie2 = { imdbID: 'tt2345678', title: 'Movie 2' };
        addFavorite(movie1);
        addFavorite(movie2);

        removeFavorite('tt1234567');

        const favorites = getFavorites();
        expect(favorites).toEqual([movie2]);
    });

    test('isFavorite retorna true se o filme for favorito', () => {
        const movie = { imdbID: 'tt1234567', title: 'Movie 1' };
        addFavorite(movie);

        const result = isFavorite('tt1234567');
        expect(result).toBe(true); 
    });

    test('isFavorite retorna false se o filme não for favorito', () => {
        const movie = { imdbID: 'tt1234567', title: 'Movie 1' };
        addFavorite(movie);

        const result = isFavorite('tt2345678');
        expect(result).toBe(false);    });
});
