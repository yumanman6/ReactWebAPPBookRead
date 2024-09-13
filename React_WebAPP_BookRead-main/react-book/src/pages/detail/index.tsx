import React from "react";
import { useParams } from "react-router-dom";

import { ErrorBlock } from "@/base";
import Loading from "@/components/loading";

import { useRequest } from "@/hooks/useRequest";
import { IBookInfo } from "@/types/book";

import api from "./api";

import DetailContent from "./components/detailContent";
import DetailFooter from "./components/detailFooter";
import DetailHeader from "./components/detailHeader";

const Detail: React.FC = () => {
    const id = useParams().id as string;
    const { data,error } = useRequest<IBookInfo>({url: api.getBook(id)})

    if(error) {
        return <ErrorBlock />
    }

    if(!data) {
        return <Loading />
    }

    return (
        <>
            <DetailHeader />
            <DetailContent />
            <DetailFooter />
        </>
    )
}

export default Detail;