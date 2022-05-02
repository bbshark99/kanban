import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';

const actionTypes = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    UPDATE_TASK_STATUS: 'UPDATE_TASK_STATUS'
}

const initialState = {
    byId: {
        task1: {
            id: 'task1',
            name: 'Try dragging issues to different columns to transition their status.',
            content: 'Wash the dishes',
            createdDate: '4/23/2022',
            status: 'column1',
            author: 'Andy Bell'
        },
        task2: {
            id: 'task2',
            name: 'Each issue can be assigned priority from lowest to highest.',
            content: 'Procratinate',
            createdDate: '4/23/2022',
            status: 'column1',
            author: 'Andy Bell'
        },
        task3: {
            id: 'task3',
            name: 'You can use rich text with images in issue descriptions.',
            content: 'Do some actual work',
            createdDate: '4/23/2022',
            status: 'column2',
            author: 'David Yang'
        },
        task4: {
            id: 'task4',
            name: 'This is an issue of type: Task.',
            content: 'Sleep, please! 😢😢😢😢',
            createdDate: '4/23/2022',
            status: 'column2',
            author: 'Andy Bell'
        },
        task5: {
            id: 'task5',
            name: 'Each issue has a single reporter but can have multiple assignees.',
            content: 'Stay awake at all costs!',
            createdDate: '4/23/2022',
            status: 'column2',
            author: 'Andy Bell'
        },
        task6: {
            id: 'task6',
            name: `Click on an issue to see what's behind it.`,
            content: 'Stay awake at all costs!',
            createdDate: '4/23/2022',
            status: 'column3',
            author: 'Ashley Cole'
        },
        task7: {
            id: 'task7',
            name: 'You can track how many hours were spent working on an issue, and how many hours remain.',
            content: 'Stay awake at all costs!',
            createdDate: '4/23/2022',
            status: 'column3',
            author: 'Andy Bell'
        }
    }
}

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_TASK:
            toast.success('Added a new task');
            return {
                ...state,
                byId: {
                    ...state.byId, [action.payload.newTask.id]: action.payload.newTask
                }
            };

        case actionTypes.UPDATE_TASK:
            return { ...state, byId: { ...state.byId, [action.payload.newTask.id]: action.payload.newTask } };

        case actionTypes.UPDATE_TASK_STATUS:
            let taskId = action.payload.id;
            return { ...state, byId: { ...state.byId, [taskId]: { ...state['byId'][taskId], status: action.payload.newStatus } } };

        case actionTypes.DELETE_TASK:
            toast.error('Deleted a task');
            let newState = { ...state.byId };
            delete newState[action.payload.taskId];
            return { ...state, byId: newState }

        default:
            return state;
    }
}

export const taskActions = {
    addTask: (newTask) => ({
        type: actionTypes.ADD_TASK,
        payload: { newTask }
    }),
    updateTask: (newTask) => ({
        type: actionTypes.UPDATE_TASK,
        payload: { newTask }
    }),
    updateTaskSatus: (id, newStatus) => ({
        type: actionTypes.UPDATE_TASK_STATUS,
        payload: { id, newStatus }
    }),
    deleteTask: (taskId) => ({
        type: actionTypes.DELETE_TASK,
        payload: { taskId }
    })
};

const persistConfig = {
    keyPrefix: 'terra-',
    key: 'task',
    storage
}

export default persistReducer(persistConfig, taskReducer);