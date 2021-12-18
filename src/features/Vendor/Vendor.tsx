import React, { useEffect, useState } from "react"
import MainTemplate from "../../components/MainTemplate"
import styled from "styled-components"
import RegionProps from '../../types/Region'
import { Button, Select, Table, Form, Modal } from "antd"
import axios from "axios"
import CButton from "../../components/CButton"
import { FileAddOutlined } from "@ant-design/icons"
import ApiError from "../../types/ApiError"
import { useQuery, useMutation } from 'react-query'
import NotificationService from "../../services/NotificationService"
import { getRegion } from "../../apis/region"
import axiosCheckError from "../../axiosCheckError"
import CreateVendorForms from "./forms/CreateVendorForms"
import { DeleteVendor, GetVendor } from "../../apis/vendor"
import VendorProps from '../../types/Vendor'
import UpdateVendorForms from "./forms/UpdateVendorForms"
import LocalStorageService from "../../services/LocalStorageServices"
import RoleProp from "../../types/RoleProp"

const Vendor = () => {
    const Roles = LocalStorageService.getRoles()
    const [ addVendorDrawer, setAddVendorDrawer ] = useState<boolean>(false)
    const [ updateVendorDrawer, setUpdateVendorDrawer ] = useState<boolean>(false)
    const [ currentRegion, setCurrentRegion ] = useState<RegionProps>()
    const [ currentVendor, setCurrentVendor ] = useState<VendorProps>()
    const [ delModal, setDelModal ] = useState<boolean>(false)
    const { Option } = Select;
    const [form] = Form.useForm()


    const addVendor = (val: any) => {
        console.log(val)
    }

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

    const { data: vendorDatas, refetch: refetchVendorData } = useQuery(['fetchVendor', currentRegion], () => {
        if(currentRegion) return GetVendor(currentRegion.id)
    },{
        onError: (err) => {
            if(axios.isAxiosError(err)) {
                const apiError = err as ApiError
                const message = apiError.response?.data.message
                if (message) NotificationService.showNotification('error', message.toString())
            }
        },
        onSuccess: (data: VendorProps[]) => {
            console.log(data)
            if(data) setCurrentVendor(data[0])
        }
    })

    const { mutateAsync: removeVendor} = useMutation((id: number | undefined) => DeleteVendor(id), {
        onSuccess: () => {
            NotificationService.showNotification('success','Successfully deleted!');
            refetchVendorData()
            setDelModal(false)
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',    
            key: 'id',
            width:'2%'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'20%'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width:'18%'
        },
        {
            title: 'Location',
            dataIndex:'location',
            key: 'location',
            width:'15%',
            render: (location: { lat: number, lng: number }) => <>
                <span style={{fontWeight:'bold'}}>Latitude:</span> {location.lat}<br/>
                <span style={{fontWeight:'bold'}}>Longitude:</span> {location.lng}
            </>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '10%'
        },
        {
            title: 'Actions',
            key:'action',
            width:'25%',
            render: (value: number, record: any) => <TableButtonContainer> 
            <CButton variant='normal' onClick={()=> {setUpdateVendorDrawer(true); setCurrentVendor(record)}} title='Update' />
            <CButton variant='danger' onClick={()=> {setDelModal(true); setCurrentVendor(record)}} title='Remove' />
            </TableButtonContainer>
        }
    ]

    const handleRegionChange = (value: any) => {
        const newRegion = regionData?.find((item) => item.id === value)
        setCurrentRegion(newRegion)
    }

    useEffect(() => {
        form.resetFields()
    },[currentRegion, form])
    return(
        <MainTemplate>
            <Modal  visible={delModal} okText='Remove' onOk={() => removeVendor(currentVendor?.id)} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateVendorForms visible={addVendorDrawer} onFinish={addVendor} onClose={()=> setAddVendorDrawer(false)} />
            <UpdateVendorForms 
                data={currentVendor}
                visible={updateVendorDrawer}
                onClose={()=> setUpdateVendorDrawer(false)}
                onFinish={(values)=>{
                    if(currentVendor) console.log(values)
                } }
            />
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
                <Button  type='primary' onClick={()=> setAddVendorDrawer(true)}  ><FileAddOutlined />Add Vendor</Button>
            </TopContainer>
            <MainContainer>
                <Table  pagination={{pageSize:5}} columns={columns} dataSource={vendorDatas} />
            </MainContainer>            
        </MainTemplate>
    )
}

const TopContainer = styled.div`
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
`
const MainContainer = styled.div`
    height: 73vh;
    width: 100%;
`
const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`
const OptionContainer = styled.div`
    margin-right: 15px;
`

export default Vendor