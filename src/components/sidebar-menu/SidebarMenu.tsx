import { PanelRightDashed, SquarePen } from 'lucide-react';
import { Sidebar, Menu } from 'react-pro-sidebar';
import { listChats } from '../../constants';

interface SidebarMenuProps {
    isOpen: boolean,
    setIsOpen: any
}

const SidebarMenu = ({ isOpen, setIsOpen }: SidebarMenuProps) => {
    return (
        <>
            {isOpen && (
                <div
                    className={`${isOpen ? 'bg-black/10' : 'bg-black/100'} transition-all duration-200 fixed inset-0 z-40 bg-black/10`}
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className={`fixed top-0 left-0 z-50 h-full w-[280px] 
            bg-white transition-transform duration-300 
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar
                width='280px'
                    className='p-1'
                    backgroundColor='white'>
                    <div className='flex items-center justify-between p-2'>
                        <img src="/images/livia.png" alt="" className="w-8" />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-black"
                            aria-label="Open sidebar"
                        >
                            <PanelRightDashed className='w-5 text-[#6f6f6f]' />
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
                    <Menu className='mt-5 px-1'>
                        <h1 className='text-sm text-gray-500 px-2'>Chats</h1>
                        <div className='flex flex-col gap-2 mt-1'>
                            {listChats.map((item, i) => {
                                return (
                                    <button
                                        className='rounded-lg px-2 py-1 text-sm text-left max-w-[250px] text-ellipsis line-clamp-1 hover:bg-gray-100'
                                        key={i}>
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </Menu>
                </Sidebar>
            </div >
        </>

    )
}

export default SidebarMenu