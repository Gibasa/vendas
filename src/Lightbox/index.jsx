import styled from "styled-components";
import PropTypes from "prop-types";

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LightboxImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
`;

const Lightbox = ({ photo, onClose }) => {
  return (
    <LightboxOverlay>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <LightboxImage src={photo} alt="Expanded Photo" />
    </LightboxOverlay>
  );
};

Lightbox.propTypes = {
    photo: PropTypes.string.isRequired, 
    onClose: PropTypes.func.isRequired, 
  };

export default Lightbox;
