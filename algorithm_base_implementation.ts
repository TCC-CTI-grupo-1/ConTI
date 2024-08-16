//Assumindo que cada node segue a estrutura

interface Data{
    questao_total:number;
    questao_acerto:number;
    indicador:number;
}

interface TreeNode{
    children:TreeNode[];
    data:Data;

}

class Data implements Data {
    constructor(questao_total:number,questao_acerto:number)
    {
        this.questao_total = questao_total;
        this.questao_acerto = questao_acerto;
        this.indicador = questao_acerto/questao_total;
    }
}

class TreeNode {
    constructor(child:TreeNode[], data:Data)
    {
        this.children = child;
        this.data = data;
    }
}

function pegarAcertosDoBD()
{
    return 0;
}


function calculateIndices(atual:TreeNode)
{
    if(atual.children.length === 0)
    {
        atual.data.questao_acerto = pegarAcertosDoBD();
        atual.data.questao_total = pegarAcertosDoBD();
    }
    let total = 0;
    let certo = 0;
    for(const node of atual.children)
    {
        calculateIndices(node);
        total+=node.data.questao_total;
        certo+=node.data.questao_acerto;
    }
    atual.data.questao_acerto = certo;
    atual.data.questao_total = total;
    atual.data.indicador = certo/total;
}


/*
USER
├── Língua Portuguesa
│   ├── Interpretação de texto
│   ├── Morfologia
│   │   ├── Pronomes e verbos
│   │   ├── Proposições e conjunções
│   │   └── Modos verbais
│   ├── Sintaxe
│   │   ├── Acentuação gráfica
│   │   ├── Análise sintática
│   │   │   ├── Tipos de sujeito
│   │   │   ├── Tipos de predicado
│   │   │   └── Predicação verbal
│   │   ├── Flexões
│   │   ├── Crase
│   │   └── Concordância
│   └── Semântica & Estilística
│       ├── Sinônimos e antônimos
│       ├── Figuras de linguagem
│       └── Variações linguísticas
├── Matemática
│   ├── Álgebra
│   │   ├── Produtos notáveis
│   │   ├── Equações de primeiro grau
│   │   ├── Equações de segundo grau
│   │   ├── Sistemas de primeiro grau
│   │   └── Simplificação de expressões algébricas
│   ├── Geometria
│   │   ├── Teorema de pitágoras
│   │   ├── Perímetro de polígonos regulares
│   │   ├── Área de poligonos regulares
│   │   └── Ângulos de poligonos regulares
│   └── Aritmética
│       ├── Frações
│       ├── Operações matemáticas simples
│       ├── Propriedade comutativa, associativa e distribuitiva
│       ├── Juros simples
│       └── Juros compostos
├── Ciências Humanas
│   ├── História
│   │   ├── Antiguidade Clássica
│   │   │   ├── Grécia
│   │   │   └── Roma
│   │   ├── Alta Idade Média
│   │   ├── Feudalismo
│   │   ├── Absolutismo
│   │   ├── Expansão marítima
│   │   ├── Colonização da América
│   │   ├── Iluminismo e Revoluções Burguesas
│   │   ├── Brasil Imperial
│   │   ├── História do Brasil
│   │   │   ├── Brasil Colônia
│   │   │   ├── República Velha
│   │   │   ├── Brasil Imperial
│   │   │   ├── Ditadura Militar
│   │   │   ├── Era Vargas
│   │   │   └── Período democrático
│   │   └── "Ismos"
│   │       ├── Liberalismo
│   │       ├── Nacionalismo
│   │       ├── Socialismo
│   │       ├── Imperialismo
│   │       └── Neoliberalismo
│   └── Geografia
│       ├── Lugar, paisagem e espaço geográfico
│       ├── Cartografia e geomorfologia
│       ├── Biomas
│       ├── Socioeconomia no Brasil
│       ├── Questões ambientais
│       ├── Movimentos migratórios
│       └── Geopolítica mundial
│           ├── Conflitos armados
│           └── Globalização
└── Ciências Naturais
    ├── Biologia
    │   ├── Drogas
    │   ├── Métodos contraceptivos
    │   ├── Sistema imunológico
    │   ├── Doenças
    │   │   ├── AIDS
    │   │   ├── Dengue
    │   │   ├── Chagas
    │   │   └── Febre amarela
    │   ├── Reinos
    │   ├── Ecologia
    │   ├── Biodiversidade
    │   ├── Desmatamento
    │   ├── Reciclagem
    │   ├── Relações alimentares
    │   └── 3Rs
    ├── Química
    │   ├── Fusão e ebulição
    │   ├── Propriedades da matéria
    │   ├── Tecnologia da cana
    │   ├── Tecnologia do petróleo
    │   ├── Misturas
    │   ├── Separação de misturas
    │   ├── Substâncias
    │   ├── Fontes energéticas
    │   ├── Modelos atômicos
    │   ├── Reações químicas
    │   └── Leis ponderais
    └── Física
        ├── Leis de Newton
        ├── Eletricidade
        ├── Montagem de circuitos
        ├── Magnetismo
        ├── Ondas
        └── Cinemática escalar
        */