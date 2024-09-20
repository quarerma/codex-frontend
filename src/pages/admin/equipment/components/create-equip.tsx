import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill';
import { quillModule } from '../../../../../lib/utils';
import { Input } from '../../../../components/ui/input';

import { createEquimentSchema, CreateEquimentSchema } from '../../../../schemas/create.equipment';
import { handType, itemType, weaponCategory, weaponType } from '../../../../types/equipment';
import { character_upgrades, CharacterUpgrade } from '../../../../types/character-upgrades';
import { useState } from 'react';
import UpgradeList from '../../components/upgradeList';
import { Button } from '../../../../components/ui/button';
import { weaponRange } from '../../../../types/range';
import { damageTypes } from '../../../../types/damage';
import { elementValues } from '../../../../types/elements';
import { createEquipment } from '../../../../api/fetch/equipment';

export default function CreateEquip() {
  const { handleSubmit, register, setValue, watch, reset } = useForm<CreateEquimentSchema>({
    resolver: zodResolver(createEquimentSchema),
    defaultValues: {
      type: '',
      num_of_uses: 0,
      critical_range: undefined,
      critical_multiplier: undefined,
      damage: undefined,
      damage_type: undefined,
      hand_type: undefined,
      weapon_category: undefined,
      weapon_type: undefined,
      element: undefined,
    },
  });

  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<
    { label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]
  >([]);
  const [currentCharacterUpgrade, setCurrentCharacterUpgrade] = useState<string | 'default'>('default');
  const characterUpgrades = character_upgrades;
  const handleAddUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = characterUpgrades.find((p) => p.value === currentCharacterUpgrade);
    if (selected) {
      const object = {
        label: selected?.label,
        value: {
          type: selected?.value,
        },
        require: selected.require,
        isCompleted: false,
      };
      setSelectedCharacterUpgrades([...selectedCharacterUpgrades, object]);
      setCurrentCharacterUpgrade('default');
    }
  };

  const handleRemoveUpgrade = (index: number) => {
    setSelectedCharacterUpgrades(selectedCharacterUpgrades.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CreateEquimentSchema) => {
    try {
      // API
      data.characterUpgrades = selectedCharacterUpgrades.map((p) => p.value);

      await createEquipment(data);
      reset();
      setSelectedCharacterUpgrades([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Criar novo Equipamento</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome do Equipamento:</h1>
          <Input type="text" placeholder="Preencha o nome do equipamento" className="ml-2" {...register('name')} />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição do equipamento:</h1>
          <ReactQuill
            value={watch('description')}
            className="ml-2 h-[180px]"
            onChange={(content) => setValue('description', content)}
            modules={quillModule}
          />
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Categoria do Equipamento:</h1>
          <Input type="text" placeholder="Preencha como o número. Ex: 1" className="ml-2" {...register('category')} />
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Espaços no Invetário:</h1>
          <Input type="text" placeholder="Preencha o número" className="ml-2" {...register('weight')} />
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Número de Usos:</h1>
          <Input
            type="text"
            placeholder="Caso tenha usos infinitos, preencha com 0"
            className="ml-2"
            {...register('category')}
          />
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Tipo de equipamento:</h1>
          <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('type')}>
            <option value="" disabled>
              Tipos
            </option>
            {itemType.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="z-50">
          <h1 className="mb-5">Modificações no personagem</h1>
          <select
            value={currentCharacterUpgrade}
            onChange={(e) => setCurrentCharacterUpgrade(e.target.value as string)}
            className="p-2 border-2 bg-card border-border rounded ml-5 "
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
          <Button size={'sm'} variant={'ghost'} onClick={handleAddUpgrade} className="ml-2">
            Adicionar
          </Button>

          <UpgradeList
            selectedCharacterUpgrades={selectedCharacterUpgrades}
            handleRemoveUpgrade={handleRemoveUpgrade}
          />
        </div>
        {watch('type') === 'WEAPON' && (
          <div className="flex flex-col space-y-10">
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Dano da Arma:</h1>
              <Input
                type="text"
                placeholder="Exemplo: 1d6, caso tenha 2 instancias de dano, preencha com 1d6|1d8"
                className="ml-2"
                {...register('damage')}
              />
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Valor de Crítico da Arma:</h1>
              <Input type="text" placeholder="Crítico natural é 20" className="ml-2" {...register('critical_range')} />
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Multiplicador do Crítico:</h1>
              <Input
                type="text"
                placeholder="Preencha apenas com o número que multiplicará os dados"
                className="ml-2"
                {...register('critical_multiplier')}
              />
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Tipo de arma:</h1>
              <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('weapon_type')}>
                <option value="" disabled>
                  Tipos de Arma
                </option>
                {weaponType.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Categoria de arma:</h1>
              <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('weapon_category')}>
                <option value="" disabled>
                  Categorias
                </option>
                {weaponCategory.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Empunhadura da arma:</h1>
              <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('hand_type')}>
                <option value="" disabled>
                  Empunhaduras
                </option>
                {handType.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Alcance:</h1>
              <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('range')}>
                <option value="" disabled>
                  Alcances
                </option>
                {weaponRange.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Tipo de Dano:</h1>
              <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('damage_type')}>
                <option value="" disabled>
                  Dano
                </option>
                {damageTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {watch('type') === 'CURSED_ITEM' && (
          <div className="space-y-2 group">
            <h1 className="group-focus-within:text-primary">Elemento:</h1>
            <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('element')}>
              <option value="" disabled>
                Elementos
              </option>
              {elementValues.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="w-full flex justify-center">
          <button type="submit" className="bg-primary text-primary-foreground  px-5 py-2 rounded-lg">
            Criar Equipamento
          </button>
        </div>
      </form>
    </div>
  );
}
