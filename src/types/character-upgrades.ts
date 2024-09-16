export const character_upgrades = [
  { label: 'Bônus de Perícia', value: 'PERICIA', require: 'both' },
  { label: 'Número de Perícias', value: 'NUM_DE_PERICIA', require: 'number' },
  { label: 'Atributo', value: 'ATRIBUTO', require: 'both' },
  { label: 'Defesa', value: 'DEFESA', require: 'number' },
  { label: 'Proficiência', value: 'PROFICIENCIA', require: 'string' },
  { label: 'Resistência', value: 'RESISTENCIA', require: 'both' },
  // { GERAL, FÍSICO, SANGUE, MORTE, CONHECIMENTO, ENERGIA, MEDO, TESTES }
  { label: 'Margem de Crítico', value: 'MARGEM_DE_CRITICO', require: 'number' },
  { label: 'Multiplicador de Crítico (Soma)', value: 'MULTIPLCADOR_CRITICO_SOMA', require: 'number' },
  { label: 'Multiplicador de Crítico (Multiplica)', value: 'MULTIPLCADOR_CRITICO_MULTIPLICA', require: 'number' },
  { label: 'Limite de Pontos de Esforço', value: 'LIMITE_PE', require: 'number' },
  { label: 'Vida por Nível', value: 'VIDA_P_NEX', require: 'number' },
  { label: 'Vida Máxima', value: 'VIDA_MAX', require: 'number' },
  { label: 'Pontos de Esforço por Nível', value: 'PE_P_NEX', require: 'number' },
  { label: 'Pontos de Esforço Máximo', value: 'PE_MAX', require: 'number' },
  { label: 'Dado de Dano (Global) - Mesmo dado (melee)', value: 'GLOBAL_MESMO_DADO_DE_DANO_MELEE', require: '' },
  { label: 'Dado de Dano (Item) - Mesmo dado (melee)', value: 'ITEM_MESMO_DADO_DE_DANO_MELEE', require: '' },
  { label: 'Dado de Dano - Pode critar', value: 'DADO_DE_DANO', require: 'string' },
  { label: 'Dado de Dano Extra', value: 'DADO_DE_DANO_EXTRA', require: 'string' },
  { label: 'Dextreza no Dano (disparo)', value: 'DEX_NO_DANO', require: '' },
  { label: 'Inteligência no Dano (fogo)', value: 'INT_NO_DANO', require: '' },
  { label: 'Deslocamento', value: 'DESLOCAMENTO', require: 'number' },
];

export type CharacterUpgrade = {
  type: string;
  upgradeTarget?: string;
  upgradeValue?: number;
};

export const Atributes = [
  { label: 'Força', value: 'STRENGTH' },
  { label: 'Agilidade', value: 'DEXTERITY' },
  { label: 'Vigor', value: 'VITALITY' },
  { label: 'Inteligência', value: 'INTELLIGENCE' },
  { label: 'Presença', value: 'PRESENCE' },
];
