import React from 'react';

import { Divider } from '@/base';

import DetailBookCatalog from './components/detailBookCatalog';
import DetailBookInfo from './components/detailBookInfo';
import DetailNavBar from './components/detailNavBar';

import styles from './index.module.scss';

const DetailHeader: React.FC = React.memo(() => {
    return <div className={styles.header}>
        <DetailNavBar />
        <DetailBookInfo />
        <Divider />
        <DetailBookCatalog />
    </div>
})

export default DetailHeader;