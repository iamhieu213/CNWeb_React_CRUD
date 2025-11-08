import { useState, useEffect, useRef } from 'react'

const SearchForm = ({ onSearchChange }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(inputValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, onSearchChange]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    return (
        <div className="search-container">
            <input 
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Tìm theo name, username"
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchForm