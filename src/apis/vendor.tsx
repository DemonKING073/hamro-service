import axiosInstance from '../axiosInstance'
import VendorProps from '../types/Vendor'


export const PostVendor = async (vendorDatas: VendorProps) => (await axiosInstance.post<VendorProps>('/vendor', vendorDatas))

export const GetVendor = async (regionId: number) => (await axiosInstance.get<VendorProps>('/vendor', { headers: { 'regionId': `${regionId}`}})).data

export const DeleteVendor = async(vendorId: number | undefined ) => (await axiosInstance.delete(`/vendor/${vendorId}`))

