

import { X } from 'lucide-react';
import Drawer from 'react-modern-drawer'

export interface InfoDrawerProps {
    modalActive: boolean;
    closeModal: () => void;
}

export default function InfoDrawer(props: InfoDrawerProps) {

    return (

        <Drawer
            size={410}
            open={props.modalActive}
            onClose={props.closeModal}
            direction='bottom'
            className='rounded-t-2xl'
            zIndex={9999}
        >
            <div className='relative'>
                <X className='w-5 absolute top-2 right-3' 
                onClick={props.closeModal}
                />
                <h1 className='text-center border-b border-b-gray-200 font-bold text-sm p-3'>Tips Prompting</h1>
            </div>
            <div className='p-4'>
                <p className='text-sm text-[#72728b]'>
                    Gunakan informasi kesehatanmu
                    saat bertanya agar jawaban lebih relevan dan sesuai.
                </p>
                <div className='my-2 p-3 bg-[#F6FAFE] text-sm text-[#72728b] font-bold'>
                    <p>Contoh:</p>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 rounded-full bg-black flex-shrink-0"></span>
                            <span>"Tolong cek kandungan gizi makanan ini, apakah cocok untuk saya yang BB 70kg, tb 170cm?"</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 rounded-full bg-black flex-shrink-0"></span>
                            <span>"Rekomendasikan makanan yang cocok untuk penderita diabetes."</span>
                        </li>
                    </ul>
                </div>
                <p className='text-sm text-[#72728b]'>
                    Jika jawabannya tidak sesuai atau keliru, kamu bisa koreksi langsung.
                </p>
            </div>
            <div className='px-4'>
                <button 
                onClick={props.closeModal}
                className='p-3 rounded-lg border text-sm font-bold border-[#509EE3] text-[#509EE3] w-full'>Mengerti</button>
            </div>
        </Drawer>
    )
}

