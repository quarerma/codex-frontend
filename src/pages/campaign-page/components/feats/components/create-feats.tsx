import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { createFeatSchema, CreateFeatSchema } from '../../../../../schemas/create.feat';
import { character_upgrades, CharacterUpgrade } from '../../../../../types/character-upgrades';
import { createCampaignFeat } from '../../../../../api/fetch/feats';
import { Input } from '../../../../../components/ui/input';
import { quillModule } from '../../../../../../lib/utils';
import { Button } from '../../../../../components/ui/button';
import UpgradeList from '../../../../admin/components/upgradeList';
import { elementValues } from '../../../../../types/elements';
import { useParams } from 'react-router-dom';

export const getElementColor = (element: string) => {
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
        bg: 'bg-cyan-100',
        text_foreground: 'text-black',
      };
    case 'BLOOD':
      return {
        text: 'text-red-700',
        border: 'border-red-900',
        bg: 'bg-red-900',
      };
    case 'DEATH':
      return {
        text: 'text-gray-500',
        border: 'border-gray-500',
        bg: 'bg-gray-500',
      };
    case 'ENERGY':
      return {
        text: 'text-purple-700',
        border: 'border-purple-700',
        bg: 'bg-purple-700',
      };
    case 'KNOWLEDGE':
      return {
        text: 'text-primary',
        border: 'border-primary',
        bg: 'bg-primary',
      };
    default:
      return {
        text: 'text-border',
        border: 'border-border',
        bg: 'bg-border',
      };
  }
};

export default function CreateFeats() {
  const { handleSubmit, register, reset, watch, setValue } = useForm<CreateFeatSchema>({
    resolver: zodResolver(createFeatSchema),
    defaultValues: {
      element: 'REALITY',
    },
  });

  const characterUpgrades = character_upgrades;

  const [elementColor, setElementColor] = useState({
    text: 'text-border',
    border: 'border-border',
  });

  useEffect(() => {
    setElementColor(getElementColor(watch('element')));
  }, [watch('element')]);

  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<{ label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]>([]);
  const [currentCharacterUpgrade, setCurrentCharacterUpgrade] = useState<string | 'default'>('default');

  const [selectedAfinityUpgrades, setSelectedAfinityUpgrades] = useState<{ label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]>([]);
  const [currentAfinityUpgrade, setCurrentAfinityUpgrade] = useState<string | 'default'>('default');

  const handleAddAfinityUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = characterUpgrades.find((p) => p.value === currentAfinityUpgrade);
    if (selected && !selectedAfinityUpgrades.some((p) => p.value.type === selected.value)) {
      const object = {
        label: selected?.label,
        value: {
          type: selected?.value,
        },
        require: selected.require,
        isCompleted: false,
      };
      setSelectedAfinityUpgrades([...selectedAfinityUpgrades, object]);

      setCurrentAfinityUpgrade('default');
    }
  };

  const handleRemoveAfinityUpgrade = (index: number) => {
    setSelectedAfinityUpgrades(selectedAfinityUpgrades.filter((_, i) => i !== index));
  };

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

  const description = watch('description');

  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  const clearEmptyFields = (data: CreateFeatSchema) => {
    if (!data.prerequisites) {
      data.prerequisites = undefined;
    }
    if (!data.afinity) {
      data.afinity = undefined;
    }
  };

  const [pending, setPending] = useState<string[]>();
  const { id: campaignId } = useParams();
  const onSubmit = async (data: CreateFeatSchema) => {
    try {
      setPending(undefined);
      clearEmptyFields(data);
      // check if the selected upgrades are completed, add the non-completed label to the pending
      const pendingUpgrades = selectedCharacterUpgrades.filter((p) => !p.isCompleted).map((p) => p.label);
      // check for afinity upgrades
      const pendingAfinityUpgrades = selectedAfinityUpgrades.filter((p) => !p.isCompleted).map((p) => p.label);
      pendingUpgrades.push(...pendingAfinityUpgrades);

      if (pendingUpgrades.length > 0) {
        setPending(pendingUpgrades);
        return;
      }

      data.characterUpgrade = selectedCharacterUpgrades.map((p) => p.value);
      data.afinityUpgrades = selectedAfinityUpgrades.map((p) => p.value);

      await createCampaignFeat(data, campaignId || '');
      reset();

      setSelectedCharacterUpgrades([]);
      setSelectedAfinityUpgrades([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-5xl font-bold">Criar novo Poder</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-3xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome:</h1>
          <Input type="text" placeholder="Preencha o nome da subclasse" className="ml-2" {...register('name')} />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição:</h1>
          <ReactQuill className="ml-2 h-[180px]" value={description} onChange={(content) => setValue('description', content)} modules={quillModule} />
        </div>
        <div className="space-y-2 group ">
          <h1 className="group-focus-within:text-primary">Pré-requisitos:</h1>
          <Input type="text" placeholder="Preencha os pré-requisitos" className="ml-2" {...register('prerequisites')} />
        </div>
        <div className="z-50">
          <h1 className="mb-5">Modificações no personagem</h1>
          <select value={currentCharacterUpgrade} onChange={(e) => setCurrentCharacterUpgrade(e.target.value as string)} className="p-2 border-2 bg-card border-border rounded ml-5 ">
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
          <UpgradeList selectedCharacterUpgrades={selectedCharacterUpgrades} handleRemoveUpgrade={handleRemoveUpgrade} />
        </div>
        <div className="space-y-2">
          <h1 className={`${elementColor.text}`}>Elemento:</h1>
          <select className={`p-2 border-2 bg-card outline-none ${elementColor.border} rounded ml-5`} {...register('element')}>
            {elementValues?.map((c) => (
              <option key={c.label} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        {watch('element') !== 'REALITY' && (
          <div className="flex flex-col gap-y-10">
            <div className="space-y-2 group">
              <h1 className="group-focus-within:text-primary">Afinidade:</h1>
              <Input type="text" placeholder="Preencha a afinidade" className="ml-2" {...register('afinity')} />
            </div>
            <div className="z-50">
              <h1 className="mb-5">Modificações no personagem</h1>
              <select value={currentAfinityUpgrade} onChange={(e) => setCurrentAfinityUpgrade(e.target.value as string)} className="p-2 border-2 bg-card border-border rounded ml-5 ">
                <option value="default" disabled>
                  Modificações
                </option>
                {characterUpgrades.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Button size={'sm'} variant={'ghost'} onClick={handleAddAfinityUpgrade} className="ml-2">
                Adicionar
              </Button>

              <UpgradeList selectedCharacterUpgrades={selectedAfinityUpgrades} handleRemoveUpgrade={handleRemoveAfinityUpgrade} />
            </div>
          </div>
        )}
        <div className="flex flex-col w-full items-center  justify-center">
          <Button type="submit" className="w-1/4">
            Criar Poder
          </Button>
          {pending && <p className="text-red-500 text-2xl mt-2">As seguintes modificações ainda não foram completadas: {pending.join(', ')}</p>}
        </div>
      </form>
    </div>
  );
}
