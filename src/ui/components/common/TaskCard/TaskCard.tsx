import { Box, Checkbox, Divider, Typography } from "@mui/material";
import React, { FC, MouseEvent } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { Task } from "@idealToDo/data/types/Task.type";
import { TaskCardContainer } from "./TaskCard.styled";
import { addDays, format, isAfter, startOfDay } from "date-fns";

interface ITaskCard {
  task: Task,
  onClick: () => void,
  onCheckboxChange: (taskId: string, isCompleted: boolean) => void,
}

export const TaskCard: FC<ITaskCard> = ({
  task,
  onClick,
  onCheckboxChange,
}) => {

  const dateFormatter = (date: Date) => {
    return format(date, "hh:mm a")
  }

  const getTaskDate = (startDate: Date) => {
    if (isAfter(startDate, addDays(startOfDay(new Date()), 1)))
      return "Tomorrow"
    else if (isAfter(startDate, startOfDay(new Date())))
      return "Today"
    else return format(startDate, "EEEE")
  }

  const onTaskCardContainerClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Ensure no further bubbling
    onClick();
  };

  return (
    <TaskCardContainer onClick={onTaskCardContainerClick}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Box style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Typography
            variant="body1"
            component="div"
            className={task.is_completed ? "completed" : ""}
          >
            {task.title}
          </Typography>
          <Typography
            variant="caption"
            color="hsla(0, 0%, 62%, 1)"
          >
            {task.description}
          </Typography>
        </Box>
        <Checkbox
          checked={task.is_completed}
          icon={<RadioButtonUncheckedIcon style={{ fontSize: 22 }} />}
          checkedIcon={<CheckCircleIcon style={{ fontSize: 22 }} />}
          style={{
            color: "hsla(218, 97%, 51%, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            onCheckboxChange(task._id, e.target.checked)
          }}
        />
      </Box>
      <Divider style={{ width: "100%" }} />
      <Box sx={{ display: "flex", gap: 1, mt: "4px" }}>
        <Typography
          variant="caption"
          color="hsla(0, 0%, 62%, 1)"
        >
          {getTaskDate(task.start_date)}
        </Typography>
        <Typography
          variant="caption"
          color="hsla(0, 0%, 75%, 1)"
        >
          {`${dateFormatter(task.start_date)} - ${dateFormatter(task.end_date)}`}
        </Typography>
      </Box>
    </TaskCardContainer>
  );
};
