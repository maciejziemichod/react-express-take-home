import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SavedStatItem } from "../common/types";

const sidebarWidth = 240;

type SidebarProps = {
    items: SavedStatItem[];
    onSavedStatsClick: (key: string) => void;
};

export function Sidebar({ items, onSavedStatsClick }: SidebarProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    function handleSidebarToggle() {
        setIsMobileOpen(!isMobileOpen);
    }

    const sidebarContent = (
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
                sx={{ width: { sm: sidebarWidth }, flexShrink: { sm: 0 } }}
                aria-label="Saved stats"
            >
                <Drawer
                    variant="temporary"
                    open={isMobileOpen}
                    onClose={handleSidebarToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: sidebarWidth,
                        },
                    }}
                >
                    {sidebarContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: sidebarWidth,
                        },
                    }}
                    open
                >
                    {sidebarContent}
                </Drawer>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: { sm: "none" },
                    width: { sm: `calc(100% - ${sidebarWidth}px)` },
                }}
            >
                <Button aria-label="Open sidebar" onClick={handleSidebarToggle}>
                    Show saved stats
                </Button>
            </Box>
        </Box>
    );
}
