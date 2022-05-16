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
        padding: 4px;
    }
`;