import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArtistItem = ({ item }) => {
    const navigate = useNavigate()

    const handlerClickItem = () => {
        navigate(item?.link)
    }

    return (
        <div className="flex flex-col glass2 rounded-xl overflow-hidden cursor-pointer max-1200:w-[80px] "
            onClick={handlerClickItem}
        >
            <div className="mb-[10px]">
                <img
                    src={item.thumbnail}
                    alt="thumbnailM"
                    className="hover:scale-110 duration-500"
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