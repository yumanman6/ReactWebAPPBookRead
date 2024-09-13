import React from "react";

import ShlfNavBar from '@/pages/sheIf/components/NavBar';
import ShelfList from '@/pages/sheIf/components/list';
import ShelfEditBar from '@/pages/sheIf/components/editBar';
import createReducer from "@/pages/sheIf/store";
import { useReducer } from "@/store";

const SheIf: React.FC = () => {
    const { reducers } = React.useMemo(() => createReducer('shelf'), []);
    useReducer(reducers);

    return (
        <>
            <ShlfNavBar />
            <ShelfList />
            <ShelfEditBar />
        </>
    )
}

export default SheIf;