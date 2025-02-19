import { CSSProperties, ReactNode } from 'react';
import cn from 'classnames';
import styles from './typography.module.scss';

type TTagType = 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'p';
type TFontFamilyType = 'bebas_neue' | 'pt_sans';

export type TextColorType =
    | 'gray' // #42567A
    | 'blue' // #3877EE
    | 'pink'
    | 'violet';

type TWeightType = 'bold' | 'thin';

type TSizeType = '56-20' | '25-16' | '20-14' | '14' | '200-56';

type TAlignType = 'left' | 'center' | 'right';

export interface ITypographyProps {
    children: ReactNode;
    className?: string;
    tag?: TTagType;
    fontFamily?: TFontFamilyType;
    color?: TextColorType;
    opacity?: boolean;
    size?: TSizeType;
    weight?: TWeightType;
    align?: TAlignType;
    style?: CSSProperties;
    isSelect?: boolean;
    onClick?: () => void;
}

const fontSizeClasses: Record<TSizeType, string> = {
    '200-56': styles.size_200_56,
    '56-20': styles.size_56_20,
    '25-16': styles.size_25_16,
    '20-14': styles.size_20_14,
    '14': styles.size_14
};

export const Typography = (props: ITypographyProps) => {
    const {
        className,
        tag = 'div',
        children,
        fontFamily = 'pt_sans',
        color = 'gray',
        opacity,
        size = '14',
        weight = '400',
        align = 'left',
        isSelect = true,
        style,
        onClick
    } = props;

    const Component = tag;

    const classes = [
        styles.text,
        styles[fontFamily],
        styles[color],
        fontSizeClasses[size],
        styles[weight],
        styles[align],
        { [styles.opacity]: opacity },
        { [styles.select]: !isSelect },
        className
    ];

    return (
        <Component className={cn(classes)} style={style} onClick={onClick}>
            {children}
        </Component>
    );
};
