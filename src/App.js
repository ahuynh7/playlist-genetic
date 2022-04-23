import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './components/Home/Home';
import NotFound from './components/Home/NotFound';
import Main from './components/Main/Main';

const App = () => {
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} >
                        <Route path='login' element={null} />
                        <Route path='main' element={<Main />} />
                    </Route>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
