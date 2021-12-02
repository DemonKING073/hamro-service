import { createGlobalStyle } from 'styled-components'

export const GlobalAntStyles =  createGlobalStyle`
    
    .ant-btn-primary {
        background: var(--primary);
        border-color: var(--primary);
        &:hover{
            background: #C07200;
            border-color: var(--secondary);
        }
    }
`