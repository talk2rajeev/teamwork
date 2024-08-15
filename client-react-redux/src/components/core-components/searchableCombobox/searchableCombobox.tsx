import React, { useState, useEffect, useRef } from 'react';
import { IoMdClose, IoIosSearch } from 'react-icons/io';

interface SearchableComboBoxProps {
  items: string[];
  onSelect: (item: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
}

const SearchableCombobox: React.FC<SearchableComboBoxProps> = ({
  items,
  onSelect,
  label,
  required,
  placeholder,
  value = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const placehilderLabel = placeholder ? placeholder : 'Search...';

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) =>
        prevIndex < filteredItems.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      handleSelect(filteredItems[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelect = (item: string) => {
    setSearchTerm(item);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(item);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (listRef.current && !listRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full">
      {label ? (
        <div className="text-xs w-full text-slate-700 mb-2">
          {label}
          {required ? <span className="text-red-400">*</span> : ''}
        </div>
      ) : (
        ''
      )}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          ref={inputRef}
          className={`text-slate-700 border w-full text-xs p-2 bg-white border-1 border-slate-300 outline-slate-400 ${disabled ? 'opacity-50' : ''}`}
          placeholder={placehilderLabel}
          disabled={disabled}
        />
        <span className="absolute top-2 right-3">
          {searchTerm && !disabled ? (
            <IoMdClose
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={handleClear}
            />
          ) : (
            !disabled && <IoIosSearch size="15" className="text-gray-500 " />
          )}
        </span>
      </div>
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredItems.map((item, index) => (
            <li
              key={item}
              className={`px-4 py-2 text-xs cursor-pointer ${
                index === highlightedIndex
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
          {filteredItems.length === 0 && (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableCombobox;
