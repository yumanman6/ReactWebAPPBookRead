import React from "react";
import { Popup, Grid } from "@/base";

import { chapterActions } from "@/pages/chapter/store";

import { useAppSelector, useAppDispatch } from "@/store";

import styles from './index.module.scss';

const NavBar: React.FC = React.memo(() => {
    const footerVisible = useAppSelector<boolean>((state) => state.chapter.footerVisible);
    const nightTheme = useAppSelector<boolean>((state) => state.chapter.nightTheme);
    const dispatch = useAppDispatch();

    const onCatalog = () => {
        dispatch(chapterActions.setCatalogVisible(true));
    }

    const onProgress = () => {
        dispatch(chapterActions.setProgressBarVisible(true));
    }

    const onSetting = () => {
        dispatch(chapterActions.setSettingBarVisible(true));
    }

    const onNightTheme = () => {
        dispatch(chapterActions.setNightTheme(!nightTheme));
    }

    return  <Popup position="bottom" visible={footerVisible} mask={false}>
        <div className={styles.navBar}>
            <Grid columns={4}>
                <div className={styles.item} onClick={onCatalog}>
                    <div className={styles.icon}>
                        <i className="icon-menu"/>
                    </div>
                    <div className={styles.name}>目录</div>
                </div>

                <div className={styles.item} onClick={onProgress}>
                    <div className={styles.icon}>
                        <i className="icon-equalizer"/>
                    </div>
                    <div className={styles.name}>进度</div>
                </div>

                <div className={styles.item} onClick={onSetting}>
                    <div className={styles.icon}>
                        <i className="icon-cog"/>
                    </div>
                    <div className={styles.name}>设置</div>
                </div>

                <div className={styles.item} onClick={onNightTheme}>
                    <div className={styles.icon}>
                        {nightTheme ? <i className="icon-sun"/> : <i className="icon-brightness-contrast"/>}
                    </div>
                    <div className={styles.name}>{nightTheme ? "日间" : "夜间"}</div>
                </div>
            </Grid>
        </div>
    </Popup>
});

export default NavBar;