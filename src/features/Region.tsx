import React, { useState } from "react";
import styled from "styled-components";
import MainTemplate from "../components/MainTemplate";
import { Menu, Dropdown, Button, Select, Input, Drawer, Form } from 'antd'
import { FileAddOutlined, SearchOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons'

const { Option } = Select;


const TopContainer = styled.div`
    display: flex;
    padding: 16px;
    justify-content: flex-end;
    align-items: center;
`
const SettingContainer = styled.div`
    padding: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const SubSettingContainer = styled.div`
    display: flex;
    align-items: center;
`

const SortContainer = styled.div`
    display: flex;
    align-items: center;
`
const DarkCircle = styled.div`
    background: #636363;
    padding: 8px 14px;
    border-radius: 50%;
    margin-left: 10px;
    color: white;
`
const SortButton = styled.span`
    margin-left: 18px;
    background: #CCCCCC;
    padding: 5px 16px;
    border-radius: 10px;
`
const FormButton = styled(Button)`
    width: 100% ;
    marginTop: 18px;
`


const sort = (
    <Menu>
      <Menu.Item>
          Newest
      </Menu.Item>
      <Menu.Item>
          Oldest
      </Menu.Item>
      <Menu.Item>
          Administrative wise
      </Menu.Item>
    </Menu>
  );

const Region = () => {
    const [form] = Form.useForm()
    const [ showDrawer, setShowDrawer ] = useState<any>(true)
    const closeDrawer = () => {
        setShowDrawer(false)
    }
    const onFinish = async (values:any) => {
        console.log('Received values of form: ', values);
      };
    return(
        <MainTemplate>
            <Drawer closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Region Description</span>} placement='right' onClose={closeDrawer} visible={showDrawer}>
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
            <TopContainer>
                <Select defaultValue='alltime' style={{marginRight:20}} >
                    <Option value='alltime'>All Time</Option>
                    <Option value='15days'>15 Days</Option>
                    <Option value='1month'>1 Month</Option>
                    <Option value='6month'>6 Months</Option>
                </Select>
                <Select defaultValue='anyowner' style={{marginRight:20}} >
                    <Option value='anyowner'>Any Owner</Option>
                    <Option value='admin'>Admin</Option>
                    <Option value='regionaladmin'>Regional Admin</Option>
                    <Option value='superadmin'>Super Admin</Option>
                </Select>
                <Button onClick={() => setShowDrawer(true)} style={{backgroundColor:'var(--primary)', color: 'white',borderRadius:6}}  ><FileAddOutlined />Add Region</Button>
            </TopContainer>
            <SettingContainer>
                <SortContainer>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Leads</span>
                        <DarkCircle>{1}</DarkCircle>
                    </div>
                    <Dropdown overlay={sort}>
                        <SortButton> Sort</SortButton>
                    </Dropdown>
                </SortContainer>
                <SubSettingContainer>
                    <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:35}} placeholder='Search...' />
                    <SettingOutlined style={{fontSize: 20, marginLeft:10}} />
                </SubSettingContainer>
            </SettingContainer>

        </MainTemplate>
    )
}


export default Region