import styled from "styled-components";

export const Box = styled.div<{ isOpen: boolean }>`
    background: #464646;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    position: fixed;
    z-index: 1000; /* Ensure it stays above other content */
    height: ${(props) => (props.isOpen? '5vh' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-out;
`;

export const FooterContainer = styled.div<{ isOpen: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    margin: 0 auto;
    background: #63aa96;
    padding: 1px;
    height: ${(props) => (props.isOpen? '5vh' : '0')};
    z-index: 1000;
    overflow: hidden;
    transition: height 0.3s ease-out;
`;

export const Column = styled.div<{ marginLeft?: string }>`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1%;
`;

export const FooterLink = styled.a`
    color: #fff;
    margin: auto;
    font-size: 12px;

    &:hover {
        color: green;
        transition: 300ms ease-in;
    }
`;

export const Copyright = styled.p`
    font-size: 12px;
    color: #fff;
`
