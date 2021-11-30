import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Image } from "antd";
import Avatar from '../assets/user.png'

const Title = styled.h1`
    text-align: center;
    font-weight: bold;
    font-size: 17px;
    color: #464646;
    margin-top: 10px;
`
const SubTitle = styled.h4`
    text-align: center;
    font-weight: lighter;
    color: red;
`

const Container = styled.div`
    background-color: var(--main);
    display: flex;
    flex: 20%;
    height: 100vh;
    flex-direction: column;
    padding-top: 20px;
`
const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const UserImage = styled(Image)`
    height: 60px;
    width: 60px;
`

export const Sidebar = () => {
    return(
        <Container>
            <div>
                <Logo />
                {/* <ProfileContainer>
                <UserImage alt='user' src={Avatar} />
                </ProfileContainer> */}
                <Title>Hamro Service Admin</Title>
                {/* <SubTitle>Hamro Service Admin</SubTitle> */}
            </div>
            
        </Container>
    )
}

