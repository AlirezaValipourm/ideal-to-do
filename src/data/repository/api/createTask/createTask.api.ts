import { api } from "@idealToDo/config/interceptors";
import { APIResponse } from "@idealToDo/data/types/APIResponse.type";
import { Task, TaskFormData } from "@idealToDo/data/types/Task.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const createTaskPost = async (data: TaskFormData): Promise<AxiosResponse> => {
    try {
        const response = await api.post('/create', data);
        return response;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
};

export const useCreateTask = () => {
    return useMutation<AxiosResponse<APIResponse<Task>, Error>, Error, TaskFormData>({
        mutationKey: ["task", "create"],
        mutationFn: createTaskPost,
    });
};