import icons from "./icon";

const { MdOutlineLibraryMusic, TbChartArcs, MdOutlineMultilineChart, MdFeed } =
    icons;

export const sidebarMenu = [
    {
        path: "mymusic",
        text: "Cá Nhân",
        icon: <MdOutlineLibraryMusic size={20} />,
    },
    {
        path: "",
        text: "Khám Phá ",
        end: true,
        icon: <TbChartArcs size={20} />,
    },
    {
        path: "zing-chart",
        text: "#zingchart",
        icon: <MdOutlineMultilineChart size={20} />,
    },
    {
        path: "follow",
        text: "Theo Dõi ",
        icon: <MdFeed size={20} />,
    },
];
