import axiosInstance from "../axiosInstance";
import ProductProps from "../types/Product";


export const getProducts = async (regionId: number) => (await axiosInstance.get('/product/all', {headers: { 'regionId': `${regionId}`}})).data 

export const getProductsFeatured = async (regionId: number) => (await axiosInstance.get('/product/featured', {headers: { 'regionId': `${regionId}`}})).data 

export const getProductsPopular = async (regionId: number) => (await axiosInstance.get('/product/popular', {headers: { 'regionId': `${regionId}`}})).data 

export const deleteProduct = async(id: number | undefined) => (await axiosInstance.delete(`/product/${id}`))

