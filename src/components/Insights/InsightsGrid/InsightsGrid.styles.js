import { Card } from "react-bootstrap";
import styled from "styled-components";

export const InsightsGridContent = styled.div`
    margin: 30px 0;
    max-height: 69vh;
    padding: 8px;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(269px, 1fr));
    grid-gap: 0.88rem;
`;

export const InsightsGridCard = styled(Card)`
    padding: 8px;
    border-radius: 3px;
    flex-direction: row;

    #details {
        margin-left: 5px;
        margin-right: 6.5px;
        padding: 4px;
    }

    #references {
        display: inline-flex;
        max-width: 100%;

        #artist_ref {
            min-width: max-content;
        }

        #dot {
            min-width: 16px;
            align-self: center;
        }
    }
`;

export const TrackImage = styled.img`
    width: ${props => props.width}px;
    object-fit: cover;
    position: relative;

    :hover {
        cursor: pointer;
    }
`;

export const TrackName = styled.p`
    margin-bottom: auto;
    line-height: 1;
    max-height: 40px;
    font-weight: bold;
    font-size: var(--fontMed);

    overflow: hidden;
    word-wrap: break-word;
    text-overflow: ellipsis;
    display: -webkit-box;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    :hover {
        cursor: pointer;
    }
`;

export const TrackReference = styled.p`
    margin: 0;
    font-size: var(--fontSmall);

    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;

    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;    

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;