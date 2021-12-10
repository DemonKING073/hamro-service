import React, { useState } from "react";
import styled from "styled-components";
import MainTemplate from "../../components/MainTemplate";
import { Button, Input, Table, Modal } from 'antd'
import { FileAddOutlined, SearchOutlined } from '@ant-design/icons'
import CButton from "../../components/CButton";
import CreateRegionForm from "./Forms/CreateRegionForm";
import UpdateRegionForm from "./Forms/UpdateRegionForm";
import RegionProps from '../../types/Region'
import { useMutation, useQuery } from "react-query";
import NotificationService from "../../services/NotificationService";
import { addRegion, getRegion, removeRegion, updateRegion } from "../../apis/region";
import axiosCheckError from "../../axiosCheckError";
import { TopContainer } from "../../components/TopContainer";



type regionInputProp = Omit<RegionProps, 'id' | 'slug'>

const Region = () => {
    const [ delModal, setDelModal ] = useState(false)
    const [ showDrawer, setShowDrawer ] = useState(false)
    const [ UpdateDrawer, setUpdateDrawer ] = useState(false)
    const [ workingRecord, setWorkingRecord ] = useState<RegionProps | null>()
    const columns = [
        {
            title: 'Id',
            dataIndex:'id',
            key: 'id',
            width: '5%'
        },
        {
            title: 'Region Name',
            dataIndex: 'name',
            key:'name',
            width: '20%'
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            width: '20%'
        },
        {
            title: 'Location',
            dataIndex:'location',
            key: 'location',
            width:'25%',
            render: (location: { lat: number, lng: number }) => <>
                <span style={{fontWeight:'bold'}}>Latitude:</span> {location.lat}<br/>
                <span style={{fontWeight:'bold'}}>Longitude:</span> {location.lng}
            </>
        },
        {
            title: 'Action',
            dataIndex: 'button',
            key: 'action',
            width: '30%',
            render: (value: number, record: RegionProps ) => <TableButtonContainer><CButton onClick={()=> { setUpdateDrawer(true); setWorkingRecord(record); }} variant='normal' title='Update' />
            <CButton variant='danger' onClick={() => { setDelModal(true); setWorkingRecord(record) }} title='Remove' />
            </TableButtonContainer>
        }
    ]

    const { isLoading: isRegionLoading, data: regionDatas, refetch: refetchRegion } = useQuery('fetchRegion',getRegion,{
        onSuccess: (regionDatas) => {
            // console.log(regionDatas)
            setWorkingRecord(regionDatas[0])
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
        }
    })
    const { mutateAsync: postRegion} = useMutation((values: regionInputProp) => addRegion(values),{
        onSuccess: () => {
            NotificationService.showNotification('success','SucessFully Added Region!')
            setShowDrawer(false)
            refetchRegion()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
            setShowDrawer(false)
        }
    })

    const { mutateAsync: PutRegion } = useMutation((values: regionInputProp) => updateRegion(values, workingRecord?.id),{
        onSuccess: () => {
            NotificationService.showNotification('success','SucessFully Updated Region!')
            setUpdateDrawer(false)
            refetchRegion()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
            setShowDrawer(false)
        }
    }) 

    const { mutateAsync: DeleteRegion } = useMutation('DeleteRegion', removeRegion,{
        onSuccess: () => {
            NotificationService.showNotification('success','SucessFully Deleteed Region!')
            setDelModal(false)
            refetchRegion()
        },
        onError: (err) => {
            const apiError = axiosCheckError(err)
            if(apiError && apiError.message) NotificationService.showNotification('error', apiError.message.toString())
            setDelModal(false)
        }
    })

   
    return(
        <MainTemplate>
            <Modal  visible={delModal} okText='Remove' onOk={() => DeleteRegion(workingRecord?.id)} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateRegionForm visible={showDrawer} onClose={()=> setShowDrawer(false)} onFinish={(values: regionInputProp) => {
                postRegion(values)}
            }/>
            <UpdateRegionForm 
                meroData={workingRecord} 
                visible={UpdateDrawer} 
                onClose={()=> {setUpdateDrawer(false); }} 
                onFinish={(values: any) =>{
                    if(workingRecord) PutRegion(values)
                }} 
            />
            <TopContainer>
                <div style={{marginRight:15}}>
                <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:35}} placeholder='Search...' />
                </div>
                <Button onClick={() => setShowDrawer(true)} type='primary'  ><FileAddOutlined />Add Region</Button>
            </TopContainer>
            <TableContainer>
                <Table  loading={isRegionLoading} pagination={{pageSize:5}} columns={columns} dataSource={regionDatas} />
            </TableContainer>
        </MainTemplate>
    )
}


const TableContainer = styled.div`
    height: 55vh;
`


const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

export default Region