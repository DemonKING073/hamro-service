import { createContext, useEffect, useState } from "react";
import LocalStorageService from "../services/LocalStorageServices";
import RegionProp from '../types/Region'

interface IUserContext {
    roles: Role[];
    setRoles: (value: Role[]) => void;
    workingRegion: RegionProp | undefined;
    setWorkingRegion: (data: RegionProp) => void;
}

interface Role{
    id: number;
    name: string;
    region: {
      id: number,
      name: string,
      slug: string,
      location:{
        lat: number,
        lng: number,
      },
      active: boolean
    }
  } 

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC = ({children}) => {
    const [ roles, setRoles ] = useState<Role[]>([])
    const [ workingRegion, setWorkingRegion ] = useState<RegionProp>()
    useEffect(()=>{
        const hamroRoles = LocalStorageService.getRoles()
        if(hamroRoles) setRoles(hamroRoles)
    },[])
    return (
        <UserContext.Provider value={{
            roles,
            setRoles,   
            workingRegion,
            setWorkingRegion
        }}>
            {children}
        </UserContext.Provider>
    );
}
