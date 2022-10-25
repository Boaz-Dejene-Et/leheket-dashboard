// project import
// import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from 'layout/MainLayout';

import { lazy, useEffect } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// redux
import { useSelector, useDispatch } from "react-redux";

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const OrderedBooks = Loadable(lazy(() => import('pages/ordered-books')));
const Users = Loadable(lazy(() => import('pages/users')));
const Notification = Loadable(lazy(() => import('pages/notification')));
const AddBook = Loadable(lazy(() => import('pages/add-book')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
    const isAuth = useSelector((state) => state.menu.isAuth);
    const state = useSelector((state) => state);
    console.log(state)

    return(
        <ThemeCustomization>
            <ScrollTop>
                {/* <Routes /> */}
                <Routes>
                    {isAuth ? (
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" element={<DashboardDefault />} />
                            <Route path="ordered-books" element={<OrderedBooks />} />
                            <Route path="users" element={<Users />} />
                            <Route path="notification" element={<Notification />} />
                            <Route path="add_book" element={<AddBook />} />
                            <Route path="color" element={<Color />} />
                            <Route path="sample-page" element={<SamplePage />} />
                            <Route path="shadow" element={<Shadow />} />
                            <Route path="typography" element={<Typography />} />
                            <Route path="icons/ant" element={<AntIcons />} />
                        </Route>
                    ) : (
                        <>
                            <Route path="/" element={<MinimalLayout />}>
                                <Route path="/" element={<AuthLogin />} replace />
                            </Route>
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </>
                    )}
                </Routes>
            </ScrollTop>
        </ThemeCustomization>
    )
};

export default App;
