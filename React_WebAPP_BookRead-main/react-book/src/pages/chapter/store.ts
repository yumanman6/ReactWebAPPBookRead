import { combineReducers, ActionCreatorWithPayload, createAction } from "@reduxjs/toolkit";
import { createTempSlice } from "@/store";  

import { THEME, DEFAULT_FONT_SIZE, DEFAULT_THEME_INDEX } from "@/pages/chapter/constants";

interface IChapterActions {
    setHeaderVisible: ActionCreatorWithPayload<boolean, string>;
    setFooterVisible: ActionCreatorWithPayload<boolean, string>;
    setCatalogVisible: ActionCreatorWithPayload<boolean, string>;
    setSettingBarVisible: ActionCreatorWithPayload<boolean, string>;
    setProgressBarVisible: ActionCreatorWithPayload<boolean, string>;
    setTheme: ActionCreatorWithPayload<string,string>;
    setFontSize: ActionCreatorWithPayload<number, string>;
    setNightTheme: ActionCreatorWithPayload<boolean, string>;


}

export const chapterActions: IChapterActions = {
    setHeaderVisible: createAction('INIT'),
    setFooterVisible: createAction('INIT'),
    setCatalogVisible: createAction('INIT'),
    setProgressBarVisible: createAction('INIT'),
    setSettingBarVisible: createAction('INIT'),
    setTheme: createAction('INIT'),
    setFontSize: createAction('INIT'),
    setNightTheme: createAction('INIT'),

}

export const createReducer = (key: string) => {
    const {set:setHeaderVisible, reducer: headerVisible} = createTempSlice<boolean>('headerVisible', false, key);
    const {set:setFooterVisible, reducer: footerVisible} = createTempSlice<boolean>('footerVisible', false, key);
    const {set:setCatalogVisible, reducer: catalogVisible} = createTempSlice<boolean>('catalogVisible', false, key);
    const {set:setSettingBarVisible, reducer: settingBarVisible} = createTempSlice<boolean>('settingBarVisible', false, key);
    const {set:setProgressBarVisible, reducer: progressBarVisible} = createTempSlice<boolean>('progressBarVisible', false, key);
    const {set:setTheme, reducer:theme} = createTempSlice<string>('theme', THEME[DEFAULT_THEME_INDEX], key);
    const {set:setFontSize, reducer: fontSize} = createTempSlice<number>('fontSize', DEFAULT_FONT_SIZE, key);
    const {set:setNightTheme, reducer: nightTheme} = createTempSlice<boolean>('nightTheme', false, key);

    chapterActions.setHeaderVisible = setHeaderVisible;
    chapterActions.setFooterVisible = setFooterVisible;
    chapterActions.setCatalogVisible = setCatalogVisible;
    chapterActions.setProgressBarVisible = setProgressBarVisible;
    chapterActions.setTheme = setTheme;
    chapterActions.setFontSize = setFontSize;
    chapterActions.setNightTheme = setNightTheme;
    chapterActions.setSettingBarVisible = setSettingBarVisible;

    return {
        reducers: {
            [key]:combineReducers({
                headerVisible,
                footerVisible,
                catalogVisible,
                progressBarVisible,
                theme,
                fontSize,
                nightTheme,
                settingBarVisible,
            })
        }
    }
}