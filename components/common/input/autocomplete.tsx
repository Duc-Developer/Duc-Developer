import { classNames } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface AutocompleteProps {
    suggestions: string[];
    className?: string;
    placeholder?: string;
    onSelected?: (values?: string[]) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ suggestions, className, onSelected, placeholder }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [userInput, setUserInput] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        onSelected && onSelected(selectedTags);
    }, [selectedTags])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = suggestions.filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setUserInput(e.currentTarget.value);
        setFilteredSuggestions(filteredSuggestions);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    };

    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const newTag = e.currentTarget.innerText;
        if (!selectedTags.includes(newTag)) {
            setSelectedTags([...selectedTags, newTag]);
        }
        setFilteredSuggestions([]);
        setUserInput('');
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newTag = userInput.trim();
            if (newTag && !selectedTags.includes(newTag)) {
                setSelectedTags([...selectedTags, newTag]);
            }
            setUserInput('');
            setFilteredSuggestions([]);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex === 0) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className={
                classNames(
                    "absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10 list-none pl-4",
                    "max-h-96 overflow-auto"
                )
            }>
                {filteredSuggestions.map((suggestion, index) => {
                    let style;
                    if (index === activeSuggestionIndex) {
                        style = 'bg-blue text-neutral';
                    }
                    return (
                        <li
                            className={`p-2 cursor-pointer ${style}`}
                            key={suggestion}
                            onClick={onClick}
                        >
                            {suggestion}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="absolute bg-white border border-gray-300 w-full mt-1 rounded-md shadow-lg z-10 p-2">
                <em>No suggestions available</em>
            </div>
        );
    };

    return (
        <div className={classNames("relative w-full", className)}>
            <div className="flex flex-wrap gap-2 mb-2 max-h-48 overflow-auto">
                {selectedTags.map(tag => (
                    <div key={tag} className="bg-purple text-neutral px-2 py-1 rounded-md flex items-center">
                        {tag}
                        <button
                            type="button"
                            className="ml-2 text-white"
                            onClick={() => removeTag(tag)}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder={placeholder}
            />
            {showSuggestions && userInput && <SuggestionsListComponent />}
        </div>
    );
};

export default Autocomplete;