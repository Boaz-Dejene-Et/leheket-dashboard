import React, { lazy } from 'react';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from 'layout/MainLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { useSelector } from "react-redux";

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const OrderedBooks = Loadable(lazy(() => import('pages/ordered-books')));
const Users = Loadable(lazy(() => import('pages/users')));
const Notification = Loadable(lazy(() => import('pages/notification')));
const AddBook = Loadable(lazy(() => import('pages/add-book')));
const Books = Loadable(lazy(() => import('pages/books')));
const EditBook = Loadable(lazy(() => import('pages/books/edit-book')));
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));

const App = () => {
    const isAuth = useSelector((state) => state.menu.isAuth);

    return(
        <ThemeCustomization>
            <ScrollTop>
                <ToastContainer />
                <Routes>
                    {isAuth ? (
                        <Route path="/" element={<MainLayout />}>
                            <Route path="/" element={<DashboardDefault />} />
                            <Route path="ordered-books" element={<OrderedBooks />} />
                            <Route path="books" element={<Books />} />
                            <Route path="books/edit-book/:id" element={<EditBook />} />
                            <Route path="add_book" element={<AddBook />} />
                            <Route path="users" element={<Users />} />
                            <Route path="notification" element={<Notification />} />
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
