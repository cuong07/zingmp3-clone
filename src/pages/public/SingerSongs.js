import { useSingleton } from '@tippyjs/react';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as apis from "../../apis"
import { SongItem } from '../../components';
import homeSlice from '../../store/homeSlice';
import icons from '../../ultis/icon';

const { FaPlay, MdKeyboardArrowDown, MdFilterList } = icons;

const SingerSongs = () => {
    const dispatch = useDispatch()
    const { artistId, artist } = useSelector(state => state.artist)
    const [artistSongs, setArtistSongs] = useState(null)

    useEffect(() => {
        const fetchArtistSongs = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.getArtistSongs(artistId, 1, 100)
            dispatch(homeSlice.actions.setIsLoadingPage(false));
            response && setArtistSongs(response?.data?.data)
        }
        fetchArtistSongs()
    }, [artistId, dispatch]);

    console.log(artist);
    return (
        <div className='px-[59px] flex flex-col mt-12'>
            <div className='flex justify-between text-main-text font-bold'>
                <div className='flex text-[20px] items-center '>
                    <span className=''>{artist?.name}</span>
                    <span> - Tất Cả Bài Hát</span>
                    <span className='p-2 bg-blue-600 rounded-full ml-2'>
                        <FaPlay />
                    </span>
                </div>
                <div className='flex gap-2 bg-slate-500 bg-opacity-30 items-center rounded-3xl px-2'>
                    <MdFilterList />
                    <span>Mới nhất</span>
                    <MdKeyboardArrowDown />
                </div>
            </div>
            {artistSongs?.items?.map(item => (
                <SongItem id={item.encodeId} title={item.title} image={item.thumbnailM} key={item.encodeId} artist={item.artistsNames} styleImage="w-10 h-10" />
            ))}
        </div>
    )
}

export default SingerSongs;