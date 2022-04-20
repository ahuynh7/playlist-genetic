import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';

const App = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} >
                    <Route path='login' element={<Home />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
