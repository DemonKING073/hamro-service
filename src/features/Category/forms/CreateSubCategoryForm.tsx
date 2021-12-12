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


type CustomDrawerProps = DrawerProps & {
    onFinish: (value: any) => void;
    visible: boolean;
    onClose: ()=> void;
}


const { Option } = Select;
const AddSubCategory:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [form] = Form.useForm()
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const [ currentCategory, setCurrentCategory ] = useState<CategoryProp>()

    const { data: regionData,} = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    const { data: categoryData } = useQuery(['getCategory', currentRegion], () => {
        if(currentRegion) return getCategory(currentRegion.id)
    }, {
        onSuccess: (categoryData: CategoryProp[]) => {
            if(categoryData) setCurrentCategory(categoryData[0])
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

    const handleCategory = ( id: number |string | undefined) => {
        if(categoryData){
            const newCategory = categoryData.find((item: CategoryProp) => item.id === id)
            setCurrentCategory(newCategory)
        }
    }

    useEffect(()=> {
        form.resetFields()
    },[currentCategory,form])

    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Sub-Category</span>} placement='right'>
            <Form form={form} onFinish={onFinish} initialValues={{name:'', regionId: currentRegion?.id, parentCategoryId: currentCategory?.name}} layout='vertical'>
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
                <Form.Item 
                        label='Select Parent Category' 
                        name='parentCategoryId'
                    >
                        <Select value={currentCategory?.name} onChange={handleCategory} >
                            {categoryData?.map((item:CategoryProp) => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
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

export default AddSubCategory