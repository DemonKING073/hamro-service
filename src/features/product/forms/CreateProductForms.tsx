import { CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Drawer, DrawerProps, Form, Input, Select } from "antd";
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

const showValues = (val: any) => {
    console.log('yo values hoo',val)
} 

const { Option } = Select;
const CreateProductForms:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [form] = Form.useForm()

    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Product</span>} placement='right'>
            <Form initialValues={{featured: false,}} form={form} layout='vertical' onFinish={showValues}>
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