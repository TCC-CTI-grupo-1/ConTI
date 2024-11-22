import { AreaDTO } from "../../DTO/AreaDTO";
import { AreaDAO } from "../../DAO/AreaDAO";

const convertStringToAreaDTOs =  async (input: string) => {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const areaDTOs: AreaDTO[] = [];
    const parentStack: { id: number, indent: number }[] = [];
    let idCounter = 300;

    for (const line of lines) {
        const indent = line.search(/\S/); // Find the first non-whitespace character
        const name = line.trim();

        while (parentStack.length > 0 && parentStack[parentStack.length - 1].indent >= indent) {
            parentStack.pop();
        }

        const parentId = parentStack.length > 0 ? parentStack[parentStack.length - 1].id : null;

        const area: AreaDTO = {
            id: idCounter++,
            name: name,
            parent_id: parentId
        };

        areaDTOs.push(area);
        parentStack.push({ id: area.id, indent: indent });
        await new AreaDAO().registerArea(area)
    }

    return areaDTOs;
};
    convertStringToAreaDTOs(`
Língua Portuguesa
  Interpretação de texto
  Morfologia
    Pronomes e verbos
    Proposições e conjunções
    Modos verbais
  Sintaxe
    Acentuação gráfica
    Análise sintática
      Tipos de sujeito
      Tipos de predicado
      Predicação verbal
    Flexões
    Crase
    Concordância
  Semântica & Estilística
    Sinônimos e antônimos
    Figuras de linguagem
    Variações linguísticas
   
   
Matemática
  Álgebra
    Produtos notáveis
    Equações de primeiro grau
    Equações de segundo grau
    Sistemas de primeiro grau
    Simplificação de expressões algébricas
  Geometria
    Teorema de pitágoras
    Perímetro de polígonos regulares
    Área de poligonos regulares
    Ângulos de poligonos regulares
  Aritmética
    Frações
    Operações matemáticas simples
    Propriedade comutativa, associativa e distribuitiva
    Juros simples
    Juros compostos
   
Ciências Humanas
  História
    Antiguidade Clássica
      Grécia
      Roma
    Alta Idade Média
    Feudalismo
    Absolutismo
    Expansão marítima
    Colonização da América
    Iluminismo e Revoluções Burguesas
    Brasil Imperial
    História do Brasil
      Brasil Colônia
      República Velha
      Brasil Imperial
      Ditadura Militar
      Era Vargas
      Período democrático
   
    Ideologias políticas e econômicas
      Liberalismo
      Nacionalismo
      Socialismo
      Imperialismo
      Neoliberalismo
  Geografia
    Lugar, paisagem e espaço geográfico
    Cartografia e geomorfologia
    Biomas
    Socioeconomia no Brasil
    Questões ambientais
    Movimentos migratórios
    Geopolítica mundial
      Conflitos armados
      Globalização

Ciências Naturais
  Biologia
    Drogas
    Métodos contraceptivos
    Sistema imunológico
    Doenças
      AIDS
      Dengue
      Chagas
      Febre amarela
    Reinos
    Ecologia
    Biodiversidade
    Desmatamento
    Reciclagem
    Relações alimentares
    3Rs
  Química
    Fusão e ebulição
    Propriedades da matéria
    Tecnologia da cana
    Tecnologia do petróleo
    Misturas
    Separação de misturas
    Substâncias
    Fontes energéticas
    Modelos atômicos
    Reações químicas
    Leis ponderais
  Física
    Leis de Newton
    Eletricidade
    Montagem de circuitos
    Magnetismo
    Ondas
    Cinemática escalar
`);

export { convertStringToAreaDTOs };