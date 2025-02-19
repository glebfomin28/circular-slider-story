import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames';
import { Navigation, Pagination } from 'swiper/modules';
import { Typography } from '@/shared/ui/typography';
import { useMediaQuery } from '@/shared/hooks/use-media-query';
import { ArrowButton } from '@/shared/ui/arrow-button';
import { WebOnly } from '@/shared/ui/web-only/web-only';
import { IEventListItem } from '../../domain/history-slider.domain';
import styles from './swiper-block.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ISwiperBlockProps {
    list: IEventListItem[];
}

export const SwiperBlock = ({ list }: ISwiperBlockProps) => {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const isMobile = useMediaQuery();

    return (
        <div className={styles.swiper_block}>
            <WebOnly>
                <ArrowButton
                    ref={prevRef}
                    className={cn(styles.swiper_nav, styles.swiper_nav_prev, {
                        [styles.hidden]: isBeginning
                    })}
                    direction="left"
                    variant="slider"
                />

                <ArrowButton
                    ref={nextRef}
                    className={cn(styles.swiper_nav, styles.swiper_nav_next, {
                        [styles.hidden]: isEnd
                    })}
                    direction="right"
                    variant="slider"
                />
            </WebOnly>

            <Swiper
                className={styles.swiper}
                slidesPerView={isMobile ? 1.6 : 3}
                spaceBetween={isMobile ? 8 : 80}
                modules={[Navigation, Pagination]}
                pagination={isMobile ? { clickable: true } : undefined}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current
                }}
                onBeforeInit={swiper => {
                    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                onSlideChange={swiper => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                    setActiveIndex(swiper.activeIndex);
                }}
            >
                {list?.map((item, index) => (
                    <SwiperSlide
                        key={item.id}
                        className={cn({
                            [styles.inactive]: isMobile && list.length - 1 !== index && index !== activeIndex
                        })}
                    >
                        <SwiperSlideItem title={item.year} text={item.text} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

const SwiperSlideItem = ({ text, title }: { title: number | string; text: string }) => {
    return (
        <div className={styles.swiper_slide_item}>
            <Typography size="25-16" color="blue" fontFamily="bebas_neue">
                {title}
            </Typography>
            <Typography size="20-14">{text}</Typography>
        </div>
    );
};
