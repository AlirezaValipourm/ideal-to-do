import { api } from "@idealToDo/config/interceptors";
import { APIResponse } from "@idealToDo/data/types/APIResponse.type";
import { Task } from "@idealToDo/data/types/Task.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getTaskByIdFetch = async (id: string): Promise<AxiosResponse<APIResponse<Task>, Error>> => {
    try {
        const response = await api.get(`/get/${id}`, {
        });
        return response;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
};

export const useGetTaskById = (id: string) => {
    return useQuery<AxiosResponse<APIResponse<Task>, Error>>({
        queryKey: ["task", id],
        queryFn: () => getTaskByIdFetch(id),
    });
};