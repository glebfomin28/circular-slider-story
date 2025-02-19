import { Typography } from '@/shared/ui/typography';
import { ArrowButton } from '@/shared/ui/arrow-button';
import styles from './circle-events-control.module.scss';

interface ICircleControlProps {
    activeIndex: number;
    maxIndex: number;
    handleChangeActiveIndex: (i: number) => void;
}

export const CircleEventsControl = ({ maxIndex, activeIndex, handleChangeActiveIndex }: ICircleControlProps) => {
    const next = () => {
        handleChangeActiveIndex(activeIndex + 1);
    };

    const prev = () => {
        handleChangeActiveIndex(activeIndex - 1);
    };

    return (
        <div className={styles.circle_control_wrapper}>
            <Typography tag="span" size="14" isSelect={false}>{`0${activeIndex + 1}/0${maxIndex + 1}`}</Typography>
            <div>
                <ArrowButton direction="left" variant="history_event" onClick={prev} />
                <ArrowButton direction="right" variant="history_event" onClick={next} />
            </div>
        </div>
    );
};
