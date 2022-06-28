import { FooterLink, FooterWrapper } from "./Footer.styles";

const Footer = () => {
    return (
        <FooterWrapper id="footer">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/donate">Donate!</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
        </FooterWrapper>
    );
};

export default Footer;