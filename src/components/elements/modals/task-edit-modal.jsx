import React, { useEffect, useState } from 'react';
import { Dialog } from '@reach/dialog';
import { connect, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '@reach/dialog/styles.css';

import { taskActions } from '../../../store/task';
import { columnActions } from '../../../store/column';

import { Cross } from '../icons';

import { NameSchema } from '../../../schema';

const TaskModal = ({ modalStatus, task, updateTask, moveTask, deleteTaskInColumn, deleteTask }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState(task.content);
    const [status, setStatus] = useState(task.status);
    const [author, setAuthor] = useState(task.author);
    const colData = useSelector((state) => state.column);

    useEffect(() => {
        if (modalStatus > 0) {
            setModalOpen(true);
        }
    }, [modalStatus])

    const updateTaskItem = (info) => {
        const { title } = info;
        setModalOpen(false);
        if (task.status !== status) {
            moveTask(task.id, task.status, status);
        }
        let newTask = { name: title, author: author, content: desc, status: status, createdDate: task.createdDate, id: task.id };
        updateTask(newTask);
    }

    const deleteTaskItem = () => {
        deleteTaskInColumn(task.id, task.status);
        deleteTask(task.id);
        setModalOpen(false);
    }

    return (
        <Dialog isOpen={modalOpen} onDismiss={() => setModalOpen(false)} aria-label='Task Modal' className='z-20 fade-in rounded-md'>
            <div className='flex justify-end'>
                <button className='hover:bg-red-200 rounded-full text-red-900' onClick={() => setModalOpen(false)} aria-label='close'>
                    <Cross />
                </button>
            </div>

            <Formik initialValues={{
                title: task.name
            }}
                validationSchema={NameSchema}
                onSubmit={updateTaskItem} >
                <Form>
                    <div className='lg:grid lg:grid-cols-9 gap-x-20 w-full'>
                        <div className='col-span-5 mt-2'>
                            <div>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block' htmlFor='title'>Title:</label>
                                <Field type='text' name='title' className='px-2 py-2 rounded-md text-xl hover:bg-gray-100 border-gray-100 focus:bg-white border-2 border-white focus:border-blue-400 md:text-2xl block w-full inline-block outline-none' />
                                <ErrorMessage name='title' />
                            </div>

                            <div className='mt-12 w-full'>
                                <div>
                                    <div className=''>
                                        <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block' htmlFor='desc' >Description:</label>
                                        <textarea name='desc' className='focus:border-blue-400 border border-gray-300  px-4 py-3 outline-none h-56 w-full' defaultValue={task.content} onChange={(e) => setDesc(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-4 mt-2'>
                            <div className=''>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block' htmlFor='title'>Status:</label>
                                <div className='flex items-center'>
                                    <select name='status' defaultValue={task.status} className='select focus-visible:border-0 rounded-md bg-gray-100 px-1 py-2 font-medium' onChange={(e) => setStatus(e.target.value)}>
                                        {colData?.columnOrder.map((col, i) => {
                                            const column = colData?.columns[col];
                                            return <option key={column.id} value={column.id}>{column.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className='mt-12'>
                                <label className='mb-2 text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block' htmlFor='desc' >Author:</label>

                                <div className='flex items-center'>
                                    <select defaultValue={task.author} onChange={(e) => setAuthor(e.target.value)} className='select focus-visible:border-0 rounded-md bg-gray-100 px-1 py-2 font-small'>
                                        <option value='Andy Bell'>Andy Bell</option>
                                        <option value='David Yang'>David Yang</option>
                                        <option value='Ashely Cole'>Ashley Cole</option>
                                    </select>
                                </div>
                            </div>

                            <div className='mt-12'>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block' htmlFor='desc' >Date Added:</label>
                                <h4 className='tracking-wide font-medium'>{task.createdDate}</h4>
                            </div>

                            <div className='my-12 flex justify-end w-full text-sm sm:text-base'>
                                {(task.content !== desc) || (task.status !== status) || (task.title !== status)
                                    ?
                                    <div className='bg-green-700 border-green-700 border text-white px-3 py-1 rounded-sm transform hover:bg-white hover:text-green-700' aria-label='save'>
                                        <button className='cursor-pointer' type='submit'>Save changes</button>
                                    </div>
                                    :
                                    <div className='bg-green-700 text-white px-3 py-1 rounded-sm transform opacity-30' aria-label='save'>
                                        <button className='cursor-pointer' type='submit'>Save changes</button>
                                    </div>
                                }

                                <div className='border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-3 py-1 rounded-sm ml-4' onClick={deleteTaskItem}>
                                    <p className='cursor-pointer'>Delete Task</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Dialog>
    )
}


export default connect(null, { taskActions, updateColumn: columnActions.updateColumn, updateTask: taskActions.updateTask, moveTask: columnActions.moveTask, deleteTaskInColumn: columnActions.deleteTaskInColumn, deleteTask: taskActions.deleteTask })(TaskModal);