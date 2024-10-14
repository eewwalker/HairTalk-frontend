"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { TagInputProps } from '@/types';

const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    //update inputValue onChange to value
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    //removeTag from tags array
    const removeTag = (idx: number) => {
        setTags(prevTags => prevTags.filter((t, i) => i !== idx));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue && !tags.includes(inputValue.toLowerCase()) && tags.length < 5) {
            e.preventDefault();
            setTags(prevTags => [...prevTags, inputValue.toLowerCase()]);
            setInputValue('');
        }
    };



    return (
        <div>
            <div className='flex mb-2'>
                {tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-[#0c6999] text-white px-2 py-1 rounded">
                        {tag}
                        <button onClick={() => removeTag(index)} className="ml-2 text-xs">&times;</button>
                    </div>
                ))}
            </div>
            <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add up to 5 tags..."
                disabled={tags.length === 5}
            />
        </div>
    );
};



export default TagInput;