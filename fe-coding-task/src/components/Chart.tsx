import { Alert, Box, CircularProgress } from "@mui/material";
import { LineChart } from "@mui/x-charts";

type ChartProps = {
    xData: string[];
    data: number[];
    isLoading: boolean;
};

export function Chart({ xData, data, isLoading }: ChartProps) {
    const height = 450;

    if (data.length === 0) {
        return <Alert severity="info">Use form to display data</Alert>;
    }

    if (isLoading || xData.length !== data.length) {
        return (
            <Box height={height} display="flex" alignItems="center">
                <CircularProgress />;
            </Box>
        );
    }

    return (
        <LineChart
            xAxis={[
                {
                    data: xData.map((_, i) => i),
                    valueFormatter: (v) => {
                        const value = xData[v];

                        return value ? value : "";
                    },
                },
            ]}
            series={[
                {
                    data,
                },
            ]}
            height={height}
        />
    );
}
