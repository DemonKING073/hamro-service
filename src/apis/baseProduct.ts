import axiosInstance from "../axiosInstance";
import BaseProduct from "../types/BaseProduct";

type CreateBaseProductData = Omit<BaseProduct, 'id' | 'slug'>

interface CategoryProp {
    id: number;
    name: string;
    slug: string;
    level: number;
    image: string;
    regionId: number;
}

export const getBaseProducts = async (regionId: number) => (await axiosInstance.get<BaseProduct[]>('/base_product',{ headers: { 'regionId': `${regionId}` } })).data

export const createBaseProducts = async(createBaseProductData: CreateBaseProductData) => await axiosInstance.post('/base_product', createBaseProductData)

export const getCategory = async (regionId: number) => (await axiosInstance.get<CategoryProp[]>('/category',{ headers: { 'regionId': `${regionId}` }})).data