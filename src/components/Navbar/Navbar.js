import { useContext } from "react";
import { Navbar as CustomNavbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { UserContext } from "../Home/Home";
import { NavbarBrand, NavbarLinks, ProfilePicture } from "./Navbar.styles";

const Navbar = () => {
    const {requestAuthorization} = useContext(AuthorizationContext);
    const user = useContext(UserContext);
    
    const hasUserLoaded = () => {
        return Object.keys(user).length !== 0;
    };

    return (
        <CustomNavbar className="justify-content-between" expand="lg">
            <NavbarBrand>Playlist Genetic</NavbarBrand>
            {hasUserLoaded() ?
                <NavbarLinks>
                    <CustomNavbar.Text>Welcome, {user.display_name}</CustomNavbar.Text>
                    <ProfilePicture src={user.images[0].url}
                        onClick={() => window.open(user.external_urls.spotify)}
                    />
                    <CustomNavbar.Text>Logout</CustomNavbar.Text>
                </NavbarLinks>
                :
                <NavbarLinks>
                    <CustomNavbar.Text>
                        <Link to="" onClick={requestAuthorization}>Login</Link>
                    </CustomNavbar.Text>
                </NavbarLinks>
            }
        </CustomNavbar>
    );
};

export default Navbar;