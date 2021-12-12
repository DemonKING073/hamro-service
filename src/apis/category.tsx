import axiosInstance from '../axiosInstance'
import CategoryProp from '../types/Category'



export const getCategory = async (regionId: number) => (await axiosInstance.get<CategoryProp[]>('/category',{ headers: { 'regionId': `${regionId}` }})).data

export const deleteCategory = async (categoryId: number | undefined) => (await axiosInstance.delete(`/category/${categoryId}`)).data 
