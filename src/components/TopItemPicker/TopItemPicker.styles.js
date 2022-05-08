import { ListGroup as CustomListGroup, ListGroupItem as CustomListGroupItem } from "react-bootstrap";
import styled from "styled-components";

export const ItemsLabel = styled.h2`
    text-align: center;
    margin: 50px 0 30px 0;
`;

export const ListGroup = styled(CustomListGroup)`
    justify-content: center;
    width: 69%;
    margin: auto;
    font-size: var(--fontSmall);
    cursor: pointer;
`;

export const ListGroupItem = styled(CustomListGroupItem)`
    text-align: center;
`;