import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { ArrowUp, Plus } from "lucide-react";

interface FirstLoadProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isFirstLoad: boolean;
  setIsFirstLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstLoad = ({
  query,
  setQuery,
  isFirstLoad,
  setIsFirstLoad
}: FirstLoadProps) => {

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setIsFirstLoad(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6 w-full px-8'>
      <h1 className='font-semibold text-lg sm:text-2xl'>How can I help you today?</h1>
    </div>
  )
}

export default FirstLoad