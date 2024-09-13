import React, { Children, useRef } from 'react';

import SwiperItem from '@/base/swiper/swiper-item';

import './styles/swiper.scss';
import SwiperPageIndicator from './swiper-page-indicator';
import { moduls } from './utils';

export interface SwiperProps {
  // 是否循环播放
  loop?: boolean;
  // 是否自动播放
  autoplay?: boolean;
  //   轮播间隔时间
  autoplayInterval?: number;
  // 默认显示
  defaultIndex?: number;
  //   显示原点
  showIndicator?: boolean;
  indicatorClassName?: string;
  children: React.ReactElement | React.ReactElement[];
  style?: React.CSSProperties & Partial<Record<'--height' | '--width' | '--border-radius' | '--track-padding', string>>;
}

const classPrefix = 'ygm-swiper';

const Swiper: React.FC<SwiperProps> = (props) => {
  // 轮播图页面index记录
  const [currentIndex, setCurrentIndex] = React.useState<number>(props.defaultIndex || 0);

  const [dragging, setDragging] = React.useState<boolean>(false);

  //   开始距离
  const startRef = React.useRef<number>(0);
  //   滑动比例
  const slideRatioRef = React.useRef<number>(0);
  //   宽度
  const trackRef = React.useRef<HTMLDivElement>(null);
  const autoPlaying = React.useRef<boolean>(false);
  const intervalRef = React.useRef<number>(0);

  //   切换图片
  const getFinalPosition = (index: number) => {
    let finalPosition = -currentIndex * 100 + index * 100;

    if (!props.loop) return finalPosition;

    const totalWidth = count * 100;
    // 无限轮播，当前图的前后平均分配轮播图数量
    const flagWidth = totalWidth / 2;
    // 1 2 3 4 =》 3 4 1 2
    // 4 ===》 300， flagWidth = 200
    // (300 + 200) % 400 = 100 , 100 - flagWidth ===> -100(就是第一张图)

    finalPosition = moduls(finalPosition + flagWidth, totalWidth) - flagWidth;

    return finalPosition;
  };

  const getTransition = (position: number) => {
    if (dragging) {
      return '';
    }else if(autoPlaying.current) {
        if(position === -100 || position === 0) {
            return 'transform 0.3s ease-out';
        }else {
            return '';
        }
    }
    // 处理闪影
    else if (position < -100) {
      return '';
    }

    return 'transform 0.3s ease-out';
  };

  //   验证传入的对象是否是swiperItem
  const { validChildren, count } = React.useMemo(() => {
    let count = 0;
    const validChildren = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return null;
      if (child.type !== SwiperItem) {
        console.warn('传入的元素必须是SwiperItem');
      }

      count++;
      return child;
    });
    return { validChildren, count };
  }, [props]);

  const renderSwiperItem = () => {
    return (
      <div className={`${classPrefix}-track-inner`}>
        {React.Children.map(validChildren, (child, index) => {
          const position = getFinalPosition(index);

          return (
            <div
              className={`${classPrefix}-slide`}
              style={{
                left: `-${index * 100}%`,
                transform: `translate3d(${position}%,0,0)`,
                transition: getTransition(position),
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  };

  //   计算滑动距离/页面宽度
  const getSlideRatio = (diff: number) => {
    const element = trackRef.current;
    if (!element) return 0;

    return diff / element.offsetWidth;
  };

  //   滑动事件监听
  const onTouchMove = (e: TouchEvent) => {
    // 结束距离
    const currentX = e.changedTouches[0].clientX;

    const diff = startRef.current - currentX; //开始距离与结束距离的差值
    slideRatioRef.current = getSlideRatio(diff); //滑动比例

    let position = currentIndex + slideRatioRef.current;

    // 当不是循环播放的时候，第一张和最后一张无法朝边界值移动
    if (!props.loop) {
      position = bundIndex(position);
    }

    setCurrentIndex(position);
  };

  const bundIndex = React.useCallback(
    (currentIndex: number) => {
      let min = 0;
      let max = count - 1;

      // 限制边界
      let ret = currentIndex;
      ret = Math.max(currentIndex, min);
      ret = Math.min(ret, max);
      return ret;
    },
    [count]
  );

  // 滑动
  const swipeTo = React.useCallback(
    (index: number) => {
      const targetIndex = props.loop ? moduls(index, count) : bundIndex(index);
      setCurrentIndex(targetIndex);
    },
    [bundIndex, count, props.loop]
  );

  const swipeNext = React.useCallback(() => {
    swipeTo(currentIndex + 1);
  }, [swipeTo, currentIndex]);

  //   结束滑动监听
  const onTouchEnd = () => {
    const index = Math.round(slideRatioRef.current); //按滑动比例取整
    slideRatioRef.current = 0;

    const position = currentIndex + index;
    swipeTo(position);
    setDragging(false);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };

  //   触碰事件
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startRef.current = e.changedTouches[0].clientX;
    setDragging(true);
    // 拖动的自动切换进行暂停
    clearInterval(intervalRef.current);
    autoPlaying.current = false;

    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  };

  React.useEffect(() => {
    if (!props.autoplay || dragging) return;

    intervalRef.current = window.setInterval(() => {
      autoPlaying.current = true;
      swipeNext();
    }, props.autoplayInterval);

    return () => {
      // 拖动的自动切换进行暂停
      clearInterval(intervalRef.current);
    };
  }, [dragging, props.autoplayInterval, props.autoplay, swipeNext]);

  if (count === 0 || !validChildren) {
    console.warn('传入的元素必须是SwiperItem');
    return null;
  }

  return (
    <div className={classPrefix} style={props.style}>
      <div className={`${classPrefix}-track`} onTouchStart={onTouchStart} ref={trackRef}>
        {renderSwiperItem()}
      </div>
      {props.showIndicator && (
        <div className={`${classPrefix}-indicator`}>
          <SwiperPageIndicator
            total={count}
            current={slideRatioRef.current > 0 ? Math.floor(currentIndex) : Math.ceil(currentIndex)}
            indicatorClassName={props.indicatorClassName}
          />
        </div>
      )}
    </div>
  );
};

export default Swiper;

Swiper.defaultProps = {
  autoplay: false,
  defaultIndex: 0,
  showIndicator: true,
  loop: false,
  autoplayInterval: 3000,
};

Swiper.displayName = 'Swiper';
