import styled from "styled-components";

export const Box = styled.div<{ $isfooteropen: boolean }>`
    background: #212f36;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100vw;
    position: fixed;
    height: ${(props) => (props.$isfooteropen? '2.5em' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-out;
`;

export const FooterContainer = styled.div<{ $isfooteropen: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50vw;
    margin: 0 auto;
    background: #63aa96;
    padding: 1px;
    height: ${(props) => (props.$isfooteropen? '2.5em' : '0')};
    z-index: 1000;
    overflow: hidden;
    transition: height 0.3s ease-out;
    border-top-left-radius: 8px;    
    border-top-right-radius: 8px;
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
    color: #000000;
    margin: auto;
    font-size: 12px;
    font-weight: 500;

    &:hover {
        color: #ffffff;
        transition: 300ms ease-in;
    }
`;

export const Copyright = styled.p`
    font-size: 12px;
    color: #000000;
    font-weight: 500;
`
