import { PropsWithChildren } from 'react';
import { useMediaQuery } from '../../hooks/use-media-query';

export const WebOnly = ({ children }: PropsWithChildren) => {
    const isMobile = useMediaQuery();

    return isMobile ? null : children;
};
