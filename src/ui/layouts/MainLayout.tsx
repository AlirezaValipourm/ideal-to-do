import React, { FC, ReactNode } from 'react'
import { MainLayoutContainer } from '../components/common/MainLayoutContainer'

interface IMainLayoutProps {
    children: ReactNode
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    return (
        <MainLayoutContainer>{children}</MainLayoutContainer>
    )
}