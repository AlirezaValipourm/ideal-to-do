import { Box, styled } from "@mui/material";
import { FC } from "react";

export const TaskListWrapper = styled(Box)({
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    height: "calc(100% - 85px)",
    overflow: "auto",
    gap: "10px"
})

export const TaskListError: FC = () => {
    return <Box>Could not load tasks</Box>
}

export const TaskListPending: FC = () => {
    return <Box>Loading tasks</Box>
}

export const TaskListEmpty: FC = () => {
    return <Box>No tasks to show</Box>
}
