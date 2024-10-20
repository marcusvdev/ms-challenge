import axios from "axios";

const OMDB_API_URL = process.env.NEXT_PUBLIC_APIURL;
const OMDB_API_KEY = process.env.NEXT_PUBLIC_APIKEY;

export const getSearch = async (query) => {
    try {
        const response = await axios.get(`${OMDB_API_URL}`, {
            params: {
                s: query,
                apikey: OMDB_API_KEY,
            },
        });
        return response.data.Search || [];
    } catch (error) {
        console.error("Error fetching", error);
        throw error;
    }
};

export const getDetails = async (id) => {
    try {
        const response = await axios.get(`${OMDB_API_URL}`, {
            params: {
                i: id,
                apikey: OMDB_API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching details", error);
        throw error;
    }
};
