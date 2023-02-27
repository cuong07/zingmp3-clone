import React, { useEffect } from 'react'
import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as apis from '../../apis'
import musicSlide from '../../store/musicSlice'

const SongLyric = ({ audio }) => {

    const dispatch = useDispatch()
    const { songLyric, curSongId } = useSelector((state) => state.music)

    useEffect(() => {
        const fetchSongLyric = async () => {
            const reponse = await apis.apiGetLyric(curSongId)
            if (reponse?.data?.err === 0) {

                dispatch(musicSlide.actions.setSongLyric(reponse?.data?.data))
            }
        }
        fetchSongLyric()
    }, [curSongId, dispatch]);
    return (
        <div>.</div>
    )
}

export default memo(SongLyric);