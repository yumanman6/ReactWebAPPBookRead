import React from 'react';
import cx from 'classnames';

import './styles/swiper-page-indicator.scss';

export interface SwiperPageIndicatorProps {
    current: number; //当前轮播图下标
    total: number; //轮播图数量
    indicatorClassName?: string;
}

const classPrefix = 'ygm-swiper-page-indicator';

const SwiperPageIndicator:React.FC<SwiperPageIndicatorProps> = props => {
    
    const dots:React.ReactElement[] = React.useMemo(() => {
        // 预防空白，判断显示图片，切换样式
        return Array(props.total).fill(0).map((_, index) => (
            <div 
                key={index}
                // cx-classnames:用来有条件的将不同的 classNames 联合在一起
                className={cx(`${classPrefix}-dot`, {
                    [`${classPrefix}-active`]: props.current === index
                } )}
            />
        ))
    }, [props]);

    return <div className={classPrefix}>{dots}</div>
}

export default SwiperPageIndicator;

SwiperPageIndicator.displayName = 'SwiperPageIndicator';