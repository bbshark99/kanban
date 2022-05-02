import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Dialog } from '@reach/dialog';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '@reach/dialog/styles.css';

import { taskActions } from '../../../store/task';
import { columnActions } from '../../../store/column';

import { Cross } from '../icons';

import { NameSchema } from '../../../schema';

const TaskModal = ({ modalStatus, taskStatus, addTask, addTaskInColumn }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState(null);
    const [status, setStatus] = useState(taskStatus);
    const [author, setAuthor] = useState(null);
    const colData = useSelector((state) => state.column);
    const tasks = useSelector((state) => state.task.byId);

    useEffect(() => {
        if (modalStatus > 0) {
            setModalOpen(true);
        }
    }, [modalStatus])

    const addTaskItem = (info) => {
        const { title } = info;
        let newId = 'task' + (Object.keys(tasks).length + 1);
        let newTask = { id: newId, name: title, content: desc, status: status, createdDate: new Date().toLocaleDateString(), author: author };
        addTask(newTask);
        addTaskInColumn(newId, status);
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
                title: ''
            }}
                validationSchema={NameSchema}
                onSubmit={addTaskItem} >
                <Form>
                    <div className='lg:grid lg:grid-cols-8 gap-x-20 w-full'>
                        <div className='col-span-5 mt-2'>
                            <div>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block mb-2' htmlFor='title'>Title:</label>
                                <Field type='text' name='title' className='border border-gray-100 px-2 py-2 rounded-md text-xl hover:bg-gray-100 focus:bg-white border-2 border-white focus:border-blue-400 md:text-2xl block w-full inline-block outline-none' />
                                <ErrorMessage name='title' />
                            </div>

                            <div className='mt-12 w-full'>
                                <div>
                                    <div className=''>
                                        <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block mb-2' htmlFor='desc' >Description:</label>
                                        <textarea name='desc' className='focus:border-blue-400 border border-gray-300  px-4 py-2 outline-none h-40 w-full' onChange={(e) => { setDesc(e.target.value) }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-span-3 mt-2'>
                            <div className=''>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block mb-2' htmlFor='title'>Status:</label>
                                <div className='flex items-center'>
                                    <select name='status' defaultValue={taskStatus} className='select focus-visible:border-0 rounded-md bg-gray-100 px-1 py-2 font-small' onChange={(e) => setStatus(e.target.value)}>
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
                                    <select defaultChecked='Andy Bell' onChange={(e) => setAuthor(e.target.value)} className='select focus-visible:border-0 rounded-md bg-gray-100 px-1 py-2 font-small'>
                                        <option value='Andy Bell'>Andy Bell</option>
                                        <option value='David Yang'>David Yang</option>
                                        <option value='Ashely Cole'>Ashley Cole</option>
                                    </select>
                                </div>
                            </div>

                            <div className='my-12 flex justify-end w-full text-sm sm:text-base'>
                                <div className='bg-green-700 border-green-700 border text-white px-3 py-1 rounded-sm transform hover:bg-white hover:text-green-700' aria-label='add'>
                                    <button className='cursor-pointer' type='submit'>ADD TASK</button>
                                </div>

                                <div className='border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-3 py-1 rounded-sm ml-4' onClick={() => { setModalOpen(false) }}>
                                    <p className='cursor-pointer'>Cancel</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Dialog >
    )
}


export default connect(null, { taskActions, addTask: taskActions.addTask, addTaskInColumn: columnActions.addTaskInColumn })(TaskModal);