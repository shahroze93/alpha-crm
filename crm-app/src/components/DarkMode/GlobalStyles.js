import { createGlobalStyle} from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Roboto, sans-serif;
    transition: all 0.50s linear;
  }

  .customerBox {
    background: ${({ theme }) => theme.customerBox};
  }

  h3, a {
    color: ${({ theme }) => theme.headers};
  }

  .commLinks {
    color: ${({ theme }) => theme.comLinks}
  }

  h2, h1 {
    color: ${({ theme }) => theme.headers2};
  }  

  .searchLabel {
    color: ${({ theme }) => theme.headers};
  }

  .commFormLabel {
  color: ${({ theme }) => theme.text};
  }

  .comms:hover {
  background: ${({ theme }) => theme.contentBox};
  }

  .contacts:hover {
    background: ${({ theme }) => theme.contentBox};
    }
  `