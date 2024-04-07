import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


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
			const deletedTaskId = action.payload;
			state.tasks = state.tasks.filter(task => task._id !== deletedTaskId);
			state.todoTasks = state.todoTasks.filter(task => task._id !== deletedTaskId);
			state.completedTasks = state.completedTasks.filter(task => task._id !== deletedTaskId);
			state.inProgressTasks = state.inProgressTasks.filter(task => task._id !== deletedTaskId);
		},
		taskUpdated: (state, action) => {
			const updatedTask = action.payload;
			const index = state.tasks.findIndex(task => task._id === updatedTask._id);
			if (index !== -1) {
				state.tasks[index] = updatedTask;
				state.todoTasks = state.tasks.filter(task => task.stage === 'todo');
				state.completedTasks = state.tasks.filter(task => task.stage === 'completed');
				state.inProgressTasks = state.tasks.filter(task => task.stage === 'in progress');
			}
		},
	},
});

export const { tasksLoaded, taskAdded, taskDeleted, taskUpdated } = taskSlice.actions;

export default taskSlice.reducer;

export const getAllTasks = (id) => async (dispatch) => {
	try {
		const response = await axios.get('https://task-manager-z5la.onrender.com/api/task', {
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

export async function addTask(taskData, dispatch) {
	try {
		const response = await axios.post('https://task-manager-z5la.onrender.com/api/task/create', taskData);
		dispatch(taskAdded(response.data.task));
		toast.success('Task added successfully');
		return true; // Task added successfully
	} catch (error) {
		console.error('Error adding task:', error);
		toast.error('Failed to add task');
		return false; // Failed to add task
	}
};

export async function deleteTask (taskId,dispatch){
	try {
		await axios.delete(`https://task-manager-z5la.onrender.com/api/task/delete/${taskId}`);
		dispatch(taskDeleted(taskId));
		toast.success('Task deleted successfully');
	} catch (error) {
		console.error('Error deleting task:', error);
		toast.error('Failed to delete task');
	}
};

export async function updateTask(taskId, updatedTaskData, dispatch) {
	try {
		const response = await axios.patch(`https://task-manager-z5la.onrender.com/api/task/update/${taskId}`, updatedTaskData);
		dispatch(taskUpdated(response.data.task));
		toast.success('Task updated successfully');
	} catch (error) {
		console.error('Error updating task:', error);
		toast.error('Failed to update task');
	}
};

export async function addSubTask(taskId,updatedTaskData, dispatch) {
	try {
		const response = await axios.patch(`https://task-manager-z5la.onrender.com/api/task/add-subtask/${taskId}`, updatedTaskData);
		dispatch(taskUpdated(response.data.task));
		toast.success('Task updated successfully');
	} catch (error) {
		console.error('Error updating task:', error);
		toast.error('Failed to update task');
	}
};
