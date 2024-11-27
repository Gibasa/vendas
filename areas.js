import fs from 'fs/promises'; // Usa a versão assíncrona de fs
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter o diretório do arquivo atual

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do arquivo JSON
const filePath = path.join(__dirname, 'src/assets/imagePaths.json');

// Função assíncrona para ler, agrupar, ordenar e salvar os dados
async function groupAndSortAreas() {
  try {
    // Lê o arquivo JSON
    const data = await fs.readFile(filePath, 'utf8');

    // Converte o conteúdo do arquivo para um objeto JavaScript
    const groups = JSON.parse(data);

    // Cria um objeto para agrupar as áreas
    const areaGroups = {};

    groups.forEach(group => {
      const area = group.area;
      // Se a área já estiver no objeto, soma ao total, senão inicializa com o valor
      if (areaGroups[area]) {
        areaGroups[area] += 1; // Contagem do total de grupos com a mesma área
      } else {
        areaGroups[area] = 1;
      }
    });

    // Converte o objeto para um array de objetos e ordena pelas áreas
    const sortedAreaGroups = Object.entries(areaGroups)
      .map(([area, total]) => ({ area: Number(area), total })) // Converte para número
      .sort((a, b) => a.area - b.area); // Ordena pela área em ordem crescente

    // Exibe o resultado agrupado e ordenado
    console.log('Áreas agrupadas e ordenadas:');
    console.log(sortedAreaGroups);

    // Grava o resultado em um novo arquivo (ou sobrescreve, se preferir)
    const resultFilePath = path.join(__dirname, 'sorted_area_groups.json');
    await fs.writeFile(resultFilePath, JSON.stringify(sortedAreaGroups, null, 2), 'utf8');

    console.log('Resultado agrupado e ordenado salvo em "sorted_area_groups.json"');
  } catch (err) {
    console.error('Erro ao processar o arquivo:', err);
  }
}

// Chama a função para agrupar e ordenar as áreas
groupAndSortAreas();
