import React from "react";
import cx from 'classnames';

import styles from "./index.module.scss";
import { Image } from "@/base";

export interface BookCoverProps {
    src: string;
    alt: string;
    style?: React.CSSProperties & Partial<Record<'--width' | '--height' | '--border-radius', string>>;
    editMode?: boolean;
    active?: boolean;
}

const BookCover: React.FC<BookCoverProps> = props => {
    return (
        <div className={styles.bookCover}>
            {/* <img src={props.src} alt={props.alt} className={styles.coverImg} /> */}
            <Image lazy={true} src={props.src} alt={props.alt} className={styles.coverImg} style={props.style}/>
            {props.editMode && <i className={cx("icon-checkbox-checked", styles.icon,  {[styles.active]: props.active})}/>}
        </div>
    )
}

export default BookCover;