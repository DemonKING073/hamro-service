import { FileAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { getProducts, getProductsFeatured, getProductsPopular } from "../../apis/product";
import { getRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import MainTemplate from "../../components/MainTemplate";
import { TopContainer } from "../../components/TopContainer";
import NotificationService from "../../services/NotificationService";
import RegionProps from '../../types/Region'


const Product = () => {
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()    
    const { Option } = Select;
    const [form] = Form.useForm()
    const [ toogleFeatured, setToogleFeatured ] = useState<boolean>(false)
    const [ tooglePopolar, setTooglePopular ] = useState<boolean>(false)

    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[1])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    console.log('yo chai featured', toogleFeatured)
    console.log('yo chai polular', tooglePopolar)


    const { data:productsData, isLoading: isProductLoading, refetch: refetchProducts } = useQuery(['fetchProduct', currentRegion, toogleFeatured, tooglePopolar], () => {
        if( currentRegion && !toogleFeatured && !tooglePopolar) return getProducts(currentRegion.id)
        else if( currentRegion && toogleFeatured && !tooglePopolar ) return getProductsFeatured(currentRegion.id)
        else if( currentRegion && !toogleFeatured && !tooglePopolar ) return getProductsPopular(currentRegion.id)
    })
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            ellipsis: {
                showTitle: false,
            },
            render: (name: string) => (
                <Tooltip placement='topLeft' title={name}>
                    {name}
                </Tooltip>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width:'15%',
            ellipsis: {
                showTitle: false,
            },
            render: (description:string) => (
                <Tooltip placement='topLeft' title={description}>
                    {description}
                </Tooltip>
            )
        },
        {
            title: 'Keywords',
            dataIndex: 'keywords',
            key: 'keywords',
            width:'10%',
            ellipsis: {
                showTitle: false,
            },
            render: (keywords:string) => (
                <Tooltip placement='topLeft' title={keywords}>
                    {keywords}
                </Tooltip>
            )
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            width:'10%',
            ellipsis: {
                showTitle: false,
            },
            render: (unit:string) => (
                <Tooltip placement='topLeft' title={unit}>
                    {unit}
                </Tooltip>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width:'10%'
        },
        {
            title: 'Base Id',
            dataIndex: 'baseProductId',
            key: 'baseProductId',
            width:'10%'
        },
        {
            title: 'Vendor Id',
            dataIndex: 'vendorId',
            key: 'vendorId',
            width:'9%'
        },
        {
            title: 'Actions',
            key:'action',
            width:'25%',
        }
    ]
    
    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])

    const handleFeatured = (e: any) => {
        console.log(e.target.checked)
        setToogleFeatured(e.target.checked)
    }
    const handlePopular = (e: any) => {
        console.log(e.target.checked)
        setTooglePopular(e.target.checked)
    }
    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
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
                <Checkbox disabled={tooglePopolar?true:false} onChange={handleFeatured} style={{marginRight:15}}>Featured</Checkbox>
                <Checkbox disabled={toogleFeatured?true:false} onChange={handlePopular} style={{marginRight:15}}>Popular</Checkbox>
                <Button  type='primary' onClick={()=> alert('kera')}  ><FileAddOutlined />Add Product</Button>
            </TopContainer>
            <MainContainer>
                <Table  pagination={{pageSize:6,showQuickJumper:false,showSizeChanger:false}} columns={columns} dataSource={productsData} />
            </MainContainer>
        </MainTemplate>
    )
}

const OptionContainer = styled.div`
    margin-right: 15px;
`

const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`

export default Product