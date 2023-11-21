import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import { CommentedStatsMap, FormFields, FormFieldsData } from "./common/types";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getFormFieldsData, queryData } from "./utils/api";
import { getParams, getRawParams, updateParams } from "./utils/url";
import { getQuartersRange } from "./utils/quarters";
import {
    getCommentedStats,
    removeCommentedStat,
    saveCommentedStats,
} from "./utils/localStorage";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const sidebarWidth = 240;

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [formFieldsData, setFormFieldsData] = useState<FormFieldsData | null>(
        null,
    );
    const [formFieldsValues, setFormFieldsValues] = useState<
        FormFields | undefined
    >(undefined);
    const [priceData, setPriceData] = useState<number[]>([]);
    const [quartersData, setQuartersData] = useState<string[]>([]);
    const [comment, setComment] = useState("");
    const [savedStats, setSavedStats] = useState<CommentedStatsMap>({});

    useEffect(() => {
        const localSavedStats = getCommentedStats();
        const rawParams = getRawParams();

        setSavedStats(localSavedStats);

        if (rawParams in localSavedStats) {
            setComment(localSavedStats[rawParams].comment);
        }

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

        if (!(getRawParams() in savedStats)) {
            setComment("");
        }

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
        queryData(houseType, quarters)
            .then((data) => {
                setQuartersData(quarters);
                setPriceData(data);
            })
            .catch(console.error);
    }

    function handleCommentChange(
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ): void {
        const value = event.target.value;

        setComment(value);

        const params = getRawParams();

        if (params === "") {
            return;
        }

        if (value === "") {
            const newSavedStats = removeCommentedStat(params);
            setSavedStats(newSavedStats);
            return;
        }

        const { houseType } = getParams();

        const newSavedStats = saveCommentedStats(
            params,
            comment,
            priceData,
            quartersData,
            houseType ? houseType : "",
        );

        setSavedStats(newSavedStats);
    }

    function handleSavedStatsClick(key: string) {
        if (!(key in savedStats)) {
            removeCommentedStat(key);
            return;
        }

        const { comment, data, quarters, houseType } = savedStats[key];
        const newFormData = {
            startQuarter: quarters[0],
            endQuarter: quarters[quarters.length - 1],
            houseType: houseType,
        };

        setFormFieldsValues(newFormData);
        updateParams(newFormData);
        setComment(comment);
        setPriceData(data);
        setQuartersData(quarters);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box component="main" sx={{ display: { xs: "block", sm: "flex" } }}>
                <Sidebar
                    sidebarWidth={sidebarWidth}
                    map={savedStats}
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
                    <Comment
                        show={priceData.length > 0}
                        value={comment}
                        onCommentChange={handleCommentChange}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
