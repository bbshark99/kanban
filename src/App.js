import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const HomePage = React.lazy(() => import('./components/pages'));
const ErrorPage = React.lazy(() => import('./components/pages/404'));

function App() {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Routes>
          <Route path='/' exact element={<HomePage />} ></Route>
          <Route path='*' element={<ErrorPage />}></Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
