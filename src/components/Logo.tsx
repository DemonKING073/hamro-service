import React from "react";
import styled from "styled-components";
import { Image } from 'antd'
import HLogo from '../assets/logo.png'

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 14px;
`

const SLogo = styled(Image)`
    height: 100px;
    width: 100px;
`

export const Logo = () => {
    return(
        <LogoContainer>
            <SLogo preview={false} alt='logo' src={HLogo} />
        </LogoContainer>
    )
}