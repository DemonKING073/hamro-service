import React, { useEffect, useState } from "react"
import MainTemplate from "../../components/MainTemplate"
import styled from "styled-components"
import BaseProductProps from "../../types/BaseProduct"
import RegionProps from '../../types/Region'
import LocalStorageService from "../../services/LocalStorageServices"
import { Button, Drawer, notification, Table } from "antd"
import axios from "axios"
import CButton from "../../components/CButton"
import { FileAddOutlined } from "@ant-design/icons"
import CreateBaseProductForm from "../Region/Forms/CreateBaseProductForm"
const TopContainer = styled.div`
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`
const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`
const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`


const BaseProduct = () => {
    const [ addDrawer, setAddDrawer ] = useState(false)
    const [ workingRecord, setWorkingRecord ] = useState<BaseProductProps | null>()
    const [ token, setToken ] = useState<string | null>()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ baseProducts, setBaseProducts ] = useState<BaseProductProps[]>([])

    useEffect(() => {
        const token = LocalStorageService.getAccessToken()
        setToken(token)
    },[])
    
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
            width:'30%'
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
            key: 'id',
            width:'5%'
        },
        {
            title: 'Category ID',
            dataIndex: 'categoryId',
            key: 'categoryId',
            width:'10%'
        },
        {
            title: 'Actions',
            key:'name',
            width:'30%',
            render: (value: number, record: BaseProductProps) => <TableButtonContainer> 
            <CButton variant='normal' title='Update' />
            <CButton variant='danger' title='Remove' />
            </TableButtonContainer>
        }
    ]
    const fetchBaseProduct = async () => {
        try{
            const resposne = await axios.get('http://localhost:8080/base_product',{
                'headers': {
                    'regionId': `${1}`
                }
            })
            setIsLoading(false)
            setBaseProducts(resposne.data)
        }
        catch(err:any) {
            console.log(err)
            notification.error({message: err.response.data.message })
        }
    }
    const addBaseProduct = async (values: any) => {
        console.log(values)
        try{
            const response = await axios.post('http://localhost:8080/base_product',values,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            notification.success({message:'Base Product Successfully Added!'})
            fetchBaseProduct()
            setAddDrawer(false)
        }
        catch(err: any){
            console.log(err)
            notification.error({message: err.response.data.message })
        }
    }
   
    useEffect(() => {
        setIsLoading(true)
        fetchBaseProduct()
    },[])
    return(
        <MainTemplate>
            <CreateBaseProductForm  visible={addDrawer} onFinish={(value)=>addBaseProduct(value)} onClose={()=>setAddDrawer(false)}  />
            <TopContainer>
                <Button  type='primary' onClick={()=> setAddDrawer(true)}  ><FileAddOutlined />Add Base Product</Button>
            </TopContainer>
            <MainContainer>
                <Table loading={isLoading} pagination={{pageSize:6}} columns={columns} dataSource={baseProducts} />
            </MainContainer>            
        </MainTemplate>
    )
}

export default BaseProduct