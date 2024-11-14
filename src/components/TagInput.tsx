
"use client";

import { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { TagInputProps } from '@/types';

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(({ tags = [], setTags }, ref) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const removeTag = (idx: number) => {
        setTags(prevTags => prevTags.filter((t, i) => i !== idx));
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue && !tags.includes(inputValue.toLowerCase()) && tags.length < 5) {
            e.preventDefault();
            const newTags = [...tags, inputValue.toLowerCase()];
            setTags(newTags);
            setInputValue('');
        }
    };

    return (
        <div>
            <Input
                ref={ref}
                type="text"
                className='text-[#0c6999]'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Add up to 5 tags..."
                disabled={tags.length === 5}
            />
            <div className='flex flex-wrap gap-2 mt-2'>
                {tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-[#0c6999] text-white px-2 py-1 rounded">
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="ml-2 text-xs"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});

TagInput.displayName = 'TagInput';

export default TagInput;