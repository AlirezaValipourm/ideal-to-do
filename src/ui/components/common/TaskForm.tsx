import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useFormik } from "formik"
import { Task, TaskFormData } from '@idealToDo/data/types/Task.type'
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material'
import { useCreateTask } from '@idealToDo/data/repository/api/createTask/createTask.api'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateTask } from '@idealToDo/data/repository/api/updateTask/updateTask.api'
import { useDeleteTask } from '@idealToDo/data/repository/api/deleteTask/deleteTask.api'
import { DateTimePicker } from './DateTimePicker'
import * as Yup from "yup"

interface ITaskFormProps {
    initialValue?: Task,
    onModalClose: VoidFunction
}

const EMPTY_INITIAL_VALUE: TaskFormData = {
    description: "",
    end_date: new Date(),
    start_date: new Date(),
    title: "",
    is_completed: false
}

const validationSchema = Yup.object({
    title: Yup.string()
        .required("Task title is required")
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title must be less than 50 characters"),

    start_date: Yup.date()
        .required("Start date is required"),

    end_date: Yup.date()
        .min(Yup.ref('start_date'), "End date must be after start date"),

    description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters")
        .max(100, "Description must be less than 500 characters"),
});

export const TaskForm: FC<ITaskFormProps> = ({ initialValue, onModalClose }) => {
    const queryClient = useQueryClient();
    const [initialValues, setInitialValues] = useState<TaskFormData>(EMPTY_INITIAL_VALUE)
    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask()
    useEffect(() => {
        setInitialValues({
            description: initialValue?.description ?? "",
            end_date: initialValue?.end_date ?? new Date(),
            start_date: initialValue?.start_date ?? new Date(),
            title: initialValue?.title ?? "",
            is_completed: initialValue?.is_completed ?? false
        })
    }, [initialValue])

    const formik = useFormik<TaskFormData>({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (values) => {
            onCreateTask(values)
        },
    })

    const onCreateTask = (taskData: TaskFormData) => {
        createTask.mutate(taskData, {
            onSuccess(data) {
                toast.success(data.data.message);
                onModalClose()
                queryClient.invalidateQueries({ queryKey: ["task", "allTasks"] });
            },
            onError(error) {
                console.log("error", error)
            },
        })
    }

    const onUpdateTask = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
        const taskId = initialValue?._id;
        if (taskId) {
            updateTask.mutate({
                id: taskId,
                isCompleted: checked
            }, {
                onSuccess() {
                    toast.success(`Task status updated`)
                    queryClient.invalidateQueries({ queryKey: ["task", "allTasks"] });
                    setInitialValues({
                        ...initialValue,
                        is_completed: checked
                    })
                },
                onError(error) {
                    console.log("error", error)
                },
            })
        } else {
            toast.error("Invalid task to update")
        }
    }

    const onDeleteTask = () => {
        const taskId = initialValue?._id;
        if (taskId) {
            deleteTask.mutate({ id: taskId }, {
                onSuccess() {
                    toast.success(`Task deleted successfully`)
                    queryClient.invalidateQueries({ queryKey: ["task", "allTasks"] });
                },
                onError(error) {
                    console.log("error", error)
                },
                onSettled() {
                    onModalClose()
                },
            })
        } else {
            toast.error("Invalid task to delete")
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                <TextField
                    fullWidth
                    name="title"
                    label="Title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    disabled={Boolean(initialValue)}
                    error={Boolean(formik.errors.title)}
                    helperText={formik.errors.title}
                />
                <TextField
                    fullWidth
                    name="description"
                    label="Description"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    disabled={Boolean(initialValue)}
                    error={Boolean(formik.errors.description)}
                    helperText={formik.errors.description}
                />
                <DateTimePicker
                    name='start_date'
                    label="Start date"
                    value={new Date(formik.values.start_date)}
                    onChange={date => formik.setFieldValue("start_date", date)}
                    disabled={Boolean(initialValue)}
                    error={Boolean(formik.errors.start_date)}
                    helperText={formik.errors.start_date ? `${formik.errors.start_date}` : undefined}
                />
                <DateTimePicker
                    name='end_date'
                    label="End date"
                    value={new Date(formik.values.end_date)}
                    onChange={date => formik.setFieldValue("end_date", date)}
                    disabled={Boolean(initialValue)}
                    error={Boolean(formik.errors.end_date)}
                    helperText={formik.errors.end_date ? `${formik.errors.end_date}` : undefined}

                />

                {initialValue && <FormControlLabel
                    style={{ alignSelf: "start" }}
                    labelPlacement="start"
                    control={<Checkbox checked={formik.values.is_completed} onChange={onUpdateTask} />}
                    label="Status"
                />}

                {initialValue ? <Box style={{ display: "flex", gap: "20px", width: "100%" }}>
                    <Button fullWidth variant='contained' onClick={() => onModalClose()}>Close</Button>
                    <Button fullWidth variant='contained' onClick={() => onDeleteTask()}>Delete</Button>
                </Box>
                    :
                    <Button fullWidth variant='contained' onClick={() => formik.handleSubmit()}>Create</Button>
                }
            </Box>
        </form>
    )
}
