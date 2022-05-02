import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { toast } from 'react-toastify';

const actionTypes = {
    ADD_COLUMN: 'ADD_COLUMN',
    ADD_TASK_IN_COLUMN: 'ADD_TASK_IN_COLUMN',
    CHAGE_TASK_ORDER: 'CHANGE_TASK_ORDER',
    DELETE_COLUMN: 'DELETE_COLUMN',
    UPDATE_COLUMN: 'UPDATE_COLUMN',
    UPDATE_COLUMN_STATE: 'UPDATE_COLUMN_STATE',
    MOVE_TASK: 'MOVE_TASK',
    MOVE_TASK_BY_ID: 'MOVE_TASK_BY_ID',
    DELETE_TASK_IN_COLUMN: 'DELETE_TASK_IN_COLUMN'
}

const initialState = {
    columnOrder: ['column1', 'column2', 'column3'],
    columns: {
        column1: { id: 'column1', name: 'To Do', desc: 'To Do List', taskIds: ['task1', 'task2'] },
        column2: { id: 'column2', name: 'On Going', desc: 'On Going List', taskIds: ['task3', 'task4'] },
        column3: { id: 'column3', name: 'Done', desc: 'Done List', taskIds: ['task5', 'task6', 'task7'] },
    }
}

function columnReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD_COLUMN:
            toast.success('Added a new column');
            let newId = 'column' + (state.columnOrder.length + 1);
            let newItem = { name: action.payload.name, id: newId, taskIds: [], desc: 'Add a new task' };
            return {
                columnOrder: state.columnOrder.concat(newId),
                columns: { ...state.columns, [newId]: newItem }
            }

        case actionTypes.ADD_TASK_IN_COLUMN:
            let { columnId } = action.payload;
            let newTaskArray = [...state.columns[columnId].taskIds];
            newTaskArray.push(action.payload.taskId);
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: newTaskArray
                    }
                }
            }

        case actionTypes.UPDATE_COLUMN_STATE:
            return action.payload.current;

        case actionTypes.UPDATE_COLUMN:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.payload.column.id]: action.payload.column
                }
            }

        case actionTypes.MOVE_TASK:
            let { taskId, source, dest, type } = action.payload;
            let startColumn, endColumn;
            if (type === 'byId') {
                startColumn = state.columns[source.droppableId];
                endColumn = state.columns[dest.droppableId];
            } else {
                startColumn = state.columns[source];
                endColumn = state.columns[dest];
            }

            let startTaskIDs = Array.from(startColumn.taskIds);
            let finishTaskIDs = Array.from(endColumn.taskIds);

            if (type === 'byId') {
                startTaskIDs.splice(source.index, 1);
                finishTaskIDs.splice(dest.index, 0, taskId);
            } else {
                startTaskIDs = startTaskIDs.filter(item => item !== taskId);
                finishTaskIDs.push(taskId);
            }

            let newStart = {
                ...startColumn, taskIds: startTaskIDs
            }
            let newFinish = {
                ...endColumn, taskIds: finishTaskIDs
            }

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [startColumn.id]: newStart,
                    [endColumn.id]: newFinish
                }
            }

        case actionTypes.CHAGE_TASK_ORDER:
            const targetColumn = state.columns[action.payload.dest.droppableId];
            const newTaskIds = Array.from(targetColumn.taskIds);

            newTaskIds.splice(action.payload.source.index, 1);
            newTaskIds.splice(action.payload.dest.index, 0, action.payload.taskId);

            const newColumn = {
                ...targetColumn, taskIds: newTaskIds
            }

            return {
                ...state,
                columns: { ...state.columns, [targetColumn.id]: newColumn }
            }

        case actionTypes.DELETE_COLUMN:
            toast.error('Deleted a column');
            let newOrder = [...state.columnOrder];
            newOrder = newOrder.filter(item => item !== action.payload.id);
            let newColummns = { ...state.columns };
            delete newColummns[action.payload.id];
            return {
                columnOrder: newOrder,
                columns: newColummns
            }

        case actionTypes.DELETE_TASK_IN_COLUMN:
            let column = state.columns[action.payload.columnId];
            let columnTasks = column.taskIds.filter(item => item !== action.payload.taskId);

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [column.id]: { ...column, taskIds: columnTasks }
                }
            }

        default:
            return state;
    }
}

export const columnActions = {
    addColumn: (name) => ({
        type: actionTypes.ADD_COLUMN,
        payload: { name }
    }),
    addTaskInColumn: (taskId, columnId) => ({
        type: actionTypes.ADD_TASK_IN_COLUMN,
        payload: { taskId, columnId }
    }),
    moveTaskById: (taskId, source, dest) => ({
        type: actionTypes.MOVE_TASK,
        payload: { taskId, source, dest, type: 'byId' }
    }),
    moveTask: (taskId, source, dest) => ({
        type: actionTypes.MOVE_TASK,
        payload: { taskId, source, dest, type: 'default' }
    }),
    changeTaskOrder: (taskId, source, dest) => ({
        type: actionTypes.CHAGE_TASK_ORDER,
        payload: { taskId, source, dest }
    }),
    updateColumnState: (current) => ({
        type: actionTypes.UPDATE_COLUMN_STATE,
        payload: { current }
    }),
    updateColumn: (column) => ({
        type: actionTypes.UPDATE_COLUMN,
        payload: { column }
    }),
    deleteColumn: (id) => ({
        type: actionTypes.DELETE_COLUMN,
        payload: { id }
    }),
    deleteTaskInColumn: (taskId, columnId) => ({
        type: actionTypes.DELETE_TASK_IN_COLUMN,
        payload: { taskId, columnId }
    })
};

const persistConfig = {
    keyPrefix: 'terra-',
    key: 'column',
    storage
}

export default persistReducer(persistConfig, columnReducer);