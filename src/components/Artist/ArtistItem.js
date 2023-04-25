import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArtistItem = ({ item }) => {
    const navigate = useNavigate()

    const handlerClickItem = () => {
        navigate(item?.link)
    }

    return (
        <div className="flex flex-col rounded-xl overflow-hidden cursor-pointer w-full bg-[#313131]"
            onClick={handlerClickItem}
        >
            <div className="mb-[10px]">
                <img
                    src={item.thumbnail}
                    alt="thumbnailM"
                    className="hover:scale-105 duration-500 w-full"
                />
            </div>
            <div className="flex flex-col text-center mb-2">
                <span className="font-semibold text-sm text-main-text">
                    {item.name}
                </span>
                <span className="text-[#ffffff80] text-sm">
                    {item.totalFollow > 1000
                        ? `${Math.round(
                            item.totalFollow / 1000
                        )}K quan tâm`
                        : `${item.totalFollow} quan tâm`}
                </span>
            </div>
        </div>
    )
}

export default ArtistItem