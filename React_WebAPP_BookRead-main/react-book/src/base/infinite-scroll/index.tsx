import React from 'react';
import { SpinnerLoading } from '@/base';

import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import styles from './styles/index.scss';
import useLockFn from '@/hooks/useLockFn';

export interface InfiniteScrollProps {
    // 是否加载更多
    hasMore: boolean;
    // 加载数据方法
    loadMore: () => Promise<void>;
    // 自定义底部样式
    footer?: React.ReactNode;
    children: React.ReactNode;
}

const classPrefix = 'ygm-infinite-scroll';

const InfiniteScroll: React.FC<InfiniteScrollProps> = (props) => {
    const intersectionEleRef = React.useRef<HTMLDivElement>(null);

    const doLoadMore = useLockFn(() => props.loadMore());

    const observerEntry = useIntersectionObserver(intersectionEleRef, {});



    const check = React.useCallback(async () => {
        if(!observerEntry?.isIntersecting) return;
        if(!props.hasMore) return;
    
        doLoadMore();
    }, [doLoadMore,observerEntry?.isIntersecting, props])

    React.useEffect(() => {
        check();
    }, [check])

    return <div className={classPrefix}>
        {props.children}

        <div className={`${classPrefix}-load`}>
            {props.footer && props.footer}
            {props.footer && props.hasMore?<SpinnerLoading size={16}/>:''}

        </div>
    </div>
}

InfiniteScroll.displayName = 'InfiniteScroll';

export default InfiniteScroll;