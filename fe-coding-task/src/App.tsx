import { Chart } from "./components/Chart";
import { Form } from "./components/Form";
import { Sidebar } from "./components/Sidebar";
import { Comment } from "./components/Comment";
import CssBaseline from "@mui/material/CssBaseline";
import { SavedStatItem } from "./common/types";
import { createTheme, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export default function App() {
    const items: SavedStatItem[] = [
        { key: "aaa", name: "Aaa" },
        { key: "baa", name: "Baa" },
    ];

    function handleSavedStatsClick(key: string) {
        console.log(key);
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <main>
                <Sidebar
                    items={items}
                    onSavedStatsClick={handleSavedStatsClick}
                />
                <Form />
                <Chart />
                <Comment />
            </main>
        </ThemeProvider>
    );
}
