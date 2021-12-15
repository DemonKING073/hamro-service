import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Drawer, DrawerProps, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getRegion } from "../../../apis/region";
import axiosCheckError from "../../../axiosCheckError";
import NotificationService from "../../../services/NotificationService";
import RegionProps from '../../../types/Region'
import BaseProductProp from '../../../types/BaseProduct'
import VendorProps from '../../../types/Vendor'
import { getBaseProducts } from "../../../apis/baseProduct";
import axios from "axios";
import ApiError from "../../../types/ApiError";
import { GetVendor } from "../../../apis/vendor";


type CustomDrawerProps = DrawerProps & {
    onFinish: (value: any) => void;
    visible: boolean;
    onClose: ()=> void;
}

const showValues = (val: any) => {
    console.log('yo values hoo',val)
} 



const { Option } = Select;
const CreateProductForms:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [ workingBaseProduct, setWorkingBaseProduct ] = useState<BaseProductProp>()
    const [form] = Form.useForm()
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const [ currentVendor, setCurrentVendor ] = useState<VendorProps>()
    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    const {data: baseProduct } = useQuery(['fetchBaseProduct', currentRegion],() => {
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
    const { data: vendorDatas } = useQuery(['fetchVendor', currentRegion], () => {
        if(currentRegion) return GetVendor(currentRegion.id)
    },{
        onError: (err) => {
            if(axios.isAxiosError(err)) {
                const apiError = err as ApiError
                const message = apiError.response?.data.message
                if (message) NotificationService.showNotification('error', message.toString())
            }
        },
        onSuccess: (data: VendorProps[]) => {
            console.log(data)
            if(data) setCurrentVendor(data[0])
        }
    })
    
    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
    const handleBaseProductChange = (value: any) => {
        const newBaseProduct = baseProduct?.find((item) => item.id === value)
        setWorkingBaseProduct(newBaseProduct)
    }
    useEffect(() => {
        form.resetFields()
    },[workingBaseProduct, form])


    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Product</span>} placement='right'>
            <Form initialValues={{featured: false,regionId: currentRegion?.id, baseProduct: workingBaseProduct?.name, vendorId: currentVendor?.id}} form={form} layout='vertical' onFinish={showValues}>
                    <Form.Item
                        label='Region'
                        name='regionId'
                    >
                        <Select value={currentRegion?.name} onChange={handleRegionChange}>
                            {regionData?.map((item) => (
                                <Option value={item.id} key={item.id} >{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='BaseProduct'
                        name='baseProduct'
                    >
                        <Select value={workingBaseProduct?.name} onChange={handleBaseProductChange}>
                            {baseProduct?.map((item) => (
                                <Option value={item.id} key={item.id} >{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Vendor'
                        name='vendorId'
                    >
                        <Select value={currentVendor?.name} onChange={handleBaseProductChange}>
                            {vendorDatas?.map((item) => (
                                <Option value={item.id} key={item.id} >{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label='Name' 
                        name='name'
                        rules={[
                            {
                              required: true,
                              message: 'Please input Product Name!',
                            },
                          ]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item 
                        label='Description' 
                        name='description'
                        rules={[
                            {
                              required: true,
                              message: 'Please input Descriptions!',
                            },
                          ]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        name="featured"
                        valuePropName='checked'
                    >
                        <Checkbox>Featured</Checkbox>
                    </Form.Item>
                    <Form.Item
                        name="popular"
                        valuePropName='checked'
                    >
                        <Checkbox>Popular</Checkbox>
                    </Form.Item>
                    <Form.Item 
                        label='Keywords' 
                        name='keywords'
                        rules={[
                            {
                              required: true,
                              message: 'Please input keywords!',
                            },
                          ]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item 
                        label='Unit' 
                        name='unit'
                        rules={[
                            {
                              required: true,
                              message: 'Please input unit!',
                            },
                          ]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item 
                        label='Price' 
                        name='price'
                        rules={[
                            {
                              required: true,
                              message: 'Please input price!',
                            },
                          ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                    <Form.Item>
                        <FormButton htmlType='submit' size='large' type='primary'>Submit</FormButton>
                    </Form.Item>
            </Form>
        </Drawer>
    )
}

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 18px;
`

export default CreateProductForms