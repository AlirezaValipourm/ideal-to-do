import { api } from "@idealToDo/config/interceptors";
import { APIResponse } from "@idealToDo/data/types/APIResponse.type";
import { Task } from "@idealToDo/data/types/Task.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

export const getAllTasksFetch = async (): Promise<AxiosResponse<APIResponse<Task[]>, Error>> => {
    try {
        const response = await api.get('/fetch/all');
        return response;
    } catch (error) {
        console.log("error", error)
        throw error;
    }
};

export const useGetAllTasks = () => {
    return useQuery<AxiosResponse<APIResponse<Task[]>, Error>>({
        queryKey: ["task", "allTasks"],
        queryFn: getAllTasksFetch,
    });
};