import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import * as apis from "../../apis"
import { SongItem } from '../../components'
import SectionItem from '../../components/Section/SectionItem'
import artistSlice from '../../store/artistSlice'
import homeSlice from '../../store/homeSlice'
import LoadingPage from '../../UI/LoadingPage'
import icons from "../../ultis/icon"

const { FaPlay, HiUserAdd } = icons;

const Singer = () => {
    const { singer } = useParams()
    const dispatch = useDispatch()
    const [artist, setArtist] = useState(null);
    const [artistSongsNew, setArtistSongsNew] = useState(null);
    const [singleNew, setSingleNew] = useState(null);
    const [albumNew, setAlbumNew] = useState(null);
    const { isLoadingPage } = useSelector(state => state.home)
    const { artistSongs, aSingle, aAlbum, aPlaylist } = useSelector(state => state.artist)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchArtist = async () => {
            dispatch(homeSlice.actions.setIsLoadingPage(true));
            const response = await apis.getArtist(singer)
            dispatch(homeSlice.actions.setIsLoadingPage(false));

            dispatch(artistSlice.actions.getArtistSongs(response?.data?.data?.sections))
            dispatch(artistSlice.actions.getArtistPlaylist(response?.data?.data?.sections))
            dispatch(artistSlice.actions.getArtistId(response?.data?.data.id))

            dispatch(artistSlice.actions.setArtist(response?.data?.data))
            setArtist(response?.data?.data)
        }
        fetchArtist()
    }, [singer])
    useEffect(() => {
        setArtistSongsNew(artistSongs?.items?.slice(0, 6))
        setSingleNew(aSingle?.items?.slice(0, 5))
        setAlbumNew(aAlbum?.items?.slice(0, 5))
    }, [artistSongs, aSingle, aAlbum])

    console.log("artist :", artist);

    const handleClickPlaylist = (item) => {
        if (item?.subType === 1) {
            const albumPath = item?.link?.split(".")[0];
            navigate(albumPath);
        }
    };
    return (
        <div className='1200:px-[59px]'>
            {!isLoadingPage &&
                <div className='w-full'>
                    <div className='h-[350px] overflow-hidden duration-500 relative'>
                        <img src={artist?.cover} alt="avatar" className='w-full object-cover duration-500 min-w-max' />
                        <div className='absolute bg-gradient-bg-artist top-0 left-0 right-0 bottom-0'></div>
                        <div className='absolute bottom-6 left-8'>
                            <div className='flex items-center gap-4'>
                                <h3 className='font-bold text-[60px] text-main-text'>{artist?.name}</h3>
                                <span className='rounded-full flex items-center justify-center p-4 bg-[#fff] duration-300 hover:bg-[#9b4de0]'>
                                    <FaPlay size={24} className='text-[#9b4de0] hover:text-[#fff] duration-300' />
                                </span>
                            </div>
                            <div className='flex gap-4 items-center'>
                                <span className='text-sm font-medium text-[#feffff] '>{`${artist?.follow} người quan tâm`}</span>
                                <span className='text-sm font-medium text-[#feffff] bg-opacity-50 flex gap-2 bg-[#8b8989] rounded-2xl py-[2px] px-2'>
                                    <HiUserAdd size={20} />
                                    <span>quan tâm</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-12 flex flex-col gap-3 min-w-fit'>
                        <div className='flex justify-between'>
                            <h3 className='text-[20px] font-bold text-main-text capitalize'>Bài hát nổi bật</h3>
                            <Link to={aSingle?.link} className=' text-xs text-[#ffffff80] uppercase hover:text-blue-500'>Tất cả</Link>
                        </div>
                        <div className='flex flex-wrap justify-between'>
                            {artistSongsNew?.map(item => (
                                <SongItem
                                    image={item.thumbnailM}
                                    title={item.title}
                                    artist={item.artistsNames}
                                    id={item.encodeId}
                                    item={item}
                                    key={item.encodeId}
                                    styleImage="w-10 h-10"
                                    style="w-[49%] border-b border-[#ffffff30]"
                                />
                            ))}
                        </div>
                    </div>
                    {/* Single & EP */}
                    <div className='mt-12 flex flex-col gap-3'>
                        <div className="flex items-center justify-between ">
                            <h3 className="text-5 font-bold text-main-text capitalize ">
                                {aSingle?.title}
                            </h3>
                            <span
                                className="text-xs uppercase text-main-text cursor-pointer"
                                title="more"
                            >
                                Tất cả
                            </span>
                        </div>
                        <div className="flex justify-between ">
                            {singleNew?.map((item) => (
                                <SectionItem
                                    key={item.encodeId}
                                    item={item}
                                    handleClickPlaylist={handleClickPlaylist}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='mt-12 flex flex-col gap-3'>
                        <div className="flex items-center justify-between ">
                            <h3 className="text-5 font-bold text-main-text capitalize ">
                                {albumNew?.title}
                            </h3>
                            <span
                                className="text-xs uppercase text-main-text cursor-pointer"
                                title="more"
                            >
                                Tất cả
                            </span>
                        </div>
                        <div className="flex">
                            {albumNew?.map((item) => (
                                <SectionItem
                                    key={item.encodeId}
                                    item={item}
                                    handleClickPlaylist={handleClickPlaylist}
                                    styleMore="w-1/5"
                                />
                            ))}
                        </div>
                    </div>
                    <div className='mt-12 flex flex-col gap-3'>
                        <div className="flex items-center justify-between ">
                            <h3 className="text-5 font-bold text-main-text capitalize ">
                                {aPlaylist?.title}
                            </h3>
                            <span
                                className="text-xs uppercase text-main-text cursor-pointer"
                                title="more"
                            >
                                Tất cả
                            </span>
                        </div>
                        <div className="flex">
                            {aPlaylist?.items?.map((item) => (
                                <SectionItem
                                    key={item.encodeId}
                                    item={item}
                                    handleClickPlaylist={handleClickPlaylist}
                                    styleMore="w-1/5"
                                />
                            ))}
                        </div>
                    </div>
                    {/* artist about */}
                    <div className='my-12 flex flex-col gap-4 '>
                        <div>
                            <h3 className='text-main-text font-bold text-[20px] capitalize '>{`Về ${artist?.realname}`}</h3>
                        </div>
                        <div className='flex gap-6'>
                            <img src={artist?.thumbnailM} alt="anh ca si" className='w-[40%] h-[300px] object-cover rounded-xl' />
                            <div className='flex flex-col 1200:w-[40%] gap-5 '>
                                <p className='text-sm text-[#ffffff80] '>{artist?.biography.replace(/<br\s*\\?>/g, "\n")}</p>
                                <div className='flex gap-3'>
                                    <span className='flex flex-col'>
                                        <span className='text-[20px] font-bold text-main-text'>{artist?.follow}</span>
                                        <span className='text-[#ffffff80] text-sm'>Người quan tâm</span>
                                    </span>
                                    <span className='flex flex-col'>
                                        <span className='text-[20px] font-bold text-main-text'>{artist?.awards?.length || "0"}</span>
                                        <span className='text-[#ffffff80] text-sm'>Giải thưởng</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {isLoadingPage && ReactDOM.createPortal(<LoadingPage />, document.getElementById('loading'))}

        </div>
    )
}

export default Singer