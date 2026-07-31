import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import copyIcon from "../assets/copy.png";
import editIcon from "../assets/edit.png";
import viewIcon from "../assets/view.png";
import deleteIcon from "../assets/delete.png";
import shareIcon from "../assets/share.png";

const Pastes = () => {
    const pastes = useSelector((state)=>state.paste.pastes);
    const [searchTerm, setSearchTerm] = useState('');

    const filterData = pastes.filter((paste) => 
        paste.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const dispatch = useDispatch();

    function handleDelete(paste){
        dispatch(removeFromPastes(paste));
    }

    
    const handleShare = async (paste) => {
        const shareUrl = `${window.location.origin}/pastes/${paste._id}`;
        const shareData = {
            title: paste.title,
            text: `Check out this fragment: ${paste.title}`,
            url: shareUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.log("Sharing canceled or failed:", error);
            }
        } else {
            
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
        }
    };

    const cardStyles = [
        "border-[#ffcce6] bg-[#fff5fa]", 
        "border-[#fef08a] bg-[#fefce8]", 
        "border-[#bbf7d0] bg-[#f0fdf4]", 
        "border-[#bfdbfe] bg-[#eff6ff]", 
    ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A6D6F3] to-[#E3F2FD] pt-24 px-6 sm:px-12 -mt-24 pb-12">
        <div className="max-w-5xl mx-auto mt-12 flex flex-col gap-10">
            
            <input 
                className='w-full max-w-2xl mx-auto px-8 py-4 rounded-full bg-white/70 backdrop-blur-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/80 transition-all text-lg font-medium'
                type="search"
                placeholder='Search your space...'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                {
                    filterData.length > 0 ? (
                        filterData.map((paste, index) => {
                            const styleClass = cardStyles[index % cardStyles.length];
                            
                            return(
                                <div 
                                    className={`rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between gap-4 border-2 ${styleClass}`} 
                                    key={paste?._id}
                                >
                                    <div className='flex flex-col gap-3'>
                                        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
                                            {paste.title}
                                        </h2>
                                        <p className="text-sm text-gray-700 line-clamp-4 leading-relaxed">
                                            {paste.content}
                                        </p>
                                    </div>
                                    
                                    <div className='flex flex-row justify-between items-center mt-6 pt-4 border-t border-black/5'>
                                        <span className="text-xs font-semibold text-gray-500">
                                            {new Date(paste.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                        
                                        <div className='flex flex-row gap-1 items-center bg-white/50 backdrop-blur-sm rounded-full p-1 shadow-sm'>
                                            <Link to={`/?pasteId=${paste?._id}`} className="p-1.5 hover:bg-white rounded-full transition-colors" title="Edit">
                                                <img className="w-4 h-4 opacity-70" src={editIcon} alt="edit" />
                                            </Link>
                                            <Link to={`/pastes/${paste?._id}`} className="p-1.5 hover:bg-white rounded-full transition-colors" title="View">
                                                <img className="w-4 h-4 opacity-70" src={viewIcon} alt="view" />
                                            </Link>
                                            <button onClick={() => handleDelete(paste)} className="p-1.5 hover:bg-red-100 rounded-full transition-colors" title="Delete">
                                                <img className="w-4 h-4 opacity-70" src={deleteIcon} alt="delete" />
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paste?.content);
                                                    toast.success("Copied!");
                                                }}
                                                className="p-1.5 hover:bg-white rounded-full transition-colors"
                                                title="Copy Content"
                                            >
                                                <img className="w-4 h-4 opacity-70" src={copyIcon} alt="copy" />
                                            </button>
                                            
                                            
                                            <button 
                                                onClick={() => handleShare(paste)} 
                                                className="p-1.5 hover:bg-white rounded-full transition-colors" 
                                                title="Share Link"
                                            >
                                                <img className="w-4 h-4 opacity-70" src={shareIcon} alt="share" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-600 font-medium py-16 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-white/80">
                            No fragments found.
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Pastes