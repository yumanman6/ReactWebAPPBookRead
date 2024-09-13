import InternalSwiper from '@/base/swiper/swiper';
import SwiperItem from '@/base/swiper/swiper-item';

export type { SwiperProps } from '@/base/swiper/swiper';
export type { SwiperItemProps } from '@/base/swiper/swiper-item';

type InternalSwiperType = typeof InternalSwiper;

export interface SwiperInterface extends InternalSwiperType {
    Item: typeof SwiperItem
}

const Swiper = InternalSwiper as SwiperInterface;

Swiper.Item = SwiperItem;

export default Swiper;