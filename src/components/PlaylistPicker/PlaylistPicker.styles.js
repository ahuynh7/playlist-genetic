import styled from "styled-components";

export const PlaylistPickerWrapper = styled.div`
    margin: 10px auto;
    width: var(--sideMargin);
`;

export const PlaylistToast = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    svg {
        fill: black;
        align-self: center;
    }

    h4 {
        align-self: center;
    }
`;