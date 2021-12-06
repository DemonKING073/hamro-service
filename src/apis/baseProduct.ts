import axiosInstance from "../axiosInstance";
import BaseProduct from "../types/BaseProduct";

type CreateBaseProductData = Omit<BaseProduct, 'id' | 'slug'>

export const getBaseProducts = async () => (await axiosInstance.get<BaseProduct[]>('/base_product')).data

export const createBaseProducts = (createBaseProductData: CreateBaseProductData) =>  axiosInstance.post('/base_product', createBaseProductData)


