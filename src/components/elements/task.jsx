import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Edit } from './icons';
import TaskModal from './modals/task-edit-modal';

const Task = ({ index, task }) => {
    const [modalStatus, setModalStatus] = useState(0);
    let date = new Date(task.createdDate);
    let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    let day = date.getDate();

    return (
        <Draggable draggableId={task.id} index={index} id={`task-${index}`} >
            {(provided, snapshot) =>
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className={`mt-3 task ${snapshot.isDragging ? 'bg-gradient-to-r from-red-100 to-blue-100 text-gray-900' : 'text-gray-800'}`} >
                    <div className='block p-5 shadow rounded-md bg-white'>
                        <div className='flex justify-between'>
                            <p className='text-sm font-medium leading-snug text-gray-900'>{task.name}</p>
                        </div>

                        <div className='flex justify-between mt-5'>
                            <div className='text-sm text-gray-600'><time dateTime='2020-10-12'>{month} {day}</time></div>
                            <button onClick={() => setModalStatus(modalStatus + 1)} aria-label='edit'>
                                <Edit />
                            </button>
                        </div>
                    </div>

                    <TaskModal modalStatus={modalStatus} task={task} />
                </div>
            }
        </Draggable >
    )
}

export default Task;