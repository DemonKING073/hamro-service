import { Input } from "antd";
import React, { FC } from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { SearchOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

const Container = styled.div`
    display: flex;
    flex: 1;
    flex-grow: 1,
    height: 100vh;
    background-color: var(--main)
`
const SubContainer = styled.div`
    flex: 80%;
    flexDirection: column;
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
    &:last-child {
        margin-right: 30px;
    }
`
const IconBox = styled.div`
    display: flex;
`

const MainTemplate:FC<any> = ({children}) => {
    return(
        <Container>
            <Sidebar />
            <SubContainer>
                <TopPanel>
                    <SearchBox>
                        <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:45}} placeholder='Search...' />
                    </SearchBox>
                    <IconBox>
                        <IconOutline>
                            <SettingOutlined style={{color: `var(--primary)`,fontSize: 25}} />
                        </IconOutline>
                        <IconOutline>
                            <LogoutOutlined style={{color:`var(--primary)`,fontSize: 25}} />
                        </IconOutline>
                    </IconBox>
                </TopPanel>
                <RouteContents> {children} </RouteContents>
            </SubContainer>
        </Container>
    )
}

export default MainTemplate