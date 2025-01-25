import { api } from "@idealToDo/config/interceptors";
import { APIResponse } from "@idealToDo/data/types/APIResponse.type";
import { Task } from "@idealToDo/data/types/Task.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const deleteTaskPut = async ({ id }: { id: string }): Promise<AxiosResponse> => {
    try {
        const response = await api.delete(`/delete/${id}`);
        return response;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
};

export const useDeleteTask = () => {
    return useMutation<AxiosResponse<APIResponse<Task>, Error>, Error, { id: string }>({
        mutationKey: ["task", "delete"],
        mutationFn: deleteTaskPut,
    });
};