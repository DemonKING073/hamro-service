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


type CustomDrawerProps = DrawerProps & {
    onFinish: (value: any) => void;
    visible: boolean;
    onClose: ()=> void;
}

interface CategoryProp {
    id: number;
    name: string;
    slug: string;
    level: number;
    image: string;
    regionId: number;
}

const { Option } = Select;
const CreateCategoryForm:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
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
   

    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Category</span>} placement='right'>
            <Form form={form} onFinish={onFinish} initialValues={{name:'', regionId: currentRegion?.id}} layout='vertical'>
                <Form.Item
                    label='Name'
                    name='name'
                    rules={[
                        {
                          required: true,
                          message: 'Please input Base Product Name!',
                        },
                      ]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item
                    label='Region'
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

export default CreateCategoryForm