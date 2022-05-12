import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { UserContext } from "../Home/Home";
import { NavbarBrand, NavbarLinks, NavbarWrapper, ProfilePicture } from "./Navbar.styles";

const Navbar = () => {
    const {requestAuthorization} = useContext(AuthorizationContext);
    const user = useContext(UserContext);
    
    const hasUserLoaded = () => {
        return Object.keys(user).length !== 0;
    };

    return (
        <NavbarWrapper expand="lg">
            <NavbarBrand>Playlist Genetic</NavbarBrand>
            {hasUserLoaded() ?
                <NavbarLinks>
                    <ProfilePicture src={user.images[0].url}
                        onClick={() => window.open(user.external_urls.spotify)}
                    />
                    <NavbarWrapper.Text>
                        {/* handle logout */}
                        <Link to="" onClick={() => window.location.reload()}>Logout</Link>
                    </NavbarWrapper.Text>
                </NavbarLinks>
                :
                <NavbarLinks>
                    <NavbarWrapper.Text>
                        <Link to="" onClick={requestAuthorization}>Login</Link>
                    </NavbarWrapper.Text>
                </NavbarLinks>
            }
        </NavbarWrapper>
    );
};

export default Navbar;