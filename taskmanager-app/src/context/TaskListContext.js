import React, {createContext, useState, useEffect} from 'react';
import { uuid } from 'uuidv4';

export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    const initialState = JSON.parse(localStorage.getItem('tasks')) || [];

    const [tasks, setTasks] = useState([]);

    useEffect(()=> {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const [editItem, setEditItem] = useState(initialState);

    const addTask = title => {
        setTasks([...tasks, { title, id: uuid() }]);
    };

    const removeTask = id => {
        setTasks(tasks.filter(task => task.id !== id))
    };

    const clearList = () => {
        setTasks([])
    };

    const findItem = id => {
        const item = tasks.find(task => task.id === id);

        setEditItem(item);
    };

    const editTask = (title, id) => {
        const newTasks = tasks.map(task => (task.id === id ? { title, id } : task));

        console.log(newTasks)

        setTasks(newTasks);
        setEditItem(null);
    };

    return (
        <TaskListContext.Provider 
        value={{
            tasks, 
            addTask, 
            removeTask, 
            clearList, 
            findItem, 
            editTask, 
            editItem}}
            >
            {props.children}
        </TaskListContext.Provider>
    );
};

export default TaskListContextProvider;


