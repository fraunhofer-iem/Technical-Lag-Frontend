import styled from 'styled-components';

export const StickyNoteContainer = styled.div<{ $isfooteropen: boolean }>`
    position: fixed;
    bottom: ${(props) => (props.$isfooteropen ? '0vh' : '-2em')};
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 0.3s ease-out;
    width: 100vw;
    display: flex;
    justify-content: center;
`;

export const StickyNote = styled.div`
    background: var(--footer-bg);
    font-size: 14px;
    color: var(--footer-text-color);
    border-radius: 5px;
    width: 100px;
    height: 50px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 1.2em;
    font-weight: 500;
`;
