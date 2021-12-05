import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Form, Input, notification, Select } from "antd";
import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import RegionProps from '../../../types/Region'

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 18px;
`
type CustomDrawerProps = DrawerProps & {
    // onFinish: (values: any)=> Promise<void>;
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
const UpdateBaseProductForm:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [form] = Form.useForm()
    
    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Base Product</span>} placement='right'>
            <Form  form={form} layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        label='Select Region'
                        name='regionId'
                    >
                        
                    </Form.Item>
                    <Form.Item 
                        label='Select Category' 
                        name='categoryId'
                    >
                        
                    </Form.Item>
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
                    <Form.Item>
                        <FormButton htmlType='submit' size='large' type='primary'>Submit</FormButton>
                    </Form.Item>
                </Form>
        </Drawer>
    )
}

export default UpdateBaseProductForm