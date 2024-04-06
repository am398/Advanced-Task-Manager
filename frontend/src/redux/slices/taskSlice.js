import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const initialState = {
	tasks: [],
	todoTasks: [],
	completedTasks: [],
	inProgressTasks: [],
};

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		tasksLoaded: (state, action) => {
			state.tasks = action.payload;
			state.todoTasks = action.payload.filter(task => task.stage === 'todo');
			state.completedTasks = action.payload.filter(task => task.stage === 'completed');
			state.inProgressTasks = action.payload.filter(task => task.stage === 'in progress');
		},
		taskAdded: (state, action) => {
			state.tasks.push(action.payload);
			if (action.payload.stage === 'todo') {
				state.todoTasks.push(action.payload);
			} else if (action.payload.stage === 'completed') {
				state.completedTasks.push(action.payload);
			} else if (action.payload.stage === 'in progress') {
				state.inProgressTasks.push(action.payload);
			}
		},
		taskDeleted: (state, action) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
			state.todoTasks = state.todoTasks.filter(task => task.id !== action.payload);
			state.completedTasks = state.completedTasks.filter(task => task.id !== action.payload);
			state.inProgressTasks = state.inProgressTasks.filter(task => task.id !== action.payload);
		},
		taskUpdated: (state, action) => {
			const updatedTask = action.payload;
			const index = state.tasks.findIndex(task => task.id === updatedTask.id);
			if (index !== -1) {
				state.tasks[index] = updatedTask;
			}
			state.todoTasks = state.tasks.filter(task => task.stage === 'todo');
			state.completedTasks = state.tasks.filter(task => task.stage === 'completed');
			state.inProgressTasks = state.tasks.filter(task => task.stage === 'in progress');
		},
	},
});

export const { tasksLoaded, taskAdded, taskDeleted, taskUpdated } = taskSlice.actions;

export default taskSlice.reducer;

export const getAllTasks = (id) => async (dispatch) => {
	try {
		const response = await axios.get('http://localhost:5000/api/task', {
			params: {
				user_id: id
			}
		});
		dispatch(tasksLoaded(response.data.tasks));
	} catch (error) {
		console.error('Error fetching tasks:', error);
		toast.error('Failed to fetch tasks');
	}
};

export async function addTask(taskData,dispatch){
    try {
        const response = await axios.post('http://localhost:5000/api/task/create', taskData);
        dispatch(taskAdded(response.data.task));
        toast.success('Task added successfully');
        return true; // Task added successfully
    } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Failed to add task');
        return false; // Failed to add task
    }
};

export const deleteTask = (taskId) => async (dispatch) => {
	try {
		await axios.delete(`http://localhost:4000/task/${taskId}`);
		dispatch(taskDeleted(taskId));
		toast.success('Task deleted successfully');
	} catch (error) {
		console.error('Error deleting task:', error);
		toast.error('Failed to delete task');
	}
};

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
	try {
		const response = await axios.put(`http://localhost:4000/task/${taskId}`, updatedTaskData);
		dispatch(taskUpdated(response.data));
		toast.success('Task updated successfully');
	} catch (error) {
		console.error('Error updating task:', error);
		toast.error('Failed to update task');
	}
};
