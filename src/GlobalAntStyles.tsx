import { createGlobalStyle } from 'styled-components'

export const GlobalAntStyles =  createGlobalStyle`
    
    .ant-btn-primary {
        background: var(--primary);
        border-color: var(--primary);
        &:hover{
            background: red;
            border-color: var(--primary);
        }
    }
`