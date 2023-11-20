import { CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";

type ChartProps = {
    xData: string[];
    data: number[];
    isLoading: boolean;
};

export function Chart({ xData, data, isLoading }: ChartProps) {
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <LineChart
            xAxis={[
                {
                    data: xData.map((_, i) => i),
                    valueFormatter: (v) => xData[v],
                },
            ]}
            series={[
                {
                    data,
                },
            ]}
            height={450}
        />
    );
}
