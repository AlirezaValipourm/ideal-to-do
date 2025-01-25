export interface Task {
    _id: string,
    title: string,
    description: string,
    start_date: Date,
    end_date: Date,
    is_completed: boolean,
    updatedAt: Date,
    createdAt: Date
}

export type TaskFormData = {
    title: string,
    description: string,
    start_date: Date,
    end_date: Date,
    is_completed: boolean
}