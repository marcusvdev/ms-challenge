import { getSearch, getDetails } from '../../services/omdb';
import axios from 'axios';

jest.mock('axios');

describe('OMDB Service', () => {
    const query = 'blade';
    const movieId = 'tt0083658';
    const apiUrl = process.env.NEXT_PUBLIC_APIURL;
    const apiKey = process.env.NEXT_PUBLIC_APIKEY;
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });

    describe('getSearch', () => {
        it('should return search results when the API call is successful', async () => {
            const mockResponse = { data: { Search: [{ Title: 'Blade', Year: '1982', imdbID: 'tt0083658' }] } };
            axios.get.mockResolvedValue(mockResponse);
            const results = await getSearch(query);
            expect(axios.get).toHaveBeenCalledWith(`${apiUrl}`, {
                params: {
                    s: query,
                    apikey: apiKey,
                },
            });
            expect(results).toEqual(mockResponse.data.Search);
        });

        it('should return an empty array if no results are found', async () => {
            const mockResponse = { data: { Search: null } };
            axios.get.mockResolvedValue(mockResponse);
            const results = await getSearch(query);
            expect(results).toEqual([]);
        });

        it('should throw an error when the API call fails', async () => {
            axios.get.mockRejectedValue(new Error('API error'));
            await expect(getSearch(query)).rejects.toThrow('API error');
        });
    });

    describe('getDetails', () => {
        it('should return movie details when the API call is successful', async () => {
            const mockResponse = { data: { Title: 'Blade', Year: '1982', imdbID: 'tt0083658' } };
            axios.get.mockResolvedValue(mockResponse);
            const result = await getDetails(movieId);
            expect(axios.get).toHaveBeenCalledWith(`${apiUrl}`, {
                params: {
                    i: movieId,
                    apikey: apiKey,
                },
            });
            expect(result).toEqual(mockResponse.data);
        });

        it('should throw an error when the API call fails', async () => {
            axios.get.mockRejectedValue(new Error('API error'));
            await expect(getDetails(movieId)).rejects.toThrow('API error');
        });
    });
});
