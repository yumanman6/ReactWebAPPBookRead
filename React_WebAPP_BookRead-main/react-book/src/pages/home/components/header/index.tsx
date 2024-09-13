import React from 'react';
import { Link } from 'react-router-dom';

import styles from '@/pages/home/components/header/index.module.scss';

const Header: React.FC = React.memo(() => {
    return (
        <div className={styles.header}>

            <div className={styles.left}>
                <h1>墨客书城</h1>
            </div>
            <div className={styles.right}>
                <Link to={"/search"}>
                    <i className='icon-search'/>
                </Link>
                <Link to={"/shelf"}>
                    <i className='icon-book'/>
                </Link>
                
                
            </div>
        </div>
    )
})

export default Header;