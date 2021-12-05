import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import React from "react";
import styled from "styled-components";

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 18px;
`

type CustomDrawerProps = DrawerProps & {
    title: string;
    onFinish: any,
}

const CustomDrawer:React.FC<CustomDrawerProps> = ({ onFinish, title, ...props}) => {
    const [form] = Form.useForm()
    return(
        <Drawer {...props} closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>{title}</span>} placement='right' >
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

export default CustomDrawer