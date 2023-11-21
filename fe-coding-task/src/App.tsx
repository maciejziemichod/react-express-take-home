import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import { FormFields, FormFieldsData, SavedStatItem } from "./common/types";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getFormFieldsData, queryData } from "./utils/api";
import { getParams, updateParams } from "./utils/url";
import { getQuartersRange } from "./utils/quarters";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const sidebarWidth = 240;

export default function App() {
    const items: SavedStatItem[] = [
        { key: "aaa", name: "Aaa" },
        { key: "baa", name: "Baa" },
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [formFieldsData, setFormFieldsData] = useState<FormFieldsData | null>(
        null,
    );
    const [formFieldsValues, setFormFieldsValues] = useState<
        FormFields | undefined
    >(undefined);
    const [priceData, setPriceData] = useState<number[]>([]);
    const [quartersData, setQuartersData] = useState<string[]>([]);

    useEffect(() => {
        getFormFieldsData()
            .then((data) => {
                setFormFieldsData(data);

                const { startQuarter, endQuarter, houseType } = getParams();

                setFormFieldsValues({
                    startQuarter: startQuarter ? startQuarter : "",
                    endQuarter: endQuarter ? endQuarter : "",
                    houseType: houseType ? houseType : "",
                });

                if (!startQuarter && !endQuarter && !houseType) {
                    return;
                }

                const selectedQuarters = getQuartersRange(
                    startQuarter,
                    endQuarter,
                    data.quarters,
                );

                updateData(selectedQuarters, houseType ? houseType : "");
            })
            .catch(console.error)
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // TODO: secure from race conditions
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    function handleSavedStatsClick(key: string) {
        console.log(key);
    }

    // TODO: secure from race conditions
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    function handleFormSubmit({
        startQuarter,
        endQuarter,
        houseType,
    }: FormFields): void {
        updateParams({
            startQuarter: startQuarter,
            endQuarter: endQuarter,
            houseType: houseType,
        });

        if (formFieldsData === null) {
            return;
        }

        const selectedQuarters = getQuartersRange(
            startQuarter,
            endQuarter,
            formFieldsData.quarters,
        );

        updateData(selectedQuarters, houseType);
    }

    function updateData(quarters: string[], houseType: string): void {
        setQuartersData(quarters);

        queryData(houseType, quarters).then(setPriceData).catch(console.error);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box component="main" sx={{ display: { xs: "block", sm: "flex" } }}>
                <Sidebar
                    sidebarWidth={sidebarWidth}
                    items={items}
                    onSavedStatsClick={handleSavedStatsClick}
                />
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${sidebarWidth}px)` },
                    }}
                >
                    <Form
                        onFormSubmit={handleFormSubmit}
                        formFieldsData={formFieldsData}
                        isLoading={isLoading}
                        values={formFieldsValues}
                    />
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Chart
                            data={priceData}
                            xData={quartersData}
                            isLoading={false}
                        />
                    </Box>
                    <Comment />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
