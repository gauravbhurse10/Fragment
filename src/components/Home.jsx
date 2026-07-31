import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p) => p._id === pasteId);
            if(paste){
                setTitle(paste.title)
                setValue(paste.content)
            }
        }
    }, [pasteId])
    
    function createPaste(){
        const paste ={
            title : title,
            content : value, 
            _id : pasteId || Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }

        if(pasteId){
            dispatch(updateToPastes(paste));
        }else{
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A6D6F3] to-[#E3F2FD] pt-24 px-6 sm:px-12 -mt-24 pb-12">
        <div className="max-w-4xl mx-auto mt-16">
            
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-4xl font-serif text-[#111827] mb-4 tracking-tight">
                    Your space for notes, <br/> tasks, and fragments
                </h1>
            </div>

            <div className="bg-white/70 backdrop-blur-lg rounded-[2.5rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80">
                <div className='flex flex-col sm:flex-row gap-4 justify-between items-center mb-6'>
                    <input 
                        className='w-full px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm transition-all text-lg font-medium'
                        type="text" 
                        placeholder='Title your fragment...'
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                    
                    <button 
                        onClick={createPaste} 
                        className='w-full sm:w-auto whitespace-nowrap px-8 py-4 bg-[#111827] text-white rounded-full font-semibold hover:bg-black active:scale-95 transition-all shadow-md'
                    >
                        {pasteId ? "Update Fragment" : "Commit Fragment"}
                    </button>
                </div>

                <div>
                    <textarea 
                        className="w-full rounded-3xl bg-white text-gray-900 placeholder-gray-400 p-8 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-sm transition-all resize-y text-base leading-relaxed"
                        placeholder='Start typing here...'
                        rows={16}
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home