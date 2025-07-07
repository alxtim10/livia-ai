import { PanelLeftClose, SquarePen } from 'lucide-react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { listChats } from '../../constants';
import { useEffect, useState } from 'react';

interface SidebarMenuProps {
    isOpen: boolean,
    setIsOpen: any
}

const SidebarMenu = ({ isOpen, setIsOpen }: SidebarMenuProps) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 400); // Match new animation duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <>
            {(isOpen || isAnimating) && (
                <div
                    className={`fixed inset-0 z-40 ${isOpen ? 'animate-fade-in-overlay' : 'animate-fade-out-overlay'}`}
                    onClick={() => setIsOpen(false)}
                />
            )}
            <style>
                {`
                    @keyframes fadeInOverlay {
                        from { 
                            background-color: rgba(0, 0, 0, 0);
                            backdrop-filter: blur(0px);
                        }
                        to { 
                            background-color: rgba(0, 0, 0, 0.2);
                            backdrop-filter: blur(2px);
                        }
                    }
                    @keyframes fadeOutOverlay {
                        from { 
                            background-color: rgba(0, 0, 0, 0.2);
                            backdrop-filter: blur(2px);
                        }
                        to { 
                            background-color: rgba(0, 0, 0, 0);
                            backdrop-filter: blur(0px);
                        }
                    }
                    .animate-fade-in-overlay {
                        animation: fadeInOverlay 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                    .animate-fade-out-overlay {
                        animation: fadeOutOverlay 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                    }
                    .sidebar-content {
                        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        transform-origin: left center;
                    }
                    .sidebar-content-enter {
                        transform: scale(0.98);
                    }
                    .sidebar-content-enter-active {
                        transform: scale(1);
                    }
                `}
            </style>
            <div className={`fixed top-0 left-0 z-50 h-full w-[280px] 
            bg-white transition-all duration-300 ease-in-out
            ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'}`}>
                <Sidebar
                    width='280px'
                    className={`p-1 sidebar-content ${isOpen ? 'sidebar-content-enter-active' : 'sidebar-content-enter'}`}
                    backgroundColor='white'>
                    <div className='flex items-center justify-between p-2'>
                        <img src="/images/livia.png" alt="" className="w-8" />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-black"
                            aria-label="Open sidebar"
                        >
                            <PanelLeftClose className='w-5 text-[#6f6f6f]' />
                        </button>
                    </div>
                    <div 
                        onClick={() => {
                            window.location.reload();
                        }}  
                        className='flex items-center gap-2 mt-1 hover:bg-gray-100 rounded-lg px-2 mx-1 py-1 cursor-pointer'>
                        <SquarePen className='w-4 mt-[2px]' />
                        <h1 className='text-sm'>New Chat</h1>
                    </div>
                </Sidebar>
            </div>
        </>
    );
};

export default SidebarMenu;