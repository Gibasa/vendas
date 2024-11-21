import styled from "styled-components";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-family: Arial, sans-serif;
  width: 80vw;
  background-color: white;
`;

const ContactInfo = styled.div`
  display: flex;
  gap: 20px;
  font-size: 16px;
  color: #333;

  a {
    color: #333;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    &:hover {
      color: #007bff;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <ContactInfo>
        <a href="mailto:gibasa@gmail.com"><FaEnvelope />gibasa@gmail.com</a>
        <a href="https://wa.me/5571994066099" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />(71) 999406-6099
        </a>
      </ContactInfo>
    </HeaderWrapper>
  );
};

export default Header;
