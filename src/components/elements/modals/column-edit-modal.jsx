import React, { useEffect, useState } from 'react';
import { Dialog } from '@reach/dialog';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '@reach/dialog/styles.css';

import { taskActions } from '../../../store/task';
import { columnActions } from '../../../store/column';

import { NameSchema } from '../../../schema';

import { Cross } from '../icons';

const TaskModal = ({ modalStatus, column, updateColumn, deleteColumn, deleteTask }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [desc, setDesc] = useState(column.desc);

    useEffect(() => {
        if (modalStatus > 0) {
            setModalOpen(true);
        }
    }, [modalStatus])

    const updateColumnData = (info) => {
        const { title } = info;
        let newColumn = { id: column.id, name: title, desc: desc, taskIds: column.taskIds };
        updateColumn(newColumn);
        setModalOpen(false);
    }

    const deleteColumnDate = (e) => {
        e.preventDefault();
        deleteColumn(column.id);
        column.taskIds.forEach(item => {
            deleteTask(item);
        })
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
                title: column.name
            }}
                validationSchema={NameSchema}
                onSubmit={updateColumnData}>
                <Form>
                    <div className='lg:grid gap-x-20 w-full'>
                        <div className='col-span-5 mt-2'>
                            <div>
                                <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block mb-2' htmlFor='title'>Title:</label>
                                <Field type='text' name='title' className='px-2 py-2 rounded-md text-xl hover:bg-gray-100 focus:bg-white border-2 border-white border-gray-100 focus:border-blue-400 md:text-2xl block w-full inline-block outline-none' />
                                <ErrorMessage name='title' />
                            </div>

                            <div className='mt-12 w-full'>
                                <div>
                                    <div className=''>
                                        <label className='text-gray-500 uppercase tracking-wide text-xs sm:text-sm  block mb-2' htmlFor='desc' >Description:</label>
                                        <textarea name='desc' className='focus:border-blue-400 border border-gray-300  px-4 py-2 outline-none h-40 w-full' defaultValue={column.desc} onChange={(e) => setDesc(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-8 flex justify-end w-full text-sm sm:text-base'>
                        <div className='bg-green-700 border-green-700 border text-white px-3 py-1 rounded-sm transform hover:bg-white hover:text-green-700' aria-label='save'>
                            <button className='cursor-pointer' type='submit'>Save Changes</button>
                        </div>

                        <div className='border border-red-700 text-red-700 hover:bg-red-700 hover:text-white transition-colors duration-300 px-3 py-1 rounded-sm ml-4' onClick={deleteColumnDate}>
                            <p className='cursor-pointer'>Delete</p>
                        </div>
                    </div>
                </Form>
            </Formik>
        </Dialog>
    )
}


export default connect(null, { taskActions, updateColumn: columnActions.updateColumn, deleteColumn: columnActions.deleteColumn, deleteTask: taskActions.deleteTask })(TaskModal);