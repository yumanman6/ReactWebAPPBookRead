import React from "react";
import { useNavigate } from "react-router-dom";
import { NavBar, ErrorBlock, Grid, Space } from "@/base";

import BookCover from "@/components/bookCover";
import Loading from "@/components/loading";
import { useRequest } from "@/hooks/useRequest";
import { px2rem } from "@/utils/unit";

import api from "@/pages/category/api";
import { ICategory } from "@/pages/category/types";

import styles from './index.module.scss'

const Catefory: React.FC = () => {
    const { data,error } = useRequest<ICategory[]>({ url: api.category });
    const navigate = useNavigate();

    if(error) {
        return <ErrorBlock />
    }

    if(!data) {
        return <Loading />
    }

    const onBack = () => {
        navigate(-1);
    }

    const onCategoryItem = (key: string) => {
        navigate(`/book-list/${key}`)
    }

    return (
        <div className={styles.category}>
            <NavBar onBack={onBack}>
                分类
            </NavBar>
            <div className={styles.categoryContent}>
                <Grid columns={2} gap={px2rem(16)}>
                    {
                        data?.map((category) => (
                            <Grid.Item span={1} key={category.id} onClick={() => onCategoryItem(category.id)}>
                                <div className={styles.categoryItem}>
                                    <Space gap={px2rem(12)}>
                                        <div className={styles.bookCover}>
                                            <BookCover src={category.bookCover} alt={category.name} style={{'--height':px2rem(51), '--width': px2rem(40)}}/>
                                        </div>
                                        <Space direction="vertical">
                                            <div className={styles.name}>
                                                {category.name}
                                            </div>
                                            <div className={styles.count}>
                                                {category.bookCount}
                                            </div>
                                        </Space>
                                    </Space>
                                </div>
                            </Grid.Item>
                        ))
                    }
                </Grid>
            </div> 
        </div>
    )
}

export default Catefory;