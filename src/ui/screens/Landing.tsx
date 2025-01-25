import { Tab, Tabs } from '@mui/material'
import React, { SyntheticEvent, useState } from 'react'
import { TodoWrapper } from '../components/common/MainWrapper';
import { TabPanel } from '../components/common/TabPanel';
import { a11yProps } from '@idealToDo/utils/a11yProps';
import { addDays, endOfDay, isAfter, isBefore, startOfDay } from "date-fns"
import { TodoHeader } from '../components/common/TodoHeader';
import { useGetAllTask } from '@idealToDo/data/repository/api/getAllTasks/useGetAllTasks.hook';
import { useSelector } from 'react-redux';
import { selectTasks } from '@idealToDo/services/store/slices/tasksSlice';
import { TaskList } from '../components/common/TaskList/TaskList';
import { Task } from '@idealToDo/data/types/Task.type';
import { TaskListWrapper } from '../components/common/TaskList/TaskList.styled';
import { Modal } from '../components/common/Modal';
import { TaskForm } from '../components/common/TaskForm';
import { StatisticBox } from '../components/common/StatisticBox/StatisticBox';
import { Category } from '@idealToDo/data/types/Category.type';

export const LandingScreen = () => {
    const today = new Date()
    const tomorrow = addDays(today, 1)
    const [tabValue, setTabValue] = useState<number>(0)
    const [formInitialValue, setFormInitialValue] = useState<Task>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [activeCategory, setActiveCategory] = useState<Category>("All")
    const { isError, isPending } = useGetAllTask()
    const tasks = useSelector(selectTasks)

    const onModalClose = () => {
        setFormInitialValue(undefined)
        setIsModalOpen(false)
    }

    const onModalOpen = () => {
        setIsModalOpen(true)
    }

    const onTabChange = (_: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const onCategorySelect = (category: Category) => {
        setActiveCategory(category)
    }

    const onNewTaskClick = () => {
        onModalOpen()
    }

    const getTasksByDate = (tasks: Task[], date: Date) => {
        return tasks.filter(task =>
            isAfter(task.start_date, startOfDay(date)) && isBefore(task.start_date, endOfDay(date)))
    }

    const getTaskByFilter = (tasks: Task[], date: Date) => {
        const tasksBasedOnDate = getTasksByDate(tasks, date)
        if (activeCategory == "All") return tasksBasedOnDate
        const tasksBasedOnCategory = tasksBasedOnDate.filter(task => {
            if (activeCategory == "Archived") return task.is_completed && isBefore(task.end_date, date)
            if (activeCategory == "Open") return !task.is_completed
            if (activeCategory == "Closed") return task.is_completed
        })
        return tasksBasedOnCategory
    }

    const onTaskClick = (task: Task) => {
        setFormInitialValue(task)
        onModalOpen()
    }

    const getStatisticsByDate = (date: Date) => {
        const dateTasks = getTasksByDate(tasks, date);
        const openTasks = dateTasks.filter(task => !task.is_completed).length // tasks which are not completed
        const closedTasks = dateTasks.filter(task => task.is_completed).length // completed tasks
        const archivedTasks = dateTasks.filter(task => task.is_completed && isBefore(task.end_date, date)).length // completed tasks with passed end date
        return {
            all: dateTasks.length,
            open: openTasks,
            closed: closedTasks,
            archived: archivedTasks
        }
    }

    return (
        <TodoWrapper>
            <Tabs style={{ width: "100%", }} value={tabValue} onChange={onTabChange}>
                <Tab label="Today’s Task"  {...a11yProps(0)} value={0} />
                <Tab label="Tomorrow’s Task" {...a11yProps(1)} value={1} wrapped={false} />
            </Tabs>
            <TabPanel ariaLabel='Today’s Task' index={0} value={tabValue} >
                <TodoHeader date={today} title='New Task' onNewTaskClick={onNewTaskClick} />
                <StatisticBox onCategorySelect={onCategorySelect} categoryData={getStatisticsByDate(today)} activeCategory={activeCategory} />
                <TaskListWrapper>
                    <TaskList tasks={getTaskByFilter(tasks, today)} isError={isError} isPending={isPending} onTaskClick={onTaskClick} />
                </TaskListWrapper>
            </TabPanel>
            <TabPanel ariaLabel='Tomorrow’s Task' index={1} value={tabValue}>
                <TodoHeader date={tomorrow} title='Tomorrow’s Task' onNewTaskClick={onNewTaskClick} />
                <StatisticBox onCategorySelect={onCategorySelect} categoryData={getStatisticsByDate(tomorrow)} activeCategory={activeCategory} />
                <TaskListWrapper>
                    <TaskList tasks={getTaskByFilter(tasks, tomorrow)} isError={isError} isPending={isPending} onTaskClick={onTaskClick} />
                </TaskListWrapper>
            </TabPanel>
            <Modal open={isModalOpen} onClose={onModalClose}>
                <TaskForm onModalClose={onModalClose} initialValue={formInitialValue} />
            </Modal>
        </TodoWrapper>
    )
}
