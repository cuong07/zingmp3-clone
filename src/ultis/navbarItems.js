import icons from "./icon";

const { BsMusicNoteBeamed, BiCategoryAlt, AiOutlineStar, TiDivideOutline } =
    icons;

export const navbarItems = [
    {
        text: "Nhạc mới",
        icon: <BsMusicNoteBeamed size={24} />,
    },
    {
        text: "Thể loại",
        icon: <BiCategoryAlt size={24} />,
    },
    {
        text: "Top 100",
        icon: <AiOutlineStar size={24} />,
    },
    {
        text: "Mv",
        icon: <TiDivideOutline size={24} />,
    },
];
