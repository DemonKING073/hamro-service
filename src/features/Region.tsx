import React, { useState } from "react";
import styled from "styled-components";
import MainTemplate from "../components/MainTemplate";
import { Menu, Dropdown, Button, Select, Input, Drawer, Form, Table, Tag, Space } from 'antd'
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
    justify-content: flex-end;
    align-items: center;
`
const SubSettingContainer = styled.div`
    display: flex;
    align-items: center;
`

const TableContainer = styled.div`
    height: 55vh;
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
    margin-top: 18px;
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

const columns = [
    {
        title: 'Id',
        dataIndex:'id',
        key: 'id',
    },
    {
        title: 'Region Name',
        dataIndex: 'name',
        key:'name',
    },
    {
        title: 'Slug',
        dataIndex: 'slug',
        key: 'slug',
    },
    {
        title: 'Location',
        dataIndex:'location',
        key: 'location',
        render: (location: { lat: number, lng: number }) => <>
            <span style={{fontWeight:'bold'}}>Latitude:</span> {location.lat}<br/>
            <span style={{fontWeight:'bold'}}>Longitude:</span> {location.lng}
        </>
    }
]

const Region = () => {
    const [form] = Form.useForm()
    const [ showDrawer, setShowDrawer ] = useState(false)
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
                <Button onClick={() => setShowDrawer(true)} type='primary'  ><FileAddOutlined />Add Region</Button>
            </TopContainer>
            <SettingContainer>
                {/* <SortContainer>
                    <div style={{display:'flex',alignItems:'center'}}>
                        <span style={{fontWeight:'bold'}}>Leads</span>
                        <DarkCircle>{1}</DarkCircle>
                    </div>
                    <Dropdown overlay={sort}>
                        <SortButton> Sort</SortButton>
                    </Dropdown>
                </SortContainer> */}
                <SubSettingContainer>
                    <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:35}} placeholder='Search...' />
                </SubSettingContainer>
            </SettingContainer>
            <TableContainer>
                <Table pagination={{pageSize:4}} columns={columns} dataSource={[{id:1,name:'kathmandu',slug:'koi kei hola',location:{lat:4423232,lng:2323232}},{id:1,name:'kathmandu',slug:'koi kei hola',location:{lat:4423232,lng:2323232}},{id:1,name:'kathmandu',slug:'koi kei hola',location:{lat:4423232,lng:2323232}},{id:1,name:'kathmandu',slug:'koi kei hola',location:{lat:4423232,lng:2323232}},{id:1,name:'kathmandu',slug:'koi kei hola',location:{lat:4423232,lng:2323232}}]} />
            </TableContainer>
        </MainTemplate>
    )
}


export default Region