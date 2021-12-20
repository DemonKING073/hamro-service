import { FileAddOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Modal, Select, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import { deleteProduct, getProducts, getProductsFeatured, getProductsPopular } from "../../apis/product";
import { getRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import CButton from "../../components/CButton";
import MainTemplate from "../../components/MainTemplate";
import { TopContainer } from "../../components/TopContainer";
import LocalStorageService from "../../services/LocalStorageServices";
import NotificationService from "../../services/NotificationService";
import ProductProps from "../../types/Product";
import RegionProps from '../../types/Region'
import RoleProp from "../../types/RoleProp";
import CreateProductForms from "./forms/CreateProductForms";
import UpdateProductForms from "./forms/UpdateProductForms";


const Product = () => {
    const Roles = LocalStorageService.getRoles()
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()    
    const [ currentProduct, setCurrentProduct ] = useState<ProductProps>()
    const [ addProductDrawer, setAddProductDrawer ] = useState<boolean>(false)
    const [ updateProductDrawer, setUpdateProductDrawer ] = useState<boolean>(false)
    const [ delModal, setDelModal ] = useState<boolean>(false)
    const { Option } = Select;
    const [form] = Form.useForm()
    const [ toogleFeatured, setToogleFeatured ] = useState<boolean>(false)
    const [ tooglePopolar, setTooglePopular ] = useState<boolean>(false)

    const { data: regionData } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionData) => {
            if(Roles && Roles[0].name==='RegionalAdmin'){
                if(regionData) setCurrentRegion(Roles[0].region)
            } else {
                setCurrentRegion(regionData[0])
            }
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const { data:productsData, isLoading: isProductLoading, refetch: refetchProducts } = useQuery(['fetchProduct', currentRegion, toogleFeatured, tooglePopolar], () => {
        if( currentRegion && !toogleFeatured && !tooglePopolar) return getProducts(currentRegion.id)
        else if( currentRegion && toogleFeatured && !tooglePopolar ) return getProductsFeatured(currentRegion.id)
        else if( currentRegion && !toogleFeatured && !tooglePopolar ) return getProductsPopular(currentRegion.id)
    },{
        onSuccess: (data: ProductProps[]) => {
            if(data) setCurrentProduct(data[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const { mutateAsync: removeProduct } = useMutation((id: number | undefined) => deleteProduct(id),{
        onSuccess: () => {
            NotificationService.showNotification('success','Successfully deleted!');
            refetchProducts()
            setDelModal(false)
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            ellipsis: {
                showTitle: false,
            },
            render: (name: string) => (
                <Tooltip placement='topLeft' title={name}>
                    {name}
                </Tooltip>
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width:'15%',
            ellipsis: {
                showTitle: false,
            },
            render: (description:string) => (
                <Tooltip placement='topLeft' title={description}>
                    {description}
                </Tooltip>
            )
        },
        {
            title: 'Keywords',
            dataIndex: 'keywords',
            key: 'keywords',
            width:'10%',
            ellipsis: {
                showTitle: false,
            },
            render: (keywords:string) => (
                <Tooltip placement='topLeft' title={keywords}>
                    {keywords}
                </Tooltip>
            )
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
            width:'10%',
            ellipsis: {
                showTitle: false,
            },
            render: (unit:string) => (
                <Tooltip placement='topLeft' title={unit}>
                    {unit}
                </Tooltip>
            )
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width:'10%'
        },
        {
            title: 'Base Id',
            dataIndex: 'baseProductId',
            key: 'baseProductId',
            width:'10%'
        },
        {
            title: 'Vendor Id',
            dataIndex: 'vendorId',
            key: 'vendorId',
            width:'9%'
        },
        {
            title: 'Actions',
            key:'action',
            width:'25%',
            render: (value: number, record: ProductProps) => <TableButtonContainer> 
            <CButton variant='normal' onClick={()=> { setUpdateProductDrawer(true); setCurrentProduct(record)}} title='Update' />
            <CButton variant='danger' onClick={() => { setDelModal(true); setCurrentProduct(record)}} title='Remove' />
            </TableButtonContainer>
        }
    ]
    
    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])

    const handleFeatured = (e: any) => {
        console.log(e.target.checked)
        setToogleFeatured(e.target.checked)
    }
    const handlePopular = (e: any) => {
        console.log(e.target.checked)
        setTooglePopular(e.target.checked)
    }
    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }
    return(
        <>
            <Modal  visible={delModal} okText='Remove' onOk={() => removeProduct(currentProduct?.id)} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateProductForms onFinish={()=> alert('kera')} visible={addProductDrawer} onClose={()=>setAddProductDrawer(false)} />
            <UpdateProductForms region={currentRegion?.id} data={currentProduct} onFinish={()=>alert('kera')} visible={updateProductDrawer} onClose={()=> setUpdateProductDrawer(false)} />
            <TopContainer>
                <OptionContainer>
                    <Form layout='inline' form={form}  initialValues={{regionId:currentRegion?.id}}>
                    <Form.Item
                        name='regionId'
                        label='Region'
                    >
                    <Select onChange={handleRegionChange} >
                        {Roles&& Roles[0].name==='SuperAdmin'?
                            regionData?.map((item: RegionProps) =>(
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            )):
                            Roles?.map((item: RoleProp) =>(
                                <Option key={item.region.id} value={item.region.id}>{item.region.name}</Option>
                            )  )
                        }
                    </Select>
                    </Form.Item>
                    </Form>
                </OptionContainer>
                <Checkbox disabled={tooglePopolar?true:false} onChange={handleFeatured} style={{marginRight:15}}>Featured</Checkbox>
                <Checkbox disabled={toogleFeatured?true:false} onChange={handlePopular} style={{marginRight:15}}>Popular</Checkbox>
                <Button  type='primary' onClick={()=> setAddProductDrawer(true)}  ><FileAddOutlined />Add Product</Button>
            </TopContainer>
            <MainContainer>
                <Table loading={isProductLoading} pagination={{pageSize:6,showSizeChanger:false}} columns={columns} dataSource={productsData} />
            </MainContainer>
        </>
    )
}

const OptionContainer = styled.div`
    margin-right: 15px;
`

const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`
const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

export default Product