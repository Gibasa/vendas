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

  p,
  .total-price {
    color: white;
  }

  .filter-buttons {
    margin: 20px 0;
    display: flex;
    gap: 10px;

    button {
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      background-color: #444;
      color: white;

      &:hover {
        background-color: #666;
      }
    }
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

      .dimensions,
      .price {
        font-size: 16px;
        color: #666;
        margin-top: 10px;
      }

      &.painting {
        border-color: gold;
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [filter, setFilter] = useState("all");

  const paintingPrices = {
    "52": 2500,
    "53": 6000,
    "54": 6000,
    "55": 6000,
  };

  const getPrice = (area, group) => {
    if (paintingPrices[group]) return paintingPrices[group];
    if (!area) return 0;
    if (area <= 100) return 180;
    if (area <= 300) return 380;
    return 750;
  };

  // Valores fixos e descontos
  const fixedLoteCompleto = 30000;

  // Estados para lotes com desconto
  const [loteGravuras, setLoteGravuras] = useState(0);
  const [lotePinturas, setLotePinturas] = useState(0);
  const [loteCompleto, setLoteCompleto] = useState(fixedLoteCompleto);

  useEffect(() => {
    import("../assets/imagePaths.json")
      .then((data) => {
        const groups = data.default || data;

        let total = 0;
        const updatedGroups = groups.map((item) => {
          const area = item.l * item.a;
          const price = getPrice(area, item.group);
          total += price;

          const isPainting = Object.keys(paintingPrices).includes(item.group);

          return { ...item, area, price, isPainting };
        });

        setPhotoGroups(updatedGroups);
        setTotalPrice(total);

        // Cálculo dos totais por tipo
        const gravurasTotal = updatedGroups
          .filter((item) => !item.isPainting)
          .reduce((acc, item) => acc + item.price, 0);

        const pinturasTotal = updatedGroups
          .filter((item) => item.isPainting)
          .reduce((acc, item) => acc + item.price, 0);

        // Aplicando descontos:
        // Gravuras: 25%
        // Pinturas: 15%
        setLoteGravuras(gravurasTotal * 0.75);
        setLotePinturas(pinturasTotal * 0.85);
        setLoteCompleto(fixedLoteCompleto);
      })
      .catch((err) => {
        console.error("Erro ao carregar os dados das imagens:", err);
      });
  }, []);

  const openModal = (photos) => {
    setSelectedPhotos(photos);
    setIsModalOpen(true);
  };

  const filteredGroups = photoGroups.filter((item) => {
    if (filter === "all") return true;
    if (filter === "paintings") return item.isPainting;
    if (filter === "gravuras") return !item.isPainting;
    return true;
  });

  return (
    <>
      <GalleryWrapper>
        <h1>
          GRAVURAS &<br /> PINTURAS
        </h1>
        <p>
          Gravuras originais e pinturas únicas, todas com dimensões e fotos
          detalhadas abaixo. Podemos negociar.
        </p>
        <p>Clique nas imagens para explorar mais detalhes.</p>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>Mostrar Tudo</button>
          <button onClick={() => setFilter("gravuras")}>Só Gravuras</button>
          <button onClick={() => setFilter("paintings")}>Só Pinturas</button>
        </div>

        <p className="total-price">
          Valor total de tabela (somando todas as peças individualmente):{" "}
          <strong>{totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>
        </p>

        <p className="total-price">
          Valor para compra do lote completo (somente Gravuras):{" "}
          <strong>{loteGravuras.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> (negociável)
        </p>
        <p className="total-price">
          Valor para compra do lote completo (somente Pinturas):{" "}
          <strong>{lotePinturas.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> (negociável)
        </p>
        <p className="total-price">
          Valor para compra do lote completo (Gravuras + Pinturas):{" "}
          <strong>{loteCompleto.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong> (negociável)
        </p>
        <p style={{ color: "white", fontStyle: "italic" }}>
          Valores com desconto para compra do lote completo. Negociações são bem-vindas.
        </p>

        <div className="photos">
          {filteredGroups.map(
            ({ group, photos, a, l, area, price, isPainting }) => {
              const mainPhoto = photos[0];
              const extras = photos.slice(1);

              return (
                <div
                  key={group}
                  className={`photo ${isPainting ? "painting" : ""}`}
                >
                  <h2>
                    {isPainting ? `${group} - Pintura Original` : group}
                  </h2>
                  <Photo
                    src={mainPhoto}
                    alt={`Foto principal do grupo ${group}`}
                    onClick={() => openModal(extras)}
                  />
                  <div className="dimensions">
                    Largura: {l} cm x Altura: {a} cm (Área: {area} cm²)
                  </div>
                  <div className="price">
                    Preço: {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </GalleryWrapper>

      {isModalOpen && (
        <Modal photos={selectedPhotos} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default PhotoGallery;
