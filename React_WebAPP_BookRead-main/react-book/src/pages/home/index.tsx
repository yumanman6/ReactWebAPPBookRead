import React from 'react';
import Header from './components/header';
import Navbar from './components/navbar';
import Loading from '@/components/loading';
import styles from '@/pages/home/index.module.scss';
import { useRequest } from '@/hooks/useRequest';
import api from './api';

// import { Space } from '@taoyage/react-mobile-ui';
import { px2rem } from '@/utils/unit';
import { IHomeData } from '@/pages/home/types';
// import { Swiper } from '@taoyage/react-mobile-ui';
import { ErrorBlock, Swiper, Space, Image  } from '@/base';
import Popular from './components/popular';
import Recommend from './components/recommend';
import LimitedRead from './components/limitedRead';
import Ranking from './components/ranking';


const Home: React.FC = () => {
  const { data, error } = useRequest<IHomeData>({ url: api.getHomeData });

  if (error) {
    return <ErrorBlock />;
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={styles.home}>
      <Header />
      <Space direction="vertical" gap={px2rem(20)}>
        <Swiper autoplay loop style={{ '--border-radius': '12px' }}>
          {data!.banner.map((item, index) => {
            return (
              <Swiper.Item key={index}>
                {/* <img src={item.src} alt={item.alt} height={'100%'} width={'100%'} /> */}
                <Image src={item.src} alt={item.alt}/>
              </Swiper.Item>
            );
          })}
        </Swiper>
        <Navbar />
        <Popular />
        <Recommend />
        <LimitedRead />
        <Ranking />
      </Space>
    </div>
  );
};

export default Home;
