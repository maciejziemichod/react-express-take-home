import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { SavedStatItem } from "../common/types";
import { Typography } from "@mui/material";

type SidebarProps = {
    sidebarWidth: number;
    items: SavedStatItem[];
    onSavedStatsClick: (key: string) => void;
};

export function Sidebar({
    sidebarWidth,
    items,
    onSavedStatsClick,
}: SidebarProps) {
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
                        <ListItemText color="grey">
                            <Typography color="darkgray" fontSize={14}>
                                Add a comment to any displayed stats and it'll
                                be automatically saved here for you
                            </Typography>
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        </div>
    );

    return (
        <Box sx={{ width: { sm: sidebarWidth } }}>
            <Box component="nav" aria-label="Saved stats">
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
                    p: 3,
                    display: { sm: "none" },
                }}
            >
                <Button
                    variant="outlined"
                    aria-label="Open sidebar"
                    onClick={handleSidebarToggle}
                >
                    Show saved stats
                </Button>
            </Box>
        </Box>
    );
}
