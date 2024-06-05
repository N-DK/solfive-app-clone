import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/layouts/DefaultLayout';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

function App() {
    const [progress, setProgress] = useState(0);
    return (
        <Router>
            <LoadingBar
                color="#43bcff"
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Layout = DefaultLayout;
                        const Page = route.component;
                        return (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                element={
                                    <Layout setProgress={setProgress}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
