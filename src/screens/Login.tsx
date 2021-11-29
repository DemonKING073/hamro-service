import React from "react"
import styled from "styled-components"
import { Form, Button, Input, Image } from 'antd'
import Logo from '../assets/logo.png'

const Container = styled.div`
    background-color: blue;
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
const SLogo = styled(Image)`
    height: 100px;
    width: 100px;
`
const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 14px;
`

const Login = () => {
    return(
        <Container>
            <FormContainer>
                <Form layout='vertical'>
                    <LogoContainer>
                        <SLogo preview={false} alt='logo' src={Logo} />
                    </LogoContainer>
                    <Form.Item 
                        label='Username' 
                        rules={[{required: true, message: 'Please provide your user name'}]}
                    >
                        <Input placeholder='Enter your username' />
                    </Form.Item>
                    <Form.Item 
                        label='Password'
                        rules={[{required: true, message: 'Please provide your password'}]}
                    >
                        <Input type='password' placeholder='Enter your password' />
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
