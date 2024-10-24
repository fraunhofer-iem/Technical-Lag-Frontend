import styled from 'styled-components';

export const StickyNoteContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    bottom: ${(props) => (props.isOpen ? '0vh' : '-2em')};
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 0.3s ease-out;
    width: 100vw;
    display: flex;
    justify-content: center;
`;

export const StickyNote = styled.div`
    background-color: #62a995;
    font-size: 14px;
    color: black;
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
