import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'; // Imported toast here

const ViewPaste = () => {
    const { id } = useParams();

    const allPastes = useSelector((state) => state.paste.pastes);
    const paste = allPastes.find((p) => p._id === id);
    
    if (!paste) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#A6D6F3] to-[#E3F2FD] pt-24 px-6 sm:px-12 -mt-24 pb-12 flex justify-center items-center">
                <div className="text-xl font-medium text-gray-800 bg-white/70 backdrop-blur-lg px-10 py-6 rounded-full border border-white/80 shadow-sm">
                    Fragment not found.
                </div>
            </div>
        );
    }

    // Copy Logic with Toast
    const handleCopy = () => {
        navigator.clipboard.writeText(paste.content);
        toast.success("Content copied to clipboard!"); 
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#A6D6F3] to-[#E3F2FD] pt-24 px-6 sm:px-12 -mt-24 pb-12">
            <div className="max-w-4xl mx-auto mt-16">
                <div className="bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80">
                    
                    <div className='flex flex-col sm:flex-row gap-4 justify-between items-center mb-6'>
                        <input 
                            className='w-full px-6 py-4 rounded-full bg-white text-gray-900 shadow-sm text-lg font-bold cursor-not-allowed opacity-90'
                            type="text" 
                            value={paste.title}
                            disabled
                        />
                        
                        <button 
                            onClick={handleCopy}
                            className='w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-[#111827] text-white rounded-full font-semibold hover:bg-black active:scale-95 transition-all shadow-md flex items-center justify-center gap-2'
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy Content
                        </button>
                    </div>
                    
                    <div>
                        <textarea 
                            className="w-full rounded-3xl bg-white text-gray-900 p-8 shadow-sm resize-y text-base leading-relaxed cursor-not-allowed opacity-90"
                            rows={16}
                            value={paste.content}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPaste;