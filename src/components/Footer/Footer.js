import { useLocation } from "react-router-dom";
import { FooterLink, FooterWrapper } from "./Footer.styles";

const Footer = () => {
    const {pathname} = useLocation();

    return (
        <FooterWrapper id="footer">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to={pathname}
                onClick={() => window.open("https://www.buymeacoffee.com/19ahuynh")}
            >
                Donate!
            </FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
        </FooterWrapper>
    );
};

export default Footer;