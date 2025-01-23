import Head from 'next/head';
import React, { FC } from 'react'
import Favicon from "@root/public/favicon.ico"
interface ISharedMetadata {
    title: string;
    favicon?: string
}


export const SharedMetadata: FC<ISharedMetadata> = ({ favicon, title }) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="shortcut icon" href={favicon ?? Favicon.src} type="image/x-icon" />
            <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
    )
}
