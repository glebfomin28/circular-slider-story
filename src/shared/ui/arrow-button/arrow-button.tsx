import styles from './arrow-button.module.scss';
import { ArrowIcon } from '@/shared/ui/arrow-icon';
import cn from 'classnames';
import { IArrowIconProps } from '../arrow-icon/arrow-icon';
import { forwardRef } from 'react';

type TVariant = 'slider' | 'history_event';

interface IArrowButtonProps extends Omit<IArrowIconProps, 'color'> {
    variant: TVariant;
    className?: string;
    onClick?: () => void;
}

export const ArrowButton = forwardRef<HTMLButtonElement, IArrowButtonProps>((props, ref) => {
    const { variant, direction, className, onClick } = props;

    return (
        <button ref={ref} className={cn(styles.arrow_button, styles[variant], className)} onClick={onClick}>
            <ArrowIcon direction={direction} color={variant === 'slider' ? 'blue' : 'gray'} />
        </button>
    );
});

ArrowButton.displayName = 'ArrowButton';
