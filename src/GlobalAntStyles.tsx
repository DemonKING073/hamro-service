import { createGlobalStyle } from 'styled-components'

export const GlobalAntStyles =  createGlobalStyle`
    
    .ant-btn-primary {
        background: var(--primary);
        border-color: var(--primary);
        &:hover{
            background: white;
            color: var(--primary);
            border-color: var(--primary);
        }
    }
    .ant-table table {
        border-radius: 2px 2px 2px 2px;
    }
    .ant-table-pagination.ant-pagination {
        margin-right: 10px;
    }
`