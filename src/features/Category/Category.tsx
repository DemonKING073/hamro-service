import { FileAddOutlined } from "@ant-design/icons";
import { Button, Form, Image, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCategory } from "../../apis/category";
import { getRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import MainTemplate from "../../components/MainTemplate";
import { TopContainer } from "../../components/TopContainer";
import NotificationService from "../../services/NotificationService";
import RegionProps from '../../types/Region'
import CategoryProp from '../../types/Category'
import CButton from "../../components/CButton";
import CreateCategoryForm from "./forms/CreateCategoryForm";

const CategoryProduct = () => {
    const [ addCategoryDrawer, setAddCategoryDrawer ] = useState<boolean>(false)
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

    const { data: categoryData, isLoading: isCategoryDataLoading, refetch: reFetchCategory } = useQuery(['getCategory', currentRegion], () => {
        if(currentRegion) return getCategory(currentRegion.id)
    }, {
        onSuccess: () => {

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
            width:'20%'
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            width:'10%'
        },
        {
            title: 'Region ID',
            dataIndex: 'regionId',
            key: 'regionId',
            width:'10%'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width:'20%'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key:'image',
            width:'10%',
            render: (id: number, record: CategoryProp) => <CategoryImage alt={record.name} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> 
        },
        {
            title: 'Actions',
            key:'action',
            dataIndex:'id',
            width:'25%',
            render: (id: number, record: CategoryProp) =>
            <TableButtonContainer> 
                <CButton onClick={()=>alert('kera')} variant='normal' title='Update' />
                <CButton onClick={()=>alert('kera')} variant='danger'  title='Remove' />
            </TableButtonContainer>

        }
    ]
    const submitProduct = (val: any) => {
        console.log(val)
    }

    return(
        <MainTemplate>
            <CreateCategoryForm onFinish={submitProduct} visible={addCategoryDrawer} onClose={()=> setAddCategoryDrawer(false)} />
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
                <Button style={{marginRight:15}} type='primary' ><FileAddOutlined />Add Sub-Category</Button>
                <Button  type='primary' onClick={()=> setAddCategoryDrawer(true)} ><FileAddOutlined />Add Category</Button>
            </TopContainer>
            <MainContainer>
                <Table pagination={{pageSize:4}}  loading={isCategoryDataLoading} dataSource={categoryData} columns={columns} />
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
const CategoryImage = styled(Image)`
    height: 50px;
    width: 50px;
`
const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
export default CategoryProduct