import fs from 'fs/promises'; // Usa a versão assíncrona de fs
import path from 'path';
import { fileURLToPath } from 'url'; // Para obter o diretório do arquivo atual

// Obtém o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho do arquivo JSON
const filePath = path.join(__dirname, 'src/assets/imagePaths.json');

// Função assíncrona para ler, modificar e salvar o JSON
async function updateJson() {
  try {
    // Lê o arquivo JSON
    const data = await fs.readFile(filePath, 'utf8');

    // Converte o conteúdo do arquivo para um objeto JavaScript
    const groups = JSON.parse(data);

    // Adiciona a área a cada grupo
    groups.forEach(group => {
      group.area = group.a * group.l; // Calcula a área (a * l)
    });

    // Converte o objeto JavaScript de volta para JSON
    const updatedJson = JSON.stringify(groups, null, 2);

    // Grava o arquivo JSON modificado de volta no sistema
    await fs.writeFile(filePath, updatedJson, 'utf8');

    console.log('Arquivo JSON atualizado com sucesso!');
  } catch (err) {
    console.error('Erro ao processar o arquivo:', err);
  }
}

// Chama a função para atualizar o JSON
updateJson();
