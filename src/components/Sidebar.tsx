import React from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
// import Avatar from '../assets/user.png'
import { NavLink } from 'react-router-dom'
import SidebarItem from "./SideBarItem";
import { AreaChartOutlined, InboxOutlined, CarOutlined, GlobalOutlined, TableOutlined } from '@ant-design/icons'



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
                <NavLink to='/baseproducts'  >
                    <SidebarItem Icon={InboxOutlined} text='Base Product' />
                </NavLink>
                <NavLink to='/category'  >
                    <SidebarItem Icon={TableOutlined} text='Category' />
                </NavLink>
                <NavLink to='/orders'  >
                    <SidebarItem Icon={CarOutlined} text='Orders' />
                </NavLink>
            </Nav>
        </Container>
    )
}

const Container = styled.div`
    background-color: var(--main);
    display: flex;
    flex: 20%;
    height: 100vh;
    flex-direction: column;
    padding-top: 20px;
`
const Nav = styled.nav`
    display: flex;
    flex-direction: column;
`

