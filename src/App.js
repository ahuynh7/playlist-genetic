import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';
import Main from './components/Main/Main';

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} >
                    <Route path='login' element={null} />
                    <Route path='main' element={<Main />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
