import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthorizationContext } from "../../App";
import { UserContext } from "../Home/Home";
import { NavbarBrand, NavbarLinks, NavbarWrapper, ProfilePicture } from "./Navbar.styles";
import { persistor } from "../../redux/store";

const Navbar = () => {
    const {requestAuthorization} = useContext(AuthorizationContext);
    const user = useContext(UserContext);
    const navigate = useNavigate();
    
    const hasUserLoaded = () => {
        return Object.keys(user).length !== 0;
    };
    
    const handleLogout = () => {
        persistor.purge();
        window.location.reload();
    };

    return (
        <NavbarWrapper expand="lg">
            <NavbarBrand onClick={() => navigate("/main")}>Playlist Genetic</NavbarBrand>
            {hasUserLoaded() ?
                <NavbarLinks>
                    <ProfilePicture src={user.images[0].url}
                        onClick={() => window.open(user.external_urls.spotify)}
                    />
                    <NavbarWrapper.Text>
                        {/* handle logout */}
                        <Link to="" onClick={handleLogout}>Logout</Link>
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