import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import React, { FC, useEffect } from "react";
import styled from "styled-components";
import RegionProps from '.././../../types/Region'

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 18px;
`

type regionInputProp = Omit<RegionProps, 'id' | 'slug'>

type CustomDrawerProps = DrawerProps & {
    onFinish: (values: regionInputProp)=> void;
    visible: boolean;
    onClose: ()=> void;
}



const CreateRegionForm:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [form] = Form.useForm()
    useEffect(() => {
        if(visible) form.resetFields()
    },[visible])
    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Region Description</span>} placement='right'>
            <Form  form={form} layout='vertical' onFinish={onFinish}>
                    <Form.Item 
                        label='Name' 
                        name='name'
                        rules={[
                            {
                              required: true,
                              message: 'Please input Region Name!',
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
                    <Form.Item>
                        <FormButton htmlType='submit' size='large' type='primary'>Submit</FormButton>
                    </Form.Item>
                </Form>
        </Drawer>
    )
}

export default CreateRegionForm