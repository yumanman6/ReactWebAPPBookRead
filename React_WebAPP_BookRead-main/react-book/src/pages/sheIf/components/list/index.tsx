import React from 'react';
import BookList from '@/pages/sheIf/components/list/components/booklist';
import GroupList from '@/pages/sheIf/components/list/components/groupList';
import useReadLocalStorage from '@/hooks/useReadLocalStorage';
import { IBookInfo } from '@/types/book';
import { Grid } from '@/base';
import { px2rem } from '@/utils/unit';
import styles from './index.module.scss';


const List:React.FC = React.memo(() => {
    const bookList = useReadLocalStorage<IBookInfo[]>('shelf') || [];
    
    return (
        <div className={styles.list}>
            <Grid columns={3} gap={px2rem(20)}>
                <GroupList />
                <BookList bookList={bookList} />

            </Grid>
            
        </div>
    )
})

export default List;