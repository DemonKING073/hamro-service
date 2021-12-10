import { FileAddOutlined } from "@ant-design/icons";
import { Button, Form, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import MainTemplate from "../../components/MainTemplate";
import { TopContainer } from "../../components/TopContainer";
import NotificationService from "../../services/NotificationService";
import RegionProps from '../../types/Region'


const CategoryProduct = () => {

    const [form] = Form.useForm()
    const { Option } = Select;
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width:'5%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'25%'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width:'20%'
        },
        {
            title: 'Region ID',
            dataIndex: 'regionId',
            key: 'regionId',
            width:'10%'
        },
        {
            title: 'Category ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width:'15%'
        },
        {
            title: 'Actions',
            key:'action',
            width:'25%',
        }
    ]

    return(
        <MainTemplate>
            <TopContainer>
            <OptionContainer>
                    <Form layout='inline' form={form}  initialValues={{regionId:currentRegion?.id}}>
                    <Form.Item
                        name='regionId'
                        label='Region'
                    >
                    <Select onChange={handleRegionChange} >
                        {regionData?.map((item: RegionProps) => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                    </Form>
                </OptionContainer>
                <Button  type='primary'   ><FileAddOutlined />Add Category</Button>
            </TopContainer>
            <MainContainer>
                <Table columns={columns} />
            </MainContainer>
        </MainTemplate>
    )
}


const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`
const OptionContainer = styled.div`
    margin-right: 15px;
`
export default CategoryProduct