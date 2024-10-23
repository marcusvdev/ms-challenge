import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';
import { isFavorite } from '../../services/favorites';
import '@testing-library/jest-dom';

jest.mock('../../services/favorites', () => ({
    isFavorite: jest.fn(),
}));

describe('Card component', () => {
    const mockData = {
        imdbID: 'tt0944947',
        Title: 'Game of Thrones',
        Year: '2011–2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BOGY3NTg1ODMtOGIzZS00YWFiLTgzYzktNzBiYWZkYjcwNGRhXkEyXkFqcGc@._V1_SX300.jpg',
        Rated: 'TV-MA',
        Released: '17 Apr 2011',
        Runtime: '57 min',
        Genre: 'Action, Adventure, Drama',
        Director: 'N/A',
        Writer: 'David Benioff, D.B. Weiss',
        Actors: 'Emilia Clarke, Peter Dinklage, Kit Harington',
        Plot: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
        Language: 'English',
        Country: 'United States, United Kingdom',
        Awards: 'Won 59 Primetime Emmys. 397 wins & 655 nominations total',
        Ratings: [{ Source: 'Internet Movie Database', Value: '9.2/10' }],
        imdbRating: '9.2',
        imdbVotes: '2,348,679',
        Type: 'series',
        totalSeasons: '8',
        Response: 'True',
    };

    it('should render the movie title and year', () => {
        render(<Card data={mockData} />);
        const titleElement = screen.getByText(mockData.Title);
        const yearElement = screen.getByText(/2011–2019/i);
        expect(titleElement).toBeInTheDocument();
        expect(yearElement).toBeInTheDocument();
    });

    it('should render the movie poster when available', () => {
        render(<Card data={mockData} />);
        const imageElement = screen.getByAltText(mockData.Title);
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(mockData.Poster)));
    });

    it('should display title if the poster is not available', () => {
        const mockDataNoPoster = {
            ...mockData,
            Poster: 'N/A',
        };
        render(<Card data={mockDataNoPoster} />);
        const titleFallback = screen.getByText(mockData.Title, { selector: 'h3' });
        expect(titleFallback).toBeInTheDocument();
    });

    it('should show the favorite icon if the movie is a favorite', () => {
        isFavorite.mockReturnValue(true);
        render(<Card data={mockData} />);
        const favoriteIcon = screen.getByTestId('favorite-icon');
        expect(favoriteIcon).toBeInTheDocument();
    });

    it('should show the non-favorite icon if the movie is not a favorite', () => {
        isFavorite.mockReturnValue(false);
        render(<Card data={mockData} />);
        const nonFavoriteIcon = screen.getByTestId('non-favorite-icon');
        expect(nonFavoriteIcon).toBeInTheDocument();
    });
});
