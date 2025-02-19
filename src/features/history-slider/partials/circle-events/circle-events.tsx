import { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Typography } from '@/shared/ui/typography';
import styles from './circle-events.module.scss';

interface ICircleEventsProps {
    activeIndex: number;
    activeName: string;
    maxIndex: number;
    handleChangeActiveIndex: (i: number) => void;
}

export const CircleEvents = ({ activeIndex, maxIndex, activeName, handleChangeActiveIndex }: ICircleEventsProps) => {
    const items = Array.from({ length: maxIndex + 1 }, (_, index) => index + 1);
    const N = items.length;
    const circleRadius = 265;
    const activeAngle = (360 / N) * (N - 1);

    const [rotation, setRotation] = useState(0);

    const handleClick = (index: number) => {
        handleChangeActiveIndex(index);
    };

    const rotateCircle = useCallback(
        (index: number) => {
            const baseAngle = (360 / N) * index;
            const targetRotation = activeAngle - baseAngle;
            setRotation(prevRotation => {
                let delta = targetRotation - prevRotation;
                while (delta > 180) delta -= 360;
                while (delta <= -180) delta += 360;
                return prevRotation + delta;
            });
        },
        [N, activeAngle]
    );

    useEffect(() => {
        rotateCircle(activeIndex);
    }, [rotateCircle, activeIndex]);

    return (
        <div className={styles.circle}>
            <Typography key={activeIndex} className={styles.active_name} weight="bold" size="20-14" isSelect={false}>
                {activeName}
            </Typography>
            {items.map((item, index) => {
                const baseAngle = (360 / N) * index;
                const effectiveAngle = baseAngle + rotation;
                return (
                    <div
                        key={item}
                        className={cn(styles.circle_item, {
                            [styles.active]: activeIndex === index
                        })}
                        style={{
                            transform: `
                               translate(-50%, -50%)
                               rotate(${effectiveAngle}deg)
                               translate(${circleRadius}px)
                               rotate(${-effectiveAngle}deg)`
                        }}
                        onClick={() => handleClick(index)}
                    >
                        <Typography size="20-14" isSelect={false}>
                            {item}
                        </Typography>
                    </div>
                );
            })}
        </div>
    );
};
