import styled from "styled-components";


export const Menu = styled.nav`
    left: ${({ open }) => (open ? "0" : "-100%")}; //Import
    display:flex;
    width: 100%;
    height: 91.5vh;
    position: absolute;
    top: 80px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 1s all ease-in;
    background-color: rgb(22, 22, 22)
  }
`;

