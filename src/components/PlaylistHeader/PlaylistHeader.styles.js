import styled from "styled-components";

export const PlaylistHeaderWrapper = styled.div`
    margin-top: 90px;

    h2 {
        margin: 0;
        display: inline-flex;
        font-style: italic;
        font-weight: bold;

        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    p {
        margin: 0;
        padding: 0 4px;
        min-height: 96px;
        
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;

        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
    }
`;