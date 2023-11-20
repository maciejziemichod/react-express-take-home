import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import { FormFields, SavedStatItem } from "./common/types";
import { createTheme, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

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
                    <Form onFormSubmit={handleFormSubmit} />
                    <Chart />
                    <Comment />
                </Box>
            </Box>
        </ThemeProvider>
    );
}
