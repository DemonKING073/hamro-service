import React from "react"
import styled from "styled-components"
import { Form, Button, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Logo } from "../components/Logo"

const Container = styled.div`
    background-color: var(--secondary);
    height: 100vh;
`
const  FormContainer = styled.div`
    height: 350px;
    width: 300px;
    background-color: white;
    position: absolute;
    border-radius: 20px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding-left: 18px;
    padding-right: 18px;
`
// const FormTitle = styled.h1`
//     text-align: center;
//     margin: 18px 4px;
//     font-weight: bold;
// `

const FormButton = styled(Button)`
    width: 100% ;
    marginTop: 18px;
`



const Login = () => {
    const [form] = Form.useForm()

    const onFinish = (values:any) => {
        console.log('Received values of form: ', values);
      };

    return(
        <Container>
            <FormContainer>
                <Form layout='vertical' onFinish={onFinish} form={form}>
                    <Logo />
                    <Form.Item 
                        label='Username' 
                        name='username'
                        rules={[
                            {
                              required: true,
                              message: 'Please input your username!',
                            },
                          ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder='Enter your username' />
                    </Form.Item>
                    <Form.Item 
                        label='Password'
                        name='password'
                        rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                          ]}
                    >
                        <Input.Password 
                            prefix={<LockOutlined />} 
                            placeholder='Enter your password'  
                        />
                    </Form.Item>
                    <Form.Item>
                        <FormButton size='large' type='primary'>Login</FormButton>
                    </Form.Item>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default Login
