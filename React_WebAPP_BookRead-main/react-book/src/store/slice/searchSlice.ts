// import { createSlice } from "@reduxjs/toolkit";
// import { parse } from "query-string";

// const keyword = parse(window.location.search).keyword;

// const searchSlice = createSlice({
//     name: 'search',
//     initialState: {
//         searchKeyword: keyword == undefined ? '' : keyword.toString(),
//         searchMode: false
//     },
//     reducers: {
//         setSearchKeyword: (state, action) => {
//             state.searchKeyword = action.payload;
//         },
//         setSearchMode: (state, action) => {
//             state.searchMode = action.payload;
//         }
//     }
// });

// export const {setSearchKeyword, setSearchMode} = searchSlice.actions;
// export default searchSlice.reducer;