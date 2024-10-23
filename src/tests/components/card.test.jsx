import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';
import { isFavorite } from '../../services/favorites';
import '@testing-library/jest-dom';

jest.mock('../../services/favorites', () => ({
    isFavorite: jest.fn(),
}));

describe('Card component', () => {
    const mockData = {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://example.com/inception.jpg',
    };

    it('should render the movie title and year', () => {
        render(<Card data={mockData} />);

        const titleElement = screen.getByText(/inception/i);
        const yearElement = screen.getByText(/2010/i);
        expect(titleElement).toBeInTheDocument();
        expect(yearElement).toBeInTheDocument();
    });

    it('should render the movie poster when available', () => {
        render(<Card data={mockData} />);
        const imageElement = screen.getByAltText('Inception');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', mockData.Poster);
    });

    it('should display title if the poster is not available', () => {
        const mockDataNoPoster = {
            ...mockData,
            Poster: 'N/A',
        };
        render(<Card data={mockDataNoPoster} />);
        const titleFallback = screen.getByText(/inception/i);
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
