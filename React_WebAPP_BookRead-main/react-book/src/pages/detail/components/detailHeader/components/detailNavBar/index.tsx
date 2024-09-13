import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { NavBar } from '@/base';
import { useRequest } from '@/hooks/useRequest';
import api from '@/pages/detail/api';
import { IBookInfo } from '@/types/book';

import styles from './index.module.scss';

const DetailNavBar: React.FC = React.memo(() => {
    
    const navigate = useNavigate();
    const id = useParams().id as string;

    const wrapRef = React.useRef<HTMLDivElement>(null);
    const [fixedMode, setFixedMod] = React.useState<boolean>(false);

    const { data } = useRequest<IBookInfo>({url: api.getBook(id)})

    const onBack = () => {
        navigate(-1);
    }

    const onScroll = (e: Event) => {
        // 兼容浏览器，获取滑动距离
        const offsetY =  (e.target as HTMLElement).scrollTop || window.pageYOffset || document.body.scrollTop
        if(offsetY > wrapRef.current!.offsetHeight) {
            setFixedMod(true)
        }else {
            setFixedMod(false)
        }
    }

    React.useEffect(() => {
        window.addEventListener('scroll', onScroll, true);

        return () => {
            window.removeEventListener('scroll', onScroll, true);
        }
    }, []);
    
    return <div className={styles.navBar} ref={wrapRef}>
        <NavBar onBack={onBack} style={{ background: fixedMode ? '#fff' : 'none' }}>
            {fixedMode? data?.title : null}
        </NavBar>
    </div>
})

export default DetailNavBar;