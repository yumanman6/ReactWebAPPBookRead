import React from "react";
import api from '@/pages/ranking/api';
import { useRequest } from "@/hooks/useRequest";
import { IBookInfo } from "@/types/book";
import { useNavigate } from "react-router-dom";
import styles from './index.module.scss';
import { ErrorBlock, Grid, Space } from "@/base";
import Loading from "@/components/loading";
import { px2rem } from "@/utils/unit";
import BookCover from "@/components/bookCover";

interface RankingBookListProps {
    gender: 'male' | 'female';
    id: string;
}

const RankingBookList: React.FC<RankingBookListProps> = React.memo((props) => {
    const navigate = useNavigate();
    
    const { data, error } = useRequest<IBookInfo[]>({
        url: api.getBookList({gender: props.gender, key:props.id})
    })

    if(error) {
        return <ErrorBlock />
    }

    if(!data) {
        return <Loading />
    }

    return (<div className={styles.rankingBookList}>
        <Grid columns={1} gap={px2rem(24)} key={props.id}>
            {data?.map((book) => (
                <Grid.Item key={book.bookId} onClick={() => navigate(`/book/${book.bookId}`)}>
                    <Space >
                        <BookCover src={book.coverImg} alt={book.title}/>
                        <Space direction="vertical" justify="between" gap={px2rem(12)}>
                            <div className={styles.bookName}>{book.title}</div>
                            <div className={styles.desc}>{book.desc}</div>
                            <div className={styles.meta}>
                                {book.author}-{book.categoryName}
                            </div>
                        </Space>
                    </Space>
                </Grid.Item>
            ))}
        </Grid>
    </div>)
})

export default RankingBookList;