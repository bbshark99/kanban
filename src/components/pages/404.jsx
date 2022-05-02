import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <main className='main '>
            <Helmet>
                <title>Terra Kanbanboard | 404</title>
            </Helmet>

            <h1 className='hidden'>Terra Kanbanboard - 404</h1>

            <div className='page-content'>
                <section
                    className='error-section flex flex-col justify-center content-center text-center pl-3 pr-3 w-[100vw] h-[100vh] bg-gray-100'>
                    <h1 className='mb-2 ls-m font-medium text-lg'>Error 404</h1>
                    <img src='./images/404.png' alt='error 404' width='609' height='131' className='mx-auto my-0' />
                    <h4 className='mt-7 mb-0 ls-m text-uppercase'>Ooopps! That page can’t be found.</h4>
                    <p className='text-grey font-primary ls-m'>It looks like nothing was found at this location.</p>
                    <Link to='/' className='btn btn-primary btn-rounded mb-4'>Go home</Link>
                </section>
            </div>
        </main >
    )
}

export default ErrorPage;