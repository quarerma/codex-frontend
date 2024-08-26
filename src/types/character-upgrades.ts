export const character_upgrades = [
  { label: 'Bônus de Perícia', value: 'PERICIA' },
  { label: 'Número de Perícias', value: 'NUM_DE_PERICIA' },
  { label: 'Atributo', value: 'ATRIBUTO' },
  { label: 'Defesa', value: 'DEFESA' },
  { label: 'Proficiência', value: 'PROFICIENCIA' },
  { label: 'Resistência', value: 'RESISTENCIA' },
  // { GERAL, FÍSICO, SANGUE, MORTE, CONHECIMENTO, ENERGIA, MEDO, TESTES }
  { label: 'Margem de Crítico', value: 'MARGEM_DE_CRITICO' },
  { label: 'Multiplicador de Crítico (Soma)', value: 'MULTIPLCADOR_CRITICO_SOMA' },
  { label: 'Multiplicador de Crítico (Multiplica)', value: 'MULTIPLCADOR_CRITICO_MULTIPLICA' },
  { label: 'Limite de Pontos de Esforço', value: 'LIMITE_PE' },
  { label: 'Vida por Nível', value: 'VIDA_P_NEX' },
  { label: 'Vida Máxima', value: 'VIDA_MAX' },
  { label: 'Pontos de Esforço por Nível', value: 'PE_P_NEX' },
  { label: 'Pontos de Esforço Máximo', value: 'PE_MAX' },
  { label: 'Dado de Dano - Mesmo dado (melee)', value: 'MESMO_DADO_DE_DANO_MELEE' },
  { label: 'Dado de Dano - Pode critar', value: 'DADO_DE_DANO' },
  { label: 'Dado de Dano Extra', value: 'DADO_DE_DANO_EXTRA' },
  { label: 'Dextreza no Dano (disparo)', value: 'DEX_NO_DANO' },
  { label: 'Inteligência no Dano (fogo)', value: 'INT_NO_DANO' },
  { label: 'Deslocamento', value: 'DESLOCAMENTO' },
];

export type CharacterUpgrade = {
  upgradeTarget: string;
  upgradeValue: number;
};

export type Atributes = [
  { label: 'Força'; value: 'STRENGTH' },
  { label: 'Agilidade'; value: 'DEXTERITY' },
  { label: 'Vigor'; value: 'VITALITY' },
  { label: 'Inteligência'; value: 'INTELLIGENCE' },
  { label: 'Presença'; value: 'PRESENCE' }
];
