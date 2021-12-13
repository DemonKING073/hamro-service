import { FileAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Image, Modal, Select, Table, CheckboxProps } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { deleteCategory, fetchCategoryWithAllProducts, getCategory } from "../../apis/category";
import { getRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import MainTemplate from "../../components/MainTemplate";
import { TopContainer } from "../../components/TopContainer";
import NotificationService from "../../services/NotificationService";
import RegionProps from '../../types/Region'
import CategoryProp from '../../types/Category'
import CButton from "../../components/CButton";
import CreateCategoryForm from "./forms/CreateCategoryForm";
import CreateSubCategoryForm from "./forms/CreateSubCategoryForm";
import UpdateCategoryForm from "./forms/UpdateCategoryForm";

const Category = () => {
    const [ delModal, setDelModal ] = useState<boolean>(false)
    const [ getCategoryWithProduct, setGetCategoryWithProduct ] = useState<boolean>(false)
    const [ addCategoryDrawer, setAddCategoryDrawer ] = useState<boolean>(false)
    const [ updateCategoryDrawer, setUpdateCategoryDrawer ] = useState<boolean>(false)
    const [ addSubCategoryDrawer, setAddSubCategoryDrawer ] = useState<boolean>(false)
    const [ currentCategory, setCurrentCategory ] = useState<CategoryProp>()
    const [form] = Form.useForm()
    const { Option } = Select;
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()

    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(regionData) setCurrentRegion(regionData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const { data: categoryData, isLoading: isCategoryDataLoading, refetch: reFetchCategory } = useQuery(['getCategory', currentRegion,getCategoryWithProduct], () => {
        if(currentRegion && !getCategoryWithProduct) return getCategory(currentRegion.id)
        else if(currentRegion && getCategoryWithProduct) return fetchCategoryWithAllProducts(currentRegion.id)
    }, {
        onSuccess: (categoryData: CategoryProp[]) => {
            if(categoryData) setCurrentCategory(categoryData[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })


    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            width:'5%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'20%'
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            width:'10%'
        },
        {
            title: 'Region ID',
            dataIndex: 'regionId',
            key: 'regionId',
            width:'10%'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width:'20%'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key:'image',
            width:'10%',
            render: (id: number, record: CategoryProp) => <CategoryImage alt={record.name} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" /> 
        },
        {
            title: 'Actions',
            key:'action',
            dataIndex:'id',
            width:'25%',
            render: (id: number, record: CategoryProp) =>
            <TableButtonContainer> 
                <CButton onClick={()=>{ setUpdateCategoryDrawer(true); setCurrentCategory(record) }} variant='normal' title='Update' />
                <CButton onClick={()=> { setDelModal(true); setCurrentCategory(record)}} variant='danger'  title='Remove' />
            </TableButtonContainer>

        }
    ]
    const submitCategory = (val: any) => {
        console.log(val)
    }
    const submitUpdateCategory = (val: any) => {
        console.log(val)
    }
    const submitUpdatedCategory = (val: any) => {
        console.log(val)
    }

    const { mutateAsync: removeCategory } = useMutation('removeCategory',deleteCategory,{
        onSuccess:() => {
            setDelModal(false)
            reFetchCategory()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
            setDelModal(false)
        }
    })

    const toogleCWP = (e: any) => {
        console.log(e.target.checked)
        setGetCategoryWithProduct(e.target.checked)
    }

    return(
        <MainTemplate>
            <Modal  visible={delModal} okText='Remove' onOk={() => removeCategory(currentCategory?.id)} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateCategoryForm onFinish={submitCategory} visible={addCategoryDrawer} onClose={()=> setAddCategoryDrawer(false)} />
            <CreateSubCategoryForm visible={addSubCategoryDrawer} onClose={()=> setAddSubCategoryDrawer(false)} onFinish={submitUpdateCategory} />
            <UpdateCategoryForm visible={updateCategoryDrawer} onClose={()=> setUpdateCategoryDrawer(false)} onFinish={submitUpdatedCategory} data={currentCategory} />
            <TopContainer>
            <Checkbox onChange={toogleCWP} style={{alignSelf:'auto'}}>Categories with Products</Checkbox>
            <OptionContainer>
                <Form layout='inline' form={form}  initialValues={{regionId:currentRegion?.id}}>
                    <Form.Item
                        name='regionId'
                    >
                    <Select onChange={handleRegionChange} >
                        {regionData?.map((item: RegionProps) => (
                            <Option key={item.id} value={item.id} >{item.name}</Option>
                        ))}
                    </Select>
                    </Form.Item>
                </Form>
            </OptionContainer>
                <Button style={{marginRight:15}} type='primary' onClick={()=> setAddSubCategoryDrawer(true)} ><FileAddOutlined />Add Sub-Category</Button>
                <Button  type='primary' onClick={()=> setAddCategoryDrawer(true)} ><FileAddOutlined />Add Category</Button>
            </TopContainer>
            <MainContainer>
                <Table pagination={{pageSize:4}}  loading={isCategoryDataLoading} dataSource={categoryData} columns={columns} />
            </MainContainer>
        </MainTemplate>
    )
}


const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`
const OptionContainer = styled.div`
    margin-right: 15px;
`
const CategoryImage = styled(Image)`
    height: 50px;
    width: 50px;
`
const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
export default Category