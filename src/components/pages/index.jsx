import React from 'react';
import { connect, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { ToastContainer } from 'react-toastify';

import { taskActions } from '../../store/task';
import { columnActions } from '../../store/column';

import Column from '../elements/column';

const HomePage = ({ updateColumnState, updateTaskSatus, changeTaskOrder, moveTaskById, addColumn }) => {
    const initialData = useSelector((state) => state.column);

    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) return;
        if (type === 'task') {
            const startColumn = initialData.columns[source.droppableId];
            const endColumn = initialData.columns[destination.droppableId];

            if (startColumn === endColumn) {
                changeTaskOrder(draggableId, source, destination);
            } else {
                moveTaskById(draggableId, source, destination);
                updateTaskSatus(draggableId, destination.droppableId);
            }
        } else {
            const newColumnOrder = Array.from(initialData.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);
            updateColumnState({ ...initialData, columnOrder: newColumnOrder });
        }
    }

    const addCol = (e) => {
        e.preventDefault();
        addColumn(e.currentTarget[0].value);
        e.currentTarget[0].value = null;
    }

    return (
        <div className='h-screen flex overflow-hidden'>
            <div className='flex-1 min-w-0 flex flex-col bg-white'>
                <header className='bg-white z-10 text-sm sm:text-base py-5 mx-3 md:mx-6'>
                    <div className='flex flex-wrap justify-between items-center'>
                        <span className='text-xl'>
                            <span className='text-blue-800 hover:text-blue-500'>Terra Kanbanboard </span>
                        </span>
                    </div>
                </header>

                <main className='flex-1 overflow-auto mx-[20px]'>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='allCols' type='column' direction='horizontal'>
                            {provided =>
                                <div {...provided.droppableProps} ref={provided.innerRef} className='p-3 h-full inline-flex' style={{ height: '90%' }}>
                                    {
                                        initialData?.columnOrder.map((col, i) => {
                                            const column = initialData?.columns[col];
                                            return <Column column={column} allData={initialData} key={column.id} index={i} />
                                        })
                                    }
                                    {provided.placeholder}
                                    <form onSubmit={addCol} autoComplete='off' className='ml-4'>
                                        <input maxLength='20' className='truncate bg-transparent placeholder-indigo-500 text-indigo-800 bg-indigo-50 px-2 outline-none py-1 rounded-sm ring-2 focus:ring-indigo-500' type='text' name='newCol' placeholder='+ Add a new column' />
                                    </form>
                                </div>
                            }
                        </Droppable>
                    </DragDropContext>
                </main>
            </div>

            <ToastContainer
                autoClose={3000}
                duration={300}
                newestOnTo={true}
                className='toast-container'
                position='top-right'
                closeButton={false}
                hideProgressBar={true}
                newestOnTop={true}
                draggable={false}
            />
        </div>
    )
}

export default connect(null, { taskActions, moveTaskById: columnActions.moveTaskById, updateColumnState: columnActions.updateColumnState, updateTaskSatus: taskActions.updateTaskSatus, changeTaskOrder: columnActions.changeTaskOrder, addColumn: columnActions.addColumn })(HomePage);