import React from "react";
import styled from "styled-components";
import MainTemplate from "../components/MainTemplate";
import { Menu, Dropdown, Button, Select, Input } from 'antd'
import { FileAddOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'

const { Option } = Select;


const TopContainer = styled.div`
    display: flex;
    padding: 16px;
    justify-content: flex-end;
    align-items: center;
`
const SettingContainer = styled.div`
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SubSettingContainer = styled.div`
    display: flex;
    align-items: center;
`

const SortContainer = styled.div`
    display: flex;
    align-items: center;
`
const DarkCircle = styled.div`
    background: #636363;
    padding: 8px 14px;
    border-radius: 50%;
    margin-left: 10px;
    color: white;
`
const SortButton = styled.span`
    margin-left: 18px;
    background: #CCCCCC;
    padding: 5px 16px;
    border-radius: 10px;
`

const sort = (
    <Menu>
      <Menu.Item>
          Newest
      </Menu.Item>
      <Menu.Item>
          Oldest
      </Menu.Item>
      <Menu.Item>
          Administrative wise
      </Menu.Item>
    </Menu>
  );

const Region = () => {
    return(
        <MainTemplate>
            <TopContainer>
                <Select defaultValue='alltime' style={{marginRight:20}} >
                    <Option value='alltime'>All Time</Option>
                    <Option value='15days'>15 Days</Option>
                    <Option value='1month'>1 Month</Option>
                    <Option value='6month'>6 Months</Option>
                </Select>
                <Select defaultValue='anyowner' style={{marginRight:20}} >
                    <Option value='anyowner'>Any Owner</Option>
                    <Option value='admin'>Admin</Option>
                    <Option value='regionaladmin'>Regional Admin</Option>
                    <Option value='superadmin'>Super Admin</Option>
                </Select>
                <Button style={{backgroundColor:'var(--primary)', color: 'white',borderRadius:6}}  ><FileAddOutlined />Add Region</Button>
            </TopContainer>
            <SettingContainer>
                <SortContainer>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Leads</span>
                        <DarkCircle>{1}</DarkCircle>
                    </div>
                    <Dropdown overlay={sort}>
                        <SortButton> Sort</SortButton>
                    </Dropdown>
                </SortContainer>
                <SubSettingContainer>
                    <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:35}} placeholder='Search...' />
                    <SettingOutlined style={{fontSize: 20, marginLeft:10}} />
                </SubSettingContainer>
            </SettingContainer>

        </MainTemplate>
    )
}


export default Region