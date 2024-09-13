import { useRoutes, Navigate } from "react-router-dom";

import Home from "@/pages/home";
import Detail from "@/pages/detail";
import Ranking from "@/pages/ranking";
import SheIf from "@/pages/sheIf";
import Search from "@/pages/search";
import Chapter from "@/pages/chapter";
import BookList from "@/pages/bookList";
import Catefory from "@/pages/category";
import React from "react";

const AppRouter: React.FC = React.memo(() => {
 const element = useRoutes([
     {
        path: '/',
        element: <Home />,
     },
     {
        path: '/shelf',
        element: <SheIf />,
     },
     {
        path: '/ranking',
        element: <Ranking />
     },
     {
        path: '/category',
        element: <Catefory />
     },
     {
        path: '/search',
        element: <Search />
     },
     {
        path: '/book-List/:key',
        element: <BookList />
     },
     {
        path: '/book/:id',
        element: <Detail />
     },
     {
        path: '/book/:bookId/:chapterId',
        element: <Chapter />
     },
     {
        path: '*',
        element: <Navigate to="/" />
     }
 ]);
 return element;   
});

export default AppRouter;