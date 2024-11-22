import fs from 'fs/promises'; // Usa a versão assíncrona de fs
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter o diretório do arquivo atual

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho para a pasta de imagens
const imagesDir = path.join(__dirname, 'public/images');

async function generateImagePaths() {
  try {
    const files = await fs.readdir(imagesDir);

    // Filtra apenas os arquivos de imagem
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    // Agrupa as imagens por prefixo (assumindo padrão como "1-1.jpg", "1-2.jpg")
    const groups = imageFiles.reduce((acc, file) => {
      const [group] = file.split('-');
      const groupKey = parseInt(group, 10);

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(`/images/${file}`);

      return acc;
    }, {});

    // Organiza as imagens por grupo
    const imagePaths = Object.entries(groups).map(([group, photos]) => ({
      group,
      photos
    }));

    // Escreve o arquivo JSON na pasta 'src/assets'
    await fs.writeFile(path.join(__dirname, 'src/assets/imagePaths.json'), JSON.stringify(imagePaths, null, 2));
    console.log('Arquivo JSON de imagens gerado com sucesso!');
  } catch (err) {
    console.error('Erro ao gerar o JSON das imagens:', err);
  }
}

// Executa a função
generateImagePaths();
