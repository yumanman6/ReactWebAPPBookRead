import React from "react";

import { NavBar, Popup } from "@/base";

import styles from './index.module.scss';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";

const ChapterHeader: React.FC = () => {
    const headerVisible = useAppSelector<boolean>((state) => state.chapter.headerVisible);
    const navigate = useNavigate();

    const rightRender = () => {
        return (
            <div className={styles.icons}>
                <i className={"icon-home"} onClick={onGoHome}/>
            </div>
        ) 
    }

    const onGoHome = () => {
        navigate('/');
    }

    const onBack = () => {
        navigate(-1);
    }

    return <div className={styles.header}>
        <Popup position="top" mask={false} visible={headerVisible}>
            <NavBar right={rightRender()} onBack={onBack}/>
        </Popup>
    </div>
}

export default ChapterHeader;