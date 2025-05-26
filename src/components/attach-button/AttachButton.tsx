import { Image } from 'lucide-react'
import { useRef, useState } from 'react'

const AttachButton = ({ onFileChange }: { onFileChange: (file: File | null) => void }) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileClick = () => {
        inputRef.current?.click();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        onFileChange(file);

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className='relative'>
            <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button
                onClick={handleFileClick}
                className="inline-flex gap-2 border rounded-full hover:bg-white hover:shadow-md transition-all p-1 items-center text-sm font-medium"
            >
                <Image
                    size={18}
                    className="text-[#284F71]"
                />
            </button>
        </div>
    )
}

export default AttachButton