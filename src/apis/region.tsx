import axios from "axios";
import axiosInstance from "../axiosInstance";
import RegionProp from '../types/Region'

type regionInputProp = Omit<RegionProp, 'id' | 'slug'>

export const getRegion = async () => (await axiosInstance.get<RegionProp[]>('/region')).data

export const addRegion = async (regionData: regionInputProp) => (await axiosInstance.post<regionInputProp[]>('/region',regionData)).data

export const updateRegion = async (regionData: regionInputProp, regionId: number | undefined) => (await axiosInstance.put<regionInputProp>(`/region/${regionId}`, regionData)).data

export const removeRegion = async (regionId: number| undefined) => (await axiosInstance.delete(`/region/${regionId}`)).data

