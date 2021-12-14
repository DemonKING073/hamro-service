import React, { useEffect, useState } from "react"
import MainTemplate from "../../components/MainTemplate"
import styled from "styled-components"
import BaseProductProps from "../../types/BaseProduct"
import RegionProps from '../../types/Region'
import { Button, Select, Table, Form, Modal } from "antd"
import axios from "axios"
import CButton from "../../components/CButton"
import { FileAddOutlined } from "@ant-design/icons"
import CreateBaseProductForm from "./forms/CreateBaseProductForm"
import { createBaseProducts, getBaseProducts, removeBaseProduct, updateBaseProducts } from "../../apis/baseProduct"
import ApiError from "../../types/ApiError"
import { useQuery, useMutation } from 'react-query'
import NotificationService from "../../services/NotificationService"
import { getRegion } from "../../apis/region"
import axiosCheckError from "../../axiosCheckError"
import UpdateBaseProductForm from "./forms/UpdateBaseProductForm"

type baseProductInputProp = Omit<BaseProductProps, 'id' | 'slug'>




const BaseProduct = () => {
    
    const { Option } = Select;
    const [ addDrawer, setAddDrawer ] = useState(false)
    const [ delModal, setDelModal ] = useState(false)
    const [ updateDrawer, setUpdateDrawer ] = useState(false)
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const [ workingBaseProduct, setWorkingBaseProduct ] = useState<BaseProductProps>()
    

    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const {data: baseProduct, isLoading: isBaseProductLoading, refetch: refetchBaseProducts } = useQuery(['fetchBaseProduct', currentRegion],() => {
        if(currentRegion) return getBaseProducts(currentRegion.id)
    }, {
        onError: (err) => {
            if(axios.isAxiosError(err)) {
                const apiError = err as ApiError
                const message = apiError.response?.data.message
                if (message) NotificationService.showNotification('error', message.toString())
            }
        },
        onSuccess: (data) => {
            if(data) setWorkingBaseProduct(data[0])
        }
    })


    const { mutateAsync: mutateBaseProduct} = useMutation((values: baseProductInputProp) => createBaseProducts(values),{
        onSuccess: (data) => {
            NotificationService.showNotification('success','Base Product Successfully Added!')
            setAddDrawer(false)
            refetchBaseProducts()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const { mutateAsync: PutBaseProduct } = useMutation((values: baseProductInputProp) => updateBaseProducts(values, workingBaseProduct?.id),{
        onSuccess: () => {
            NotificationService.showNotification('success', 'Successfully Updated BaseProduct!')
            setUpdateDrawer(false)
            refetchBaseProducts()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const { mutateAsync: deleteBaseProduct } = useMutation((id: number | undefined) => removeBaseProduct(id) ,{
        onSuccess:() => {
            NotificationService.showNotification('success','Successfully deleted!');
            refetchBaseProducts()
            setDelModal(false)
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
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
            render: (value: number, record: BaseProductProps) => <TableButtonContainer> 
            <CButton variant='normal' onClick={()=> {setUpdateDrawer(true); setWorkingBaseProduct(record) }} title='Update' />
            <CButton variant='danger' onClick={()=> {setDelModal(true); setWorkingBaseProduct(record)}} title='Remove' />
            </TableButtonContainer>
        }
    ]
    
    
   
    const [form] = Form.useForm()

    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])

    return(
        <MainTemplate>
            <Modal  visible={delModal} okText='Remove' onOk={() => deleteBaseProduct(workingBaseProduct?.id)} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateBaseProductForm visible={addDrawer} onFinish={mutateBaseProduct} onClose={()=>setAddDrawer(false)}  />
            <UpdateBaseProductForm data={workingBaseProduct} visible={updateDrawer} onClose={()=>setUpdateDrawer(false)} onFinish={(values)=> {
                if(workingBaseProduct) PutBaseProduct(values)
                console.log(values)
                console.log(workingBaseProduct?.id)
            }} />
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
                <Button  type='primary' onClick={()=> setAddDrawer(true)}  ><FileAddOutlined />Add Base Product</Button>
            </TopContainer>
            <MainContainer>
                <Table loading={isBaseProductLoading} pagination={{pageSize:6}} columns={columns} dataSource={baseProduct} />
            </MainContainer>            
        </MainTemplate>
    )
}

const TopContainer = styled.div`
    padding: 16px;
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

export default BaseProduct