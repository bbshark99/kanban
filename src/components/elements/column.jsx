import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import TaskAddModal from './modals/task-add-modal';
import ColumnEditModal from './modals/column-edit-modal';
import Task from './task';

import { Edit } from './icons';
import { Add } from './icons';

const Column = ({ column, index }) => {
    const [taskModalStatus, setTaskModalStatus] = useState(0);
    const [columnModalStatus, setColumnModalStatus] = useState(0);

    const initialData = useSelector((state) => state.task.byId);
    let tasks = [];
    column.taskIds.forEach(item => {
        tasks.push(initialData[item]);
    })

    return (
        <Draggable draggableId={column.id} index={index} key={column.id}>
            {provided =>
                <div {...provided.draggableProps} ref={provided.innerRef} className='rounded-md ml-4 flex-shrink-0 flex flex-col bg-gray-100 w-[300px]'>
                    <div {...provided.dragHandleProps} className='from-blue-700 via-blue-600 to-blue-500 flex items-center justify-between px-4 py-1 rounded-sm'>
                        <h3 className='flex-shrink-0 pt-3 pb-1 px-3 text-sm font-medium text-gray-900'>{column.name}</h3>

                        <div>
                            <button className='pt-3 pb-1 px-1' onClick={() => { setTaskModalStatus(taskModalStatus + 1) }} aria-label='add'>
                                <Add />
                            </button>

                            <button className='pt-3 pb-1 px-1' onClick={() => { setColumnModalStatus(columnModalStatus + 1) }} aria-label='edit'>
                                <Edit />
                            </button>
                        </div>
                    </div>
                    <div className='flex-1 min-h-0 overflow-y-auto scrollable'>
                        {
                            tasks.length > 0 ?
                                <Droppable droppableId={column.id} type='task'>
                                    {(provided, snapshot) =>
                                        <div {...provided.droppableProps} ref={provided.innerRef} className={`pt-1 pb-3 px-3 ${snapshot.isDraggingOver ? 'bg-gradient-to-br from-green-400 via-green-200 to-green-100' : ''}`}>
                                            {tasks.map((t, i) => <Task task={t} id={column.id} index={i} key={t.name} />)}
                                            {provided.placeholder}
                                        </div>
                                    }
                                </Droppable> :
                                <Droppable droppableId={column.id} type='task'>
                                    {(provided, snapshot) =>
                                        <ul {...provided.droppableProps} ref={provided.innerRef} className={`pt-1 pb-3 px-3 ${snapshot.isDraggingOver ? 'bg-gradient-to-br from-green-400 via-green-200 to-green-100' : ''}`}>
                                            <p className='p-5'>{column.desc}</p>
                                            {/* {provided.placeholder} */}
                                        </ul>
                                    }
                                </Droppable>
                        }
                    </div>

                    <TaskAddModal modalStatus={taskModalStatus} taskStatus={column.id} />
                    <ColumnEditModal modalStatus={columnModalStatus} column={column} />
                </div>
            }
        </Draggable>
    )
}

export default Column;