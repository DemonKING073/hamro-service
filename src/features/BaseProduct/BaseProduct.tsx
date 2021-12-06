import React, { useEffect, useState } from "react"
import MainTemplate from "../../components/MainTemplate"
import styled from "styled-components"
import BaseProductProps from "../../types/BaseProduct"
import RegionProps from '../../types/Region'
import LocalStorageService from "../../services/LocalStorageServices"
import { Button, Drawer, notification, Select, Table, Form } from "antd"
import axios from "axios"
import CButton from "../../components/CButton"
import { FileAddOutlined } from "@ant-design/icons"
import CreateBaseProductForm from "./forms/CreateBaseProductForm"
import { createBaseProducts, getBaseProducts } from "../../apis/baseProduct"
import ApiError from "../../types/ApiError"
import { useQuery, useMutation } from 'react-query'

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
const OptionContainer = styled.div`
    margin-right: 15px;
`

const { Option } = Select;


const BaseProduct = () => {
    const [ addDrawer, setAddDrawer ] = useState(false)
    const [regionData, setRegionData] = useState<RegionProps[]>([])
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ baseProducts, setBaseProducts ] = useState<BaseProductProps[]>([])

    const { isLoading: isBaseProuductsLoading, error, data, refetch: refetchBaseProducts } = useQuery('get/base_product', getBaseProducts)

    const { mutateAsync: mutateBaseProduct} = useMutation(createBaseProducts, {
        onSuccess: () => {
            refetchBaseProducts()
        },
        onError: (err) => {
            if(axios.isAxiosError(err)) {

            }
        }
    })

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
            key: 'id',
            width:'10%'
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
            setIsLoading(true)
            const resposne = await axios.get('http://localhost:8080/base_product',{
                'headers': {
                    'regionId': `${currentRegion?.id}`
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
  
    useEffect(()=> {
        setIsLoading(true)
        axios.get('http://localhost:8080/region')
        .then((res) => {
            setRegionData(res.data)
            setCurrentRegion(res.data[0])
            form.resetFields()
            return res.data
        })
        .then((data:any)=>{
            return axios.get(`http://localhost:8080/base_product`,{
                headers:{
                    'regionId': `${data[0].id}`
                }
            })
        })
        .then((res: any)=> {
            setBaseProducts(res.data)
            setIsLoading(false)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(()=>{
        if(currentRegion) fetchBaseProduct()
    },[currentRegion])
   
    const [form] = Form.useForm()

    const handleRegionChange = (value: any) => {
        const newRegion = regionData.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }

    return(
        <MainTemplate>
            <CreateBaseProductForm  visible={addDrawer} onFinish={mutateBaseProduct} onClose={()=>setAddDrawer(false)}  />
            <TopContainer>
                <OptionContainer>
                    <Form layout='inline' form={form}  initialValues={{regionId:currentRegion?.id}}>
                    <Form.Item
                        name='regionId'
                    >
                    <Select onChange={handleRegionChange} defaultValue={currentRegion?.id}>
                        {regionData.map((item: RegionProps) => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                    </Form>
                </OptionContainer>
                <Button  type='primary' onClick={()=> setAddDrawer(true)}  ><FileAddOutlined />Add Base Product</Button>
            </TopContainer>
            <MainContainer>
                <Table loading={isLoading} pagination={{pageSize:6}} columns={columns} dataSource={baseProducts} />
            </MainContainer>            
        </MainTemplate>
    )
}

export default BaseProduct