import { useState } from 'react';
import { Typography } from '@/shared/ui/typography';
import { WebOnly } from '@/shared/ui/web-only/web-only';
import { CircleEvents, SwiperBlock, CircleEventsControl, YearsRange } from './partials';
import { historyData } from './domain/history-slider.domain';
import styles from './history-slider.module.scss';

const maxIndex = historyData.length - 1;

export const HistorySlider = () => {
    const [activeIndex, setActiveIndex] = useState(maxIndex);
    const [prevIndex, setPrevIndex] = useState(maxIndex);

    const updateIndexes = (index: number) => {
        setActiveIndex(p => {
            setPrevIndex(p);
            return index;
        });
    };

    const handleChangeActiveIndex = (index: number) => {
        if (index < 0) {
            updateIndexes(maxIndex);
        } else if (index > maxIndex) {
            updateIndexes(0);
        } else {
            updateIndexes(index);
        }
    };

    return (
        <div className={styles.wrapper}>
            <WebOnly>
                <span className={styles.line_v} />
            </WebOnly>
            <span className={styles.line_h} />
            <Typography className={styles.title} tag="h1" size="56-20" weight="bold">
                Исторические даты
            </Typography>
            <WebOnly>
                <CircleEvents
                    activeIndex={activeIndex}
                    activeName={historyData[activeIndex].name}
                    maxIndex={maxIndex}
                    handleChangeActiveIndex={handleChangeActiveIndex}
                />
            </WebOnly>
            <YearsRange
                yearRange={historyData[activeIndex].yearRange}
                prevYearRange={historyData[prevIndex].yearRange}
            />
            <div className={styles.footer}>
                <CircleEventsControl
                    activeIndex={activeIndex}
                    maxIndex={maxIndex}
                    handleChangeActiveIndex={handleChangeActiveIndex}
                />
                <SwiperBlock key={activeIndex} list={historyData[activeIndex].eventList} />
            </div>
        </div>
    );
};
