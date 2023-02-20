import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SearchPlaylist = () => {

    const { playlists } = useSelector(state => state.search)
    const navigate = useNavigate()

    const handlerSetAlbum = (item) => {
        const albumPath = item?.link?.split(".")[0];
        navigate(albumPath)
    }

    return (
        <div className='px-[59px] mt-12 flex flex-col '>
            <h2 className='text-main-text text-lg font-semibold mb-4'>Playlist/Album</h2>
            <div className='flex gap-4 flex-wrap justify-between'>
                {playlists?.map((item) => (
                    <div className='w-[20%] ' onClick={() => handlerSetAlbum(item)}>
                        <div className='rounded-md overflow-hidden mb-[10px]'>
                            <img src={item.thumbnailM} alt="thumbnailM" className='hover:scale-110 duration-500' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-sm text-main-text'>{item.title}</span>
                            <span className='text-[#ffffff80] text-sm'>{item.artistsNames}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchPlaylist