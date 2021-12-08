import axiosInstance from "../axiosInstance";
import BaseProduct from "../types/BaseProduct";
import RegionProp from '../types/Region'

type CreateBaseProductData = Omit<BaseProduct, 'id' | 'slug'>


export const getBaseProducts = async (regionId: number) => (await axiosInstance.get<BaseProduct[]>('/base_product',{ headers: { 'regionId': `${regionId}` } })).data

export const createBaseProducts = (createBaseProductData: CreateBaseProductData) =>  axiosInstance.post('/base_product', createBaseProductData)


