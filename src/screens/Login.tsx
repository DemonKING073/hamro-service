import React from "react"
import styled from "styled-components"
import { Form, Button, Input, notification } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Logo } from "../components/Logo"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import LocalStorageService from "../services/LocalStorageServices"
import NotificationService from "../services/NotificationService"


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

const FormButton = styled(Button)`
    width: 100% ;
    margin-top: 4px;
`



const Login = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const onFinish = async (values:any) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios.post('http://localhost:8080/auth/login',{"phone":values.username,"password":values.password})
            if(response.data.roles.length === 0) {
                NotificationService.showNotification('error','You are not Authorized!')
                LocalStorageService.clearTokens()
                return navigate('/login')
            }
            LocalStorageService.setAccessToken(response.data.accessToken)
            LocalStorageService.setUserRole(response.data.roles)
            navigate('/')
            NotificationService.showNotification('success','Logged Successfully!')
        } catch(err) {
            console.error(err)
            notification.error({message:'Login Failed!'})
        }
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
                        <FormButton htmlType='submit' size='large' type='primary'>Login</FormButton>
                    </Form.Item>
                </Form>
            </FormContainer>
        </Container>
    )
}

export default Login
