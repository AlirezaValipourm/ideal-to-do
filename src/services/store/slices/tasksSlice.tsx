
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Task } from "@idealToDo/data/types/Task.type";

interface TaskState {
    tasks: Task[]
}

const initialState: TaskState = {
    tasks: []
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state: TaskState, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload
        },

    },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = (store: RootState): Task[] =>
    store.tasks.tasks;