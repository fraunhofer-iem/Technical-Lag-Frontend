import styled from 'styled-components';

export const StickyNoteContainer = styled.div<{ isOpen: boolean }>`
    position: fixed;
    bottom: ${(props) => (props.isOpen ? '0vh' : '-5vh')};
    left: 50%;
    transform: translateX(-50%);
    transition: bottom 0.3s ease-out;
    width: 100vw;
    display: flex;
    justify-content: center;
`;

export const StickyNote = styled.div`
    background-color: #62a995;
    border: 1px solid #ffffff;
    border-radius: 5px;
    width: 100px;
    height: 50px;
    display: flex;
    align-items: baseline;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;
`;