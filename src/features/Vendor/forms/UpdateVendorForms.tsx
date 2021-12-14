import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Form, Input, Select } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getCategory } from "../../../apis/category";
import { getRegion } from "../../../apis/region";
import axiosCheckError from "../../../axiosCheckError";
import NotificationService from "../../../services/NotificationService";
import RegionProps from '../../../types/Region'
import CategoryProp from '../../../types/Category'
import VendorProps from '../../../types/Vendor'


type CustomDrawerProps = DrawerProps & {
    onFinish: (value: any) => void;
    visible: boolean;
    onClose: ()=> void;
    data: undefined | VendorProps |null;
}



const { Option } = Select;
const UpdateVendorForms:FC<CustomDrawerProps> = ({onFinish, visible, onClose, data}) => {
    const [form] = Form.useForm()
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()

    const { data: regionData,} = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const handleWorkingRegion = ( id: any ) => {
        if(regionData){
            const newWorkingRegion = regionData.find((item:RegionProps) => item.id === id )
            setCurrentRegion(newWorkingRegion)
        }
    }

    useEffect(() => {
        if(!visible && regionData) {
            setCurrentRegion(regionData[0])
        }
        form.resetFields()
    },[visible, form, regionData])

    return(
        <Drawer 
            visible={visible} 
            onClose={onClose}  
            closeIcon={<CloseOutlined 
            style={{color:'white'}} />} 
            headerStyle={{backgroundColor:'var(--primary)'}} 
            title={<span style={{color:'white'}}>Add Vendor</span>} placement='right'
        >
            <Form form={form}  initialValues={{name: data?.name, lng: data?.location.lng, lat: data?.location.lat, address: data?.address, regionId: data?.regionId}} layout='vertical' onFinish={onFinish}>
                <Form.Item
                    name='name'
                    label='Vendor Name'
                    rules={[
                        {
                          required: true,
                          message: 'Please input Base Vendor Name!',
                        },
                      ]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item 
                    label='Longitude' 
                    name='lng'
                    rules={[
                        {
                            required: true,
                            message: 'Please input Longitude!',
                        },
                        ]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item 
                    label='Latitude' 
                    name='lat'
                    rules={[
                        {
                            required: true,
                            message: 'Please input Longitude!',
                        },
                        ]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item
                    name='address'
                    label='Address'
                    rules={[
                        {
                          required: true,
                          message: 'Please input Vendor Address!',
                        },
                      ]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item
                    label='Select Region'
                    name='regionId'
                >
                    <Select value={currentRegion?.name}  onChange={handleWorkingRegion}>
                        {regionData?.map((item: RegionProps) => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
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

export default UpdateVendorForms