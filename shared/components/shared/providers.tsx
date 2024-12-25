'use client';

import { SessionProvider } from 'next-auth/react';
import NextTopLoader from 'nextjs-toploader';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Toaster />
            <SessionProvider>{children}</SessionProvider>
            <NextTopLoader />
        </>
    );
};
