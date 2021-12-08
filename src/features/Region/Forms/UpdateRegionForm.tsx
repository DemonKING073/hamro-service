import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, DrawerProps, Form, Input } from "antd";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import RegionProps from '../../../types/Region'

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 18px;
`
type regionInputProp = Omit<RegionProps, 'id' | 'slug'>

type CustomDrawerProps = DrawerProps & {
    onFinish: (values: regionInputProp)=> void;
    visible: boolean;
    onClose: ()=> void;
    meroData: undefined | RegionProps |null;
}

const UpdateRegionForm:FC<CustomDrawerProps> = ({onFinish, visible, onClose, meroData}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if(visible) form.resetFields()
    }, [visible])
    return(
        <Drawer visible={visible} onClose={onClose} closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Update Description</span>} placement='right'>
            <Form initialValues={{name:meroData?.name,lng:meroData?.location.lng,lat:meroData?.location.lat}} form={form} layout='vertical' onFinish={onFinish}>
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
                        <Input  type='text' />
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

export default UpdateRegionForm 