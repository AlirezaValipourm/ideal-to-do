import { api } from "@idealToDo/config/interceptors";
import { APIResponse } from "@idealToDo/data/types/APIResponse.type";
import { Task } from "@idealToDo/data/types/Task.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const updateTaskPut = async ({ isCompleted, id }: { isCompleted: boolean, id: string }): Promise<AxiosResponse> => {
    try {
        const response = await api.put(`/update/${id}`, { is_completed: isCompleted });
        return response;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
};

export const useUpdateTask = () => {
    return useMutation<AxiosResponse<APIResponse<Task>, Error>, Error, { isCompleted: boolean, id: string }>({
        mutationKey: ["task", "update"],
        mutationFn: updateTaskPut,
    });
};