import { NavbarBrand as CustomNavbarBrand } from "react-bootstrap";
import styled from "styled-components";

export const NavbarBrand = styled(CustomNavbarBrand)`
    margin-left: 20px;
    font-size: 25px;
`;

export const NavbarLinks = styled.span`
    margin-right: 20px;
`;

export const ProfilePicture = styled.img`
    margin: 0 10px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
`;