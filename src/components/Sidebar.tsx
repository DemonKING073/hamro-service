import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Logo } from "./Logo";
// import Avatar from '../assets/user.png'
import { NavLink } from 'react-router-dom'
import SidebarItem from "./SideBarItem";
import { AreaChartOutlined, InboxOutlined, CarOutlined, GlobalOutlined, UnorderedListOutlined, HomeOutlined,DropboxOutlined } from '@ant-design/icons'
import LocalStorageService from "../services/LocalStorageServices";
import { UserContext } from "../context/UserContext";
import { Form, Select } from "antd";
import { useQuery } from "react-query";
import { getRegion } from "../apis/region";
import axiosCheckError from "../axiosCheckError";
import NotificationService from "../services/NotificationService";
import RegionProps from '../types/Region'


export const Sidebar = () => {
    const [form] = Form.useForm()
    const { Option } = Select;
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()

    const userContext = useContext(UserContext)


    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) {
                userContext?.setWorkingRegion(regionData[0])
                setCurrentRegion(regionData[0])
            }
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    console.log('yo chai working region context bata', userContext?.workingRegion)

    const Roles = LocalStorageService.getRoles()
    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
        if(newRegion) userContext?.setWorkingRegion(newRegion)
    }
    useEffect(() => {
        form.resetFields()
    },[form,currentRegion])
    console.log('yo context wala roles', userContext?.roles)
    return(
        <Container>
            <div>
                <Logo />
            </div>
            <TitleContainer>
                <Title>[ {Roles&& Roles[0].name==='SuperAdmin'?'Super Admin':'Regional Admin'} ]</Title>
            </TitleContainer>
            <DropDownContainer>
                <Form layout='inline' form={form}  initialValues={{regionId:currentRegion?.id}}>
                    <Form.Item
                        name='regionId'
                    >
                    <Select onChange={handleRegionChange} >
                        {regionData?.map((item: RegionProps) => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                </Form>
            </DropDownContainer>
            <Nav>
                <NavLink to='/'  >
                    <SidebarItem Icon={AreaChartOutlined} text='Dashboard' />
                </NavLink>
                {
                    Roles&& Roles[0].name==='SuperAdmin'?<>
                    <NavLink to='/region'  >
                        <SidebarItem Icon={GlobalOutlined} text='Region' />
                    </NavLink>
                    <NavLink to='/baseproducts'  >
                        <SidebarItem Icon={InboxOutlined} text='Base Product' />
                    </NavLink>
                    </>:null
                }
                <NavLink to='/category'  >
                    <SidebarItem Icon={UnorderedListOutlined} text='Category' />
                </NavLink>
                <NavLink to='/vendor'  >
                    <SidebarItem Icon={HomeOutlined} text='Vendor' />
                </NavLink>
                <NavLink to='/product'  >
                    <SidebarItem Icon={DropboxOutlined} text='product' />
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
const TitleContainer = styled.div`
    padding: 10px;
    padding-bottom: 0px;
    // background: red;
`
const Title = styled.h3`
    text-align: center;
    margin: 0;
    font-weight: bold;
    color: var(--primary);
    font-size: 14px;
`
const DropDownContainer = styled.div`
    display: flex;
    height: 45px;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
`


