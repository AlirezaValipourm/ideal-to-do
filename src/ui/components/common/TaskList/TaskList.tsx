import { Task } from '@idealToDo/data/types/Task.type'
import React, { FC } from 'react'
import { TaskListEmpty, TaskListError, TaskListPending, TaskListWrapper } from './TaskList.styled'
import { TaskCard } from '../TaskCard/TaskCard'
import { useUpdateTask } from '@idealToDo/data/repository/api/updateTask/updateTask.api'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

interface ITaskListProps {
    isPending: boolean,
    isError: boolean,
    tasks: Task[]
    onTaskClick: (task: Task) => void
}

export const TaskList: FC<ITaskListProps> = ({ tasks, isError, isPending, onTaskClick }) => {
    const updateTask = useUpdateTask()
    const queryClient = useQueryClient();
    const onTaskUpdate = (taskId: string, isCompleted: boolean) => {
        updateTask.mutate(
            {
                id: taskId,
                isCompleted: isCompleted
            },
            {
                onSuccess() {
                    toast.success(`Task status updated`)
                    queryClient.invalidateQueries({ queryKey: ["task", "allTasks"] });
                },
                onError(error) {
                    console.log("error", error)
                },
            })
    }

    return (
        <TaskListWrapper>
            {isError ?
                <TaskListError /> :
                isPending ? <TaskListPending /> :
                    tasks.length > 0 ? tasks.map(task =>
                        <TaskCard key={task._id} task={task} onCheckboxChange={onTaskUpdate} onClick={() => onTaskClick(task)} />
                    ) : <TaskListEmpty />
            }
        </TaskListWrapper>
    )
}
