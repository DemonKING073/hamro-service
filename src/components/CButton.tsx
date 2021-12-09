import { Button } from "antd";
import React, { FC } from "react";
import styled from "styled-components";



interface ButtonProp {
    variant: "normal" | "danger"; 
    title: string ;
    onClick: () => void ;
}


const CButton:FC<ButtonProp> = ({variant, title, onClick}) => {
    return (
        <CustomButton variant={variant} onClick={onClick}>
            {title}
        </CustomButton>
    );
}

const CustomButton = styled(Button)<{variant: 'normal' | 'danger'}>`
    background: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
    border-color: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
    color: white;
    width: 80px;
    &:hover{
        color: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
        border-color: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
    }   
    &:focus{
        border-color: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
        color: ${props => props.variant === 'normal'?'#6984FF':'#FE7474'};
    }
`

export default CButton