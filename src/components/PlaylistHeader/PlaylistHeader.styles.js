import styled from "styled-components";

export const PlaylistHeaderWrapper = styled.div`
    margin-top: 69px;

    div {
        display: flex;
    }

    #header_title {
        margin: 0;
        font-style: italic;
        font-weight: bold;

        :hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    #header_extLink {
        margin-left: 10px;
        align-self: center;

        :hover {
            cursor: pointer;
        }
    }

    #header_desc {
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