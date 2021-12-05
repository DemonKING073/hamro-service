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
const CreateBaseProductForm:FC<CustomDrawerProps> = ({onFinish, visible, onClose}) => {
    const [form] = Form.useForm()
    const [ categoryData, setCategoryData ] = useState<CategoryProp[]>([])
    const [ workingRegion, setWorkingRegion ] = useState<RegionProps>()
    const [ workingCategory, setWorkingCategory ] = useState<CategoryProp | any>(categoryData[0])
    const [ regionData, setRegionData ] = useState<RegionProps[]>([])
    const fetchCategory = async() => {
       try{
        const res = await axios.get('http://localhost:8080/category',{
            headers:{
                'regionId':`${workingRegion?workingRegion.id:1}`
            }
        })
        setCategoryData(res.data)
        setWorkingCategory(res.data[0])
       }
       catch(err: any){
        console.log(err.response.data)
        notification.error({message:err.response.data.message})
       }
    }
    useEffect(() => {
        if(workingRegion) fetchCategory()
        form.resetFields()
    },[workingRegion])

    useEffect(()=> {
        if(workingCategory) form.resetFields()
    },[workingCategory])
   
    const fetchRegions = async () => {
        axios.get('http://localhost:8080/region')
        .then((res) => {
            setRegionData(res.data)
            setWorkingRegion(res.data[0])
        })
        .catch((err) => console.log(err))
    }
    useEffect(() => {
        if(visible) form.resetFields()
        fetchRegions()
        fetchCategory()
    },[visible])
    
    
    const handleWorkingRegion = ( id: any ) => {
        const newWorkingRegion = regionData.find((item:RegionProps) => item.id === id )
        setWorkingRegion(newWorkingRegion)
    }
    const handleCategory = ( id: any) => {
        const newCategory = categoryData.find((item) => item.id === id)
        setWorkingCategory(newCategory)
    }
    return(
        <Drawer visible={visible} onClose={onClose}  closeIcon={<CloseOutlined style={{color:'white'}} />} headerStyle={{backgroundColor:'var(--primary)'}} title={<span style={{color:'white'}}>Add Base Product</span>} placement='right'>
            <Form form={form} initialValues={{name:'', regionId: workingRegion?.id,categoryId:workingCategory?.id}}  layout='vertical' onFinish={onFinish}>
                    <Form.Item
                        label='Select Region'
                        name='regionId'
                    >
                        <Select value={workingRegion?.name}  onChange={handleWorkingRegion}>
                            {regionData.map((item: RegionProps) => (
                                <Option key={item.id} value={item.id} >{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label='Select Category' 
                        name='categoryId'
                    >
                        <Select value={workingCategory?.name} onChange={handleCategory} >
                            {categoryData.map((item:CategoryProp) => (
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
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

export default CreateBaseProductForm