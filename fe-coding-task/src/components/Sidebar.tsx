import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SavedStatItem } from "../common/types";

const drawerWidth = 240;

type SidebarProps = {
    items: SavedStatItem[];
    onSavedStatsClick: (key: string) => void;
};

export function Sidebar({ items, onSavedStatsClick }: SidebarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <List>
                {items.length > 0 ? (
                    items.map(({ key, name }) => (
                        <ListItem key={key} disablePadding>
                            <ListItemButton
                                onClick={() => onSavedStatsClick(key)}
                            >
                                <ListItemText primary={name} />
                            </ListItemButton>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText>
                            Add a comment to any displayed stats and it'll be
                            automatically saved here for you
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Saves stats"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: { sm: "none" },
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Button aria-label="Open sidebar" onClick={handleDrawerToggle}>
                    Show saved stats
                </Button>
            </Box>
        </Box>
    );
}
