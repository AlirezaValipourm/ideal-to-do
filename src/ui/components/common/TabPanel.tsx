import Box from "@mui/material/Box";
import { FC } from "react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    ariaLabel: string
}

export const TabPanel: FC<TabPanelProps> = ({ ariaLabel, index, value, children }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${ariaLabel}-${index}`}
            aria-labelledby={`${ariaLabel}-${index}`}
            style={{ height: "calc(100% - 70px)" }}
        >
            {value === index && <Box sx={{ p: "30px", height: "100%" }}>{children}</Box>}
        </div>
    );
}