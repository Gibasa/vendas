import { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "../Modal";

const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: black;
  padding-left: 5vw;

  h1 {
    font-size: 60px;
    color: white;
  }

  p {
    color: white;
  }

  .photos {
    display: flex;
    gap: 70px;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: start;

    .photo {
      display: flex;
      flex-direction: column;
      align-items: start;
      border: 5px solid black;
      padding: 0px 20px 20px;
      background-color: white;

      h2 {
        font-size: 60px;
        margin: 0;
      }

      .dimensions {
        font-size: 16px;
        color: #666;
        margin-top: 10px;
      }
    }
  }
`;

const Photo = styled.img`
  width: 35vw;
  height: auto;
  object-fit: contain;
  cursor: pointer;
`;

const PhotoGallery = () => {
  const [photoGroups, setPhotoGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  useEffect(() => {
    // Importa o JSON com informações de imagens
    import("../assets/imagePaths.json")
      .then((data) => {
        setPhotoGroups(data.default || data);
      })
      .catch((err) => {
        console.error("Erro ao carregar os dados das imagens:", err);
      });
  }, []);

  const openModal = (photos) => {
    setSelectedPhotos(photos);
    setIsModalOpen(true);
  };

  return (
    <>
      <GalleryWrapper>
        <h1>
          GRAVURAS &<br /> PINTURAS
        </h1>
        <p>Clique nas imagens para explorar mais detalhes.</p>
        <div className="photos">
          {photoGroups.map(({ group, photos, a, l }) => {
            const mainPhoto = photos[0]; // A primeira foto do grupo é a principal
            const extras = photos.slice(1); // As fotos extras

            return (
              <div key={group} className="photo">
                <h2>{group}</h2>
                <Photo
                  src={mainPhoto}
                  alt={`Foto principal do grupo ${group}`}
                  onClick={() => openModal(extras)}
                />
                {/* Exibe as dimensões abaixo da imagem */}
                <div className="dimensions">
                  Largura: {l} cm x Altura: {a} cm
                </div>
              </div>
            );
          })}
        </div>
      </GalleryWrapper>
      {isModalOpen && (
        <Modal photos={selectedPhotos} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default PhotoGallery;
