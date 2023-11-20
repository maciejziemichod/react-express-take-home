import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import { FormFields, FormFieldsData, SavedStatItem } from "./common/types";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getFormFieldsData } from "./utils/api";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const sidebarWidth = 240;

const quarters = [
    "2009K1",
    "2009K2",
    "2009K3",
    "2009K4",
    "2010K1",
    "2010K2",
    "2010K3",
    "2010K4",
    "2011K1",
    "2011K2",
    "2011K3",
    "2011K4",
    "2012K1",
    "2012K2",
    "2012K3",
    "2012K4",
    "2013K1",
    "2013K2",
    "2013K3",
    "2013K4",
    "2014K1",
    "2014K2",
    "2014K3",
    "2014K4",
    "2015K1",
    "2015K2",
    "2015K3",
    "2015K4",
    "2016K1",
    "2016K2",
    "2016K3",
    "2016K4",
    "2017K1",
    "2017K2",
    "2017K3",
    "2017K4",
    "2018K1",
    "2018K2",
    "2018K3",
    "2018K4",
    "2019K1",
    "2019K2",
    "2019K3",
    "2019K4",
    "2020K1",
    "2020K2",
    "2020K3",
    "2020K4",
    "2021K1",
    "2021K2",
    "2021K3",
    "2021K4",
    "2022K1",
    "2022K2",
    "2022K3",
    "2022K4",
    "2023K1",
    "2023K2",
    "2023K3",
];

const data = [
    24751, 25956, 27133, 26711, 28007, 28481, 29157, 28890, 30524, 31279, 32262,
    31743, 33388, 34240, 35045, 34337, 36066, 36292, 36421, 34335, 35281, 36638,
    37760, 36397, 39516, 40514, 41148, 39652, 41302, 43894, 45713, 45333, 47717,
    47397, 46492, 44831, 45673, 47672, 47874, 46111, 47535, 49559, 49878, 48462,
    49380, 50876, 52834, 52337, 55981, 56478, 56849, 54558, 59658, 60166, 60220,
    56159, 58785, 61253, 60575,
];

export default function App() {
    const items: SavedStatItem[] = [
        { key: "aaa", name: "Aaa" },
        { key: "baa", name: "Baa" },
    ];

    const [isLoading, setIsLoading] = useState(true);
    const [formFieldsData, setFormFieldsData] = useState<FormFieldsData | null>(
        null,
    );

    useEffect(() => {
        getFormFieldsData()
            .then((data) => {
                setFormFieldsData(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // TODO: secure from race conditions
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    function handleSavedStatsClick(key: string) {
        console.log(key);
    }

    function handleFormSubmit(data: FormFields) {
        console.log(data);
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
                    />
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Chart data={data} xData={quarters} isLoading={false} />
                    </Box>
                    <Comment />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
