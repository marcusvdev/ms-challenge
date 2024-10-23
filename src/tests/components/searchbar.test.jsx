import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../components/SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar component', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        mockOnSearch.mockClear();
    });

    it('should render the input field', () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search movies or series...');
        expect(inputElement).toBeInTheDocument();
    });

    it('should update the input value when typing', () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search movies or series...');
        fireEvent.change(inputElement, { target: { value: 'Inception' } });
        expect(inputElement.value).toBe('Inception');
        expect(mockOnSearch).toHaveBeenCalledWith('Inception');
    });

    it('should call onSearch with the correct value when typing', () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search movies or series...');
        fireEvent.change(inputElement, { target: { value: 'Matrix' } });
        expect(mockOnSearch).toHaveBeenCalledWith('Matrix');
    });

    it('should clear the input when clear button is clicked', () => {
        render(<SearchBar onSearch={mockOnSearch} searchQuery="Matrix" />);
        const inputElement = screen.getByPlaceholderText('Search movies or series...');
        fireEvent.change(inputElement, { target: { value: 'Matrix' } });
        const clearButton = screen.getByLabelText('Clear search');
        fireEvent.click(clearButton);
        expect(inputElement.value).toBe('');
        expect(mockOnSearch).toHaveBeenCalledWith('');
    });

    it('should initialize the input with the searchQuery prop value', () => {
        render(<SearchBar onSearch={mockOnSearch} searchQuery="Interstellar" />);
        const inputElement = screen.getByPlaceholderText('Search movies or series...');
        expect(inputElement.value).toBe('Interstellar');
    });
});
