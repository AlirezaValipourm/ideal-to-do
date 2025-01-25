import { ButtonBase, Checkbox, styled } from "@mui/material";
import { FC } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface ITaskCheckBoxProps {
    checked: boolean,
    onCheckboxChange: (checked: boolean) => void
}

export const TaskCardContainer = styled(ButtonBase)(({ theme }) => ({
    padding: theme.spacing(2),
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    borderRadius: "15px",
    overflow: "hidden",
    gap: "8px",
    "& .completed": {
        textDecoration: "line-through",
        color: theme.palette.text.secondary,
    },
}));


export const TaskCheckBox: FC<ITaskCheckBoxProps> = ({ checked, onCheckboxChange }) => {


    return <Checkbox
        checked={checked}
        icon={<RadioButtonUncheckedIcon sx={{ fontSize: 24 }} />}
        checkedIcon={<CheckCircleIcon sx={{ fontSize: 24 }} />}
        sx={{
            color: "primary.main",
            "&.Mui-checked": {
                color: "primary.main",
            },
        }}
        onChange={(e) => onCheckboxChange(e.target.checked)}
    />
}  
