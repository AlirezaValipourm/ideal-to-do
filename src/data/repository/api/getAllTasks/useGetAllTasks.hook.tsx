import { useDispatch } from "react-redux";
import { useGetAllTasks } from "./getAllTask.api";
import { setTasks } from "@idealToDo/services/store/slices/tasksSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useGetAllTask = () => {
    const dispatch = useDispatch();
    const { isPending, data: TaskData, status, isError, isRefetching } = useGetAllTasks();

    useEffect(() => {
        if (status == "success") {
            // handle success
            if (TaskData && TaskData.data.data) {
                dispatch(setTasks(TaskData.data.data))
            } else {
                // in this case, valid data must be available but we handle the case when it is not
                toast.error("Uknown Error Occurred")
            }
        } else if (status == "error") {
            toast.error(TaskData?.data.message)
        }
    }, [isPending, TaskData?.data.data?.length, isRefetching, dispatch, status, TaskData])

    return {
        isPending,
        isError,
    }

}