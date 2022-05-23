import styled from "styled-components";

export const InsightsWrapper = styled.div`
    margin: 0 auto 21vh auto;
    width: var(--sideMargin);
    display: flex;
    flex-direction: column;
`;

export const InsightsLabel = styled.h3`
    margin: 0 0 5px 0;
    text-transform: capitalize;
    font-weight: bold;
`;

export const InsightsDescription = styled.p`
    margin-bottom: 20px;
    font-size: var(--fontSmall);

    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;

    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`;

export const Track = styled.div`
    height: 6px;
    width: calc(100% - 30px);
    background-color: var(--medGrey);
    border-radius: 3px;
    align-self: center;
`;

export const Thumb = styled.div`
    height: 21px;
    width: 21px;
    background-color: #999;
    border-radius: 21px;
`;