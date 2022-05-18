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

    @keyframes floating {
        0% {transform: translate(0,  0px);}
        50%  {transform: translate(0, 12px);}
        100%   {transform: translate(0, -0px);}   
    }

    svg {
        fill: black;
        align-self: center;
    }

    h4 {
        align-self: center;
    }
`;