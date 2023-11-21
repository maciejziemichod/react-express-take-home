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

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const sidebarWidth = 240;

const dPricedata = [
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
    const [formFieldsValues, setFormFieldsValues] = useState<
        FormFields | undefined
    >(undefined);
    const [priceData, setPriceData] = useState<number[]>([]);

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
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    let quarters: string[] =
        formFieldsData === null
            ? []
            : formFieldsData.quarters.map(({ name }) => name);

    // TODO: secure from race conditions
    // https://react.dev/reference/react/useEffect#fetching-data-with-effects
    function handleSavedStatsClick(key: string) {
        console.log(key);
    }

    function handleFormSubmit({
        startQuarter,
        endQuarter,
        houseType,
    }: FormFields) {
        updateParams({
            startQuarter: startQuarter,
            endQuarter: endQuarter,
            houseType: houseType,
        });

        queryData(houseType, ["2009K1", "2009K2"])
            .then(setPriceData)
            .catch(console.error);
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
                            xData={quarters}
                            isLoading={false}
                        />
                    </Box>
                    <Comment />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
