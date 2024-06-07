import {
    BrowserRouter as Router,
    Route,
    Routes,
    useLocation,
} from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/layouts/DefaultLayout';
import LoadingBar from 'react-top-loading-bar';
import { useContext, useEffect, useState } from 'react';
import { HistoryContext, HistoryProvider } from './components/HistoryProvider';
import { Home } from './pages/Home';
import { Playlist } from './pages/Playlist';
import { Library } from './pages/Library';
import { Artist } from './pages/Artist';
import { Search } from './pages/Search';

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
                <HistoryProvider>
                    <RoutesComponent setProgress={setProgress}>
                        {/* {publicRoutes.map((route, index) => {
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
                    })} */}
                    </RoutesComponent>
                </HistoryProvider>
            </div>
        </Router>
    );
}

const components = {
    '/': Home,
    '/explore': Home,
    '/playlist': Playlist,
    '/library': Library,
    '/artist': Artist,
    '/search': Search,
};

const RoutesComponent = ({ setProgress }) => {
    const location = useLocation();
    const { previousPath, setPreviousPath } = useContext(HistoryContext);

    useEffect(() => {
        if (!location.pathname.includes('/player')) {
            setPreviousPath(location.pathname + location.search);
            console.log();
        }
    }, [location.pathname]);

    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                const Layout = DefaultLayout;
                const Page = !location.pathname.includes('/player')
                    ? route.component
                    : previousPath
                    ? components[
                          previousPath.includes('?')
                              ? previousPath?.substring(
                                    0,
                                    previousPath?.indexOf('?'),
                                )
                              : previousPath
                      ]
                    : components['/'];
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
    );
};

export default App;
