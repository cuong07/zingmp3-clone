import React, { memo, useState, useEffect } from "react";
import bgChart from "../../assets/bg-chart.jpg";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import SongItem from "../SongItem/SongItem";

const ChartSection = () => {
    const [data, setData] = useState(null);
    const { chart, rank } = useSelector((state) => state.home);

    const options = {
        responsive: true,
        pointRadius: 0,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: { display: false },
                grid: { color: "rgba(255,255,255,0.1)", drawTicks: false },
                min: chart?.minScore,
                max: chart?.maxScore,
                border: { dash: [3, 4] },
            },
            x: {
                ticks: { color: "white" },
                grid: { color: "transparent" },
            },
        },
        plugins: {
            legend: false,
        },
        hover: {
            mode: "dataset",
            intersect: false,
        },
    };
    const rank_new = rank?.slice(0, 3);
    useEffect(() => {
        const labels = chart?.times
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => `${item.hour}:00`);
        const datasets = [];
        if (chart?.items) {
            for (let i = 0; i < 3; i++) {
                datasets.push({
                    data: chart?.items[Object.keys(chart?.items)[i]]
                        ?.filter((item) => +item.hour % 2 === 0)
                        ?.map((item) => item.counter),
                    borderColor:
                        i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    tension: 0.2,
                    borderWidth: 2,
                    pointBackgroundColor: "white",
                    pointHoverRadius: 4,
                    pointBorderColor:
                        i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
                    pointHoverBorderWidth: 4,
                });
            }
            setData({ labels, datasets });
        }
    }, [chart]);
    let styleImage = "w-[60px] h-[60px]";
    return (
        <div className="1200:px-[59px] mt-12 relative max-h-[430px] rounded-md overflow-hidden max-1200:hidden">
            <img
                src={bgChart}
                alt="bg-chart"
                className="w-full object-cover rounded-md max-h-[430px]"
            />
            <div className="absolute top-0 z-10 left-[59px] bg-[rgba(77,34,104,0.9)] right-[59px] bottom-0 rounded-md"></div>
            <div className="absolute top-0 z-20 left-[59px] right-[59px] bottom-0 p-5 flex flex-col gap-8 rounded-md">
                <h3 className="text-2xl text-white font-bold">#zingchart</h3>
                <div className="flex gap-4 h-full">
                    <div className="w-[30%] h-full flex flex-col gap-4">
                        {rank_new?.map((item) => (
                            <SongItem
                                key={item.encodeId}
                                id={item.encodeId}
                                image={item.thumbnail}
                                title={item.title}
                                artist={item.artistsNames}
                                styleImage={styleImage}
                            />
                        ))}
                    </div>
                    <div className="w-[70%] h-[90%]">
                        {data && <Line data={data} options={options} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(ChartSection);
