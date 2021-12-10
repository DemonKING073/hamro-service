import React, { FC } from "react";
import styled from "styled-components";

interface Prop {
    children: React.ReactNode
}

export const TopContainer:FC<Prop> = ({children}) => {
    return(
        <TopContainerStyle>
            {children}
        </TopContainerStyle>
    )
}

const TopContainerStyle = styled.div`
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`