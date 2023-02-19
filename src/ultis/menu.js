import icons from "./icon";

const { MdOutlineLibraryMusic, TbChartArcs, MdOutlineMultilineChart, MdFeed } =
    icons;

export const sidebarMenu = [
    {
        path: "mymusic",
        text: "Cá Nhân",
        icon: <MdOutlineLibraryMusic size={24} />,
    },
    {
        path: "",
        text: "Khám Phá ",
        end: true,
        icon: <TbChartArcs size={24} />,
    },
    {
        path: "zing-chart",
        text: "#zingchart",
        icon: <MdOutlineMultilineChart size={24} />,
    },
    {
        path: "follow",
        text: "Theo Dõi ",
        icon: <MdFeed size={24} />,
    },
];
