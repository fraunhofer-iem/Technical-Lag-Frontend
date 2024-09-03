import styled from "styled-components";

export const Box = styled.div<{ $isfooteropen: boolean }>`
    background: var(--footer-background);
    color: var(--footer-text-color);
    bottom: 0;
    position: fixed;
    height: ${(props) => (props.$isfooteropen? '2.5em' : '0')};
    overflow: hidden;
    transition: height 0.3s ease-out;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;

export const FooterContainer = styled.div<{ $isfooteropen: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 60vw;
    margin: 0 auto;
    background: var(--footer-background);
    color: var(--footer-text-color);
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
    color: var(--footer-text-color);
    margin: auto;
    font-size: 13px;
    font-weight: 400;

    &:hover {
        color: var(--footer-link-hover);
        transition: 300ms ease-in;
    }
`;

export const Copyright = styled.p`
    font-size: 12px;
    color: var(--footer-text-color);
    font-weight: 400;
`
