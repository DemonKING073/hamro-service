import { Input, notification } from "antd";
import React, { FC } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { SearchOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import LocalStorageService from "../services/LocalStorageServices";
import { useNavigate } from "react-router";
// import ScrollBarWraper from "./ScrollBarWraper";

const MainTemplate:FC = ({children}) => {
    const navigate = useNavigate()
    const logout = () => {
        LocalStorageService.clearTokens()
        notification.success({message:'Logged Out Successfully!'})
        navigate('/login')
    }

    return(
        <Container>
            <Sidebar />
            <SubContainer>
                <TopPanel>
                    <SearchBox>
                        <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:45}} placeholder='Search...' />
                    </SearchBox>
                    <IconBox>
                        <IconOutline onClick={() => alert('fuck you')}>
                            <SettingOutlined style={{color: `var(--primary)`,fontSize: 25}} />
                        </IconOutline>
                        <IconOutline onClick={logout}>
                            <LogoutOutlined style={{color:`var(--primary)`,fontSize: 25}} />
                        </IconOutline>
                    </IconBox>
                </TopPanel>
                <RouteContents> {children} </RouteContents>
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-grow: 1;
    height: 100vh;
    background-color: var(--main)
`
const SubContainer = styled.div`
    flex: 80%;
    flex-direction: column;
    height: 100vh;
`
const TopPanel = styled.div`
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const RouteContents = styled.div`
    background-color: white;
    height: 84%;
    margin-right: 20px;
    border-radius: 20px;
`
const SearchBox = styled.div`
    width: 350px;
`
const IconOutline = styled.div`
    height: 40px;
    width: 40px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;    
    &:last-child {
        margin-right: 30px;
    }
`
const IconBox = styled.div`
    display: flex;
`

export default MainTemplate