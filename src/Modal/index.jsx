import { useState } from "react";
import styled from "styled-components";
import Lightbox from "../Lightbox";
import PropTypes from "prop-types";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 80%;
  overflow: auto;
`;

const Photo = styled.img`
  width: 40vw;
  height: auto;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
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

const Modal = ({ photos, onClose }) => {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  return (
    <>
      <ModalOverlay>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalContent>
        <h2>Clique nas fotos para ampliar</h2>

          {photos.map((photo, index) => (
            <Photo
              key={index}
              src={photo}
              alt="Modal Photo"
              onClick={() => setLightboxPhoto(photo)}
            />
          ))}
        </ModalContent>
      </ModalOverlay>
      {lightboxPhoto && (
        <Lightbox
          photo={lightboxPhoto}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </>
  );
};
Modal.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired, // Array de URLs de imagens
  onClose: PropTypes.func.isRequired, // Função para fechar o modal
};

export default Modal;
