import React, { FC } from "react"
import styled from "styled-components"

interface Props {
    Icon: any;
    onClick?: () => void;
    text: string;
}
const Container = styled.div`
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
    height: 40px;
    margin-top: 10px;
    color: #424242;
    &:hover{
        color: var(--primary) ;
    }
`
const Text = styled.span`
    font-size: 18px;
`

const SidebarItem:FC<Props> = ({Icon, onClick, text}) => {
    return(
        <Container>
            <div style={{marginLeft:10}}>{<Icon style={{ fontSize: 30}}  />}</div>
            <Text style={{marginLeft:15}}>{text}</Text>
        </Container>
    )
}

export default SidebarItem