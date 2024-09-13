import React from "react";

import SearchBar from "./components/searchBar";
import SearchList from "./components/searchList";
import SearchHot from "./components/searchHot";
import SearchHistory from "./components/searchHistory";
import style from './index.module.scss'

import { createReducer } from '@/pages/search/store';
import { useReducer } from '@/store';

const Search: React.FC = () => {
    const { reducer } = React.useMemo(() => createReducer('search'), []);
    useReducer(reducer);

    return <div className={style.search}>
        <SearchBar />
        <SearchHot />
        <SearchHistory />
        <SearchList />
    </div> 
}

export default Search;