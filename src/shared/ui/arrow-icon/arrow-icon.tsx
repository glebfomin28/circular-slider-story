export interface IArrowIconProps {
    color?: 'blue' | 'gray';
    direction: 'right' | 'left';
}

const colorArrowIcon = {
    blue: '#3877EE',
    gray: '#42567A'
};

export const ArrowIcon = ({ color = 'gray', direction }: IArrowIconProps) => {
    return (
        <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
        >
            <path d="M1 1L6 6L1 11" stroke={colorArrowIcon[color]} strokeWidth="2" />
        </svg>
    );
};
