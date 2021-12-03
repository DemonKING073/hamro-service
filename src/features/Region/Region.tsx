import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MainTemplate from "../../components/MainTemplate";
import { Menu, Dropdown, Button, Select, Input, Drawer, Form, Table, Tag, Space, notification, Modal } from 'antd'
import { FileAddOutlined, SearchOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons'
import axios from "axios";
import LocalStorageService from "../../services/LocalStorageServices";
import CButton from "../../components/CButton";
import CustomDrawer from "../../components/CustomDrawer";
import CreateRegionForm from "./Forms/CreateRegionForm";
import UpdateRegionForm from "./Forms/UpdateRegionForm";
import RegionProps from '../../types/Region'


const { Option } = Select;


const TopContainer = styled.div`
    display: flex;
    padding: 15px;
    justify-content: space-between;
    align-items: center;
`

const TableContainer = styled.div`
    height: 55vh;
`


const TableButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
`

const Region = () => {
    const [ delModal, setDelModal ] = useState(false)
    const [ showDrawer, setShowDrawer ] = useState(false)
    const [ token, setToken ] = useState<string | null>()
    const [ UpdateDrawer, setUpdateDrawer ] = useState(false)
    const [ workingRecord, setWorkingRecord ] = useState<RegionProps | null>()

    useEffect(() => {
        const token = LocalStorageService.getAccessToken()
        setToken(token)
    },[])
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

    const [ regionData, setRegionData ] = useState<RegionProps[]>([]);
    const fetchRegions = async () => {
        axios.get('http://localhost:8080/region')
        .then((res) => {
            setRegionData(res.data)
            setIsLoading(false)
            console.log('bibek')
        })
        .catch((err) => console.log(err))
    }
  
    const addRegion =  async (values:any) => {
        console.log('Received values of form: ', values);
        try{
            const response = await axios.post('http://localhost:8080/region',values,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            notification.success({message:'Region Successfully Added!'})
            fetchRegions()
            setShowDrawer(false)
        }
        catch(err:any){
            console.log(err.response.data)
            notification.error({message:err.response.data.message})
        }
      }

    const update =  async (values: any) => {
        console.log(values)
        try{
            const response = await axios.put(`http://localhost:8080/region/${workingRecord?.id}`,values,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            notification.success({message: 'Region Updated SuccessFully!'})
            fetchRegions()
            setUpdateDrawer(false)
        }
        catch(err: any){
            console.log(err)
            notification.error({message: err.response.data.message })
        }
    }
    const deleteRegion = async () => {
        console.log(workingRecord)
        try{
            const response = await axios.delete(`http://localhost:8080/region/${workingRecord?.id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            notification.success({message: 'Record Removed!'})
            fetchRegions()
            setDelModal(false)
        }
        catch(err: any){
            console.log(err)
            notification.error({message: err.response.data.message })
        }
    }
   
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        console.log('fuck you')
        fetchRegions()
        setIsLoading(false)
    },[])
    return(
        <MainTemplate>
            <Modal  visible={delModal} okText='Remove' onOk={deleteRegion} onCancel={() => setDelModal(false)}>
                Confirm your delete request!
            </Modal>
            <CreateRegionForm visible={showDrawer} onClose={()=> setShowDrawer(false)} onFinish={addRegion} />
            <UpdateRegionForm meroData={workingRecord} visible={UpdateDrawer} onClose={()=> {setUpdateDrawer(false); console.log('Mah bahira gako')}} onFinish={update} />
            <TopContainer>
                <div>
                <Input prefix={<SearchOutlined/>} style={{borderRadius:20,height:35}} placeholder='Search...' />
                </div>
                <div>
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
                </div>
            </TopContainer>
            <TableContainer>
                <Table  loading={isLoading} pagination={{pageSize:5}} columns={columns} dataSource={regionData} />
            </TableContainer>
        </MainTemplate>
    )
}


export default Region