import { Alert, CircularProgress } from "@mui/material";
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

    if (data.length === 0) {
        return <Alert severity="info">Use form to display some data</Alert>;
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
