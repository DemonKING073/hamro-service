import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
import { Image } from "antd";
import Avatar from '../assets/user.png'
import { NavLink } from 'react-router-dom'
import SidebarItem from "./SideBarItem";
import { AreaChartOutlined, InboxOutlined, CarOutlined, GlobalOutlined } from '@ant-design/icons'


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
const Nav = styled.nav`
    display: flex;
    flex-direction: column;
`

export const Sidebar = () => {
    return(
        <Container>
            <div>
                <Logo />
            </div>
            <Nav>
                <NavLink to='/'  >
                    <SidebarItem Icon={AreaChartOutlined} text='Dashboard' />
                </NavLink>
                <NavLink to='/region'  >
                    <SidebarItem Icon={GlobalOutlined} text='Region' />
                </NavLink>
                <NavLink to='/'  >
                    <SidebarItem Icon={AreaChartOutlined} text='Dashboard' />
                </NavLink>
                <NavLink to='/products'  >
                    <SidebarItem Icon={InboxOutlined} text='Products' />
                </NavLink>
                <NavLink to='/orders'  >
                    <SidebarItem Icon={CarOutlined} text='Orders' />
                </NavLink>
                <NavLink to='/orders'  >
                    <SidebarItem Icon={CarOutlined} text='Orders' />
                </NavLink>
            </Nav>
        </Container>
    )
}

