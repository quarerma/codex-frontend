import React, { useEffect, useState } from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '../ui/button';
import UpgradeList from '../../pages/admin/components/upgradeList';
import { Input } from '../ui/input';
import { CharacterUpgrade } from '../../types/character-upgrades';
import { quillModule } from '../../../lib/utils';
import { elementValues } from '../../types/elements';

type FeatCreationProps = {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  currentCharacterUpgrade: string;
  setCurrentCharacterUpgrade: (value: string) => void;
  handleAddUpgrade: (e: React.FormEvent) => void;
  handleRemoveUpgrade: (value: number) => void;
  selectedCharacterUpgrades: { label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[];
  characterUpgrades: { label: string; value: string }[];
};

const getElementColor = (element: string) => {
  switch (element) {
    case 'REALITY':
      return {
        text: '',
        border: 'border-border',
      };
    case 'FEAR':
      return {
        text: 'text-cyan-100',
        border: 'border-cyan-100',
      };
    case 'BLOOD':
      return {
        text: 'text-red-900',
        border: 'border-red-900',
      };
    case 'DEATH':
      return {
        text: 'text-gray-500',
        border: 'border-gray-500',
      };
    case 'ENERGY':
      return {
        text: 'text-purple-700',
        border: 'border-purple-700',
      };
    case 'KNOWLEDGE':
      return {
        text: 'text-primary',
        border: 'border-primary',
      };
    default:
      return {
        text: 'text-border',
        border: 'border-border',
      };
  }
};

const FeatCreation: React.FC<FeatCreationProps> = ({
  register,
  watch,
  setValue,
  currentCharacterUpgrade,
  setCurrentCharacterUpgrade,
  handleAddUpgrade,
  handleRemoveUpgrade,
  selectedCharacterUpgrades,
  characterUpgrades,
}) => {
  const [elementColor, setElementColor] = useState({
    text: 'text-border',
    border: 'border-border',
  });

  useEffect(() => {
    setElementColor(getElementColor(watch('feat.element')));
  }, [watch('feat.element')]);
  return (
    <div className="flex flex-col space-y-10">
      {/* Nome do Poder */}
      <div className="space-y-2 group">
        <h1 className="group-focus-within:text-primary">Nome do Poder:</h1>
        <Input type="text" placeholder="Preencha o nome do Poder" className="ml-2" {...register('feat.name')} />
      </div>

      {/* Descrição do Poder */}
      <div className="space-y-2 group h-[250px]">
        <h1 className="group-focus-within:text-primary">Descrição do Poder:</h1>
        <ReactQuill
          value={watch('feat.description')}
          className="ml-2 h-[180px]"
          onChange={(content) => setValue('feat.description', content)}
          modules={quillModule}
        />
      </div>

      {/* Modificações no personagem */}
      <div className="z-50">
        <h1 className="mb-5">Modificações no personagem</h1>
        <select
          value={currentCharacterUpgrade}
          onChange={(e) => setCurrentCharacterUpgrade(e.target.value)}
          className="p-2 border-2 bg-card border-border rounded ml-5"
        >
          <option value="default" disabled>
            Modificações
          </option>
          {characterUpgrades.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        <Button size="sm" variant="ghost" onClick={handleAddUpgrade} className="ml-2">
          Adicionar
        </Button>
        <UpgradeList selectedCharacterUpgrades={selectedCharacterUpgrades} handleRemoveUpgrade={handleRemoveUpgrade} />
      </div>

      {/* Elemento */}
      <div className="space-y-2">
        <h1 className={`${elementColor.text}`}>Elemento:</h1>
        <select
          className={`p-2 border-2 bg-card outline-none ${elementColor.border} rounded ml-5`}
          {...register('feat.element')}
        >
          {elementValues?.map((c) => (
            <option key={c.label} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FeatCreation;
