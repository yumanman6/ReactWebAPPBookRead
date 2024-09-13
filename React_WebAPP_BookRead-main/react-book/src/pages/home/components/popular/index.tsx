import React from "react";
import { useNavigate } from "react-router-dom";
import { useRequest } from "@/hooks/useRequest";
import { IHomeData } from "@/pages/home/types";
import api from '@/pages/home/api';
import { Space, Grid, Card } from "@/base";
import BookCover from "@/components/bookCover";
import styles from '@/pages/home/components/popular/index.module.scss';
import { px2rem } from "@/utils/unit";
// import {  } from "@taoyage/react-mobile-ui";

const Popular: React.FC = () => {
    const navigate = useNavigate();
    const { data } = useRequest<IHomeData>({ url: api.getHomeData });
    
    const onHeaderClick = () => {
        navigate('/book-list/popular');
    }
    const renderContent = () => {
        return data?.popular.map((book) => {
            return (
                <Grid.Item key={book.bookId} onClick={() => navigate(`/book/${book.bookId}`)}>
                    <Space gap={px2rem(12)}>
                        <BookCover src={book.coverImg} alt={book.title}/>
                        <Space direction="vertical" justify="between" gap={px2rem(12)}>
                            <div className={styles.bookName}>{book.title}</div>
                            <div className={styles.desc}>{book.desc}</div>
                            <div className={styles.meta}>
                                {book.author}·{book.categoryName}
                            </div>
                        </Space>
                    </Space>
                </Grid.Item>
            )
        })
    }

    return (
        <div className={styles.popular}>
            <Card title="热门精选" extra={"更多"} onHeaderClick={onHeaderClick} headerClassName={styles.header}> 
                <Grid columns={1} gap={px2rem(24)}>
                    {renderContent()}
                </Grid>
            </Card>
        </div>
    )
}

export default Popular;