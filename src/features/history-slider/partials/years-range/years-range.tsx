import CountUp from 'react-countup';
import { Typography } from '@/shared/ui/typography';
import styles from './years-range.module.scss';

interface IYearsRangeProps {
    yearRange: [number, number];
    prevYearRange: [number, number];
}

export const YearsRange = ({ yearRange, prevYearRange }: IYearsRangeProps) => {
    return (
        <div className={styles.year_range}>
            {yearRange?.map((year, index) => {
                return (
                    <Typography
                        key={index}
                        size="200-56"
                        weight="bold"
                        color={index ? 'pink' : 'violet'}
                        isSelect={false}
                    >
                        <CountUp start={prevYearRange[index]} end={year} separator="" />
                    </Typography>
                );
            })}
        </div>
    );
};
