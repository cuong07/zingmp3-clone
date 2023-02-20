import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import musicSlide from '../../store/musicSlice'

const SearchSongs = () => {
    const { songs } = useSelector(state => state.search)
    const dispatch = useDispatch()

    const getSongIdHandler = (songId) => {
        dispatch(musicSlide.actions.setCurSongId(songId));
        dispatch(musicSlide.actions.setIsPlaying(true));
        dispatch(musicSlide.actions.setAtAlbum(true));
    };

    return (
        <div className='px-[49px] mt-[49px]'>
            <h3 className='font-semibold text-lg text-main-text mb-4'>Bài hát</h3>
            <div className='flex flex-col w-full'>
                {songs?.map((item) => (
                    <div className='flex w-full px-2 py-2 hover:bg-[#333] items-center rounded-md cursor-pointer' onClick={() => getSongIdHandler(item.encodeId)}>
                        <div className='flex w-1/3 gap-3'>
                            <img src={item?.thumbnailM} alt="avatar" className='w-10 h-10 rounded-md' />
                            <div className="flex flex-col">
                                <span className='text-main-text'>{item?.title}</span>
                                <span className='text-[#ffffff80]'>{item?.artistsNames}</span>
                            </div>
                        </div>
                        <div className='w-1/3 text-center text-[#ffffff80] hover:decoration-slice'>
                            <NavLink to={item?.album?.link?.split(".")[0]}>{item?.album?.title}</NavLink>
                        </div>
                        <div className='w-1/3 text-right text-[#ffffff80]'>
                            {moment.utc(item?.duration * 1000).format("mm:ss")}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchSongs