import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchSongs = () => {
    const navigate = useNavigate()
    navigate("bai-hat")
    return (
        <div>SearchSongs</div>
    )
}

export default SearchSongs