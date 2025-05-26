import { CheckCircle2, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { list_engine } from "../../constants";

interface DropdownProps {
  engine_index: number,
  setEngine: React.Dispatch<React.SetStateAction<number>>
}

const Dropdown = ({
  engine_index,
  setEngine
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-1 px-3 pl-4 py-1 rounded-2xl bg-[#E8EFF5] transition-all"
      >
        <span className="text-[16px] text-[#30A7DA]">{list_engine[engine_index].name}</span>
        <ChevronDown size={18} className="mt-[2px] text-[#30A7DA]" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-32 border border-[#eeeeee] bg-white rounded-xl shadow-sm z-10">
          <ul className="text-xs">
            {list_engine.map((item, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    setEngine(i);
                    setIsOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-[#30A7DA] hover:bg-[#f3f2f2] cursor-pointer flex items-center justify-between`}>
                  {item.name}
                  {engine_index === i && (
                    <CheckCircle2 size={15} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
