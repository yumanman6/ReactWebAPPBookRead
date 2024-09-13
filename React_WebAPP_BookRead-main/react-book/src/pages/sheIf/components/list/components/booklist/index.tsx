import { Grid, Space } from '@/base';
import BookCover from '@/components/bookCover';
import { IBookInfo } from '@/types/book';
import { px2rem } from '@/utils/unit';
import React from 'react';

import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@/store';
import { useNavigate } from 'react-router-dom';
import { shelfAction } from '@/pages/sheIf/store';

export interface IBookList {
    bookList: IBookInfo[];
}

const BookList: React.FC<IBookList> = React.memo(props => {
    const editMode = useAppSelector<Boolean>((state => state.shelf.editMode));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const selectedBook = useAppSelector<IBookInfo[]>((state) => state.shelf.selectedBook);

    const onBook = (book: IBookInfo) => {
        if(!editMode) {
            navigate(`/book/${book.bookId}`);
        }else {
            dispatch(shelfAction.setSelectedBook(book));
        }
    }

    const getBookActive = (bookId: string) => {
        const index = selectedBook.findIndex((item) => bookId === item.bookId);
        return index === -1 ? false : true;
    };
    
    return <>{props.bookList.map((book) => (
        <React.Fragment key={book.bookId}>
            <Grid.Item onClick={() => onBook(book)}>
                <BookCover 
                    src={book.coverImg} 
                    alt={book.title} 
                    style={{ '--width': px2rem(96), '--height': px2rem(130) }} 
                    editMode={editMode as boolean}
                    active={getBookActive(book.bookId)}
                />
                <Space direction="vertical" gap={px2rem(6)}>
                    <div className={styles.bookName}>
                        {book.title}
                    </div>
                    <div className={styles.author}>
                        {book.author}
                    </div>
                </Space>
            </Grid.Item>
        </React.Fragment>
    ))}</>
})

export default BookList;