import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../../ultis/fn";
import { useNavigate } from "react-router-dom";
import musicSlide from "../../store/musicSlice";

const Slider = () => {
    const banner = useSelector((state) => state.home.banner.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ainimation for banner
    useEffect(() => {
        const sliderEls = document.getElementsByClassName("slider-item");
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArrSlider(min, max, sliderEls.length - 1);
            for (let i = 0; i < sliderEls.length; i++) {
                // Delete classnames (css)
                sliderEls[i]?.classList?.remove(
                    "animate-slide-right",
                    "order-last",
                    "z-20"
                );
                sliderEls[i]?.classList?.remove(
                    "animate-slide-left",
                    "order-first",
                    "z-10"
                );
                sliderEls[i]?.classList?.remove(
                    "animate-slide-left2",
                    "order-2",
                    "z-10"
                );

                // Hide or Show images
                if (list.some((item) => item === i)) {
                    sliderEls[i].style.cssText = `display: block`;
                } else {
                    sliderEls[i].style.cssText = `display: none`;
                }
            }
            // Add animation by adding classnames
            list.forEach((item) => {
                if (item === max) {
                    sliderEls[item]?.classList?.add(
                        "animate-slide-right",
                        "order-last",
                        "z-20"
                    );
                } else if (item === min) {
                    sliderEls[item]?.classList?.add(
                        "animate-slide-left",
                        "order-first",
                        "z-10"
                    );
                } else {
                    sliderEls[item]?.classList?.add(
                        "animate-slide-left2",
                        "order-2",
                        "z-10"
                    );
                }
            });
            min = min === sliderEls.length - 1 ? 0 : min + 1;
            max = max === sliderEls.length - 1 ? 0 : max + 1;
        }, 2000);
        return () => {
            intervalId && clearInterval(intervalId);
        };
    }, []);

    const handleClickBanner = (item) => {
        if (item?.type === 1) {
            dispatch(musicSlide.actions.setCurSongId(item.encodeId));
            dispatch(musicSlide.actions.setIsPlaying(true));
        } else if (item?.type === 4) {
            const albumPath = item?.link?.split(".")[0];
            navigate(albumPath);
        } else {
            dispatch(musicSlide.actions.setAtAlbum(false));
        }
    };

    return (
        <div className="w-full overflow-hidden 1200:px-[59px]">
            <div className="flex w-full gap-8 pt-8">
                {banner?.map((item, index) => (
                    <img
                        key={item.encodeId}
                        src={item.banner}
                        onClick={() => handleClickBanner(item)}
                        className={`slider-item flex-1 object-contain 640:w-[30%] w-3/4 rounded-lg ${index <= 2 ? "block" : "hidden"
                            }`}
                        alt="banner"
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;
