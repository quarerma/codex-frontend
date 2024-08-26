import { useForm } from 'react-hook-form';
import { createFeatSchema, CreateFeatSchema } from '../../../schemas/create.feat';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import ReactQuill from 'react-quill';
import { useEffect, useState, useCallback } from 'react';
import { character_upgrades } from '../../../types/character-upgrades';
import { Button } from '../../../components/ui/button';
import { elementValues } from '../../../types/elements';
import { quillModule } from '../../../../lib/utils';

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
  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<{ label: string; value: string }[]>([]);
  const [currentCharacterUpgrade, setCurrentCharacterUpgrade] = useState<string | 'default'>('default');

  const [selectedAfinityUpgrades, setSelectedAfinityUpgrades] = useState<{ label: string; value: string }[]>([]);
  const [currentAfinityUpgrade, setCurrentAfinityUpgrade] = useState<string | 'default'>('default');

  const handleAddAfinityUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = characterUpgrades.find((p) => p.value === currentAfinityUpgrade);
    if (selected && !selectedAfinityUpgrades.some((p) => p.value === selected.value)) {
      setSelectedAfinityUpgrades([...selectedAfinityUpgrades, selected]);
      setCurrentAfinityUpgrade('default');
    }
  };

  const handleRemoveAfinityUpgrade = (value: string) => {
    setSelectedAfinityUpgrades(selectedAfinityUpgrades.filter((p) => p.value !== value));
  };

  const handleAddUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = characterUpgrades.find((p) => p.value === currentCharacterUpgrade);
    if (selected && !selectedCharacterUpgrades.some((p) => p.value === selected.value)) {
      setSelectedCharacterUpgrades([...selectedCharacterUpgrades, selected]);
      setCurrentCharacterUpgrade('default');
    }
  };

  const handleRemoveUpgrade = (value: string) => {
    setSelectedCharacterUpgrades(selectedCharacterUpgrades.filter((p) => p.value !== value));
  };

  const description = watch('description');

  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  const onSubmit = async (data: CreateFeatSchema) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Criar novo Poder</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome:</h1>
          <Input type="text" placeholder="Preencha o nome da subclasse" className="ml-2" {...register('name')} />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição:</h1>
          <ReactQuill
            className="ml-2 h-[180px]"
            value={description}
            onChange={(content) => setValue('description', content)}
            modules={quillModule}
          />
        </div>
        <div className="space-y-2 group ">
          <h1 className="group-focus-within:text-primary">Pré-requisitos:</h1>
          <Input
            type="text"
            placeholder="Preencha o nome da subclasse"
            className="ml-2"
            {...register('prerequisites')}
          />
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

          <ol className="mt-2 ml-5">
            {selectedCharacterUpgrades.map((upgrades) => (
              <li key={upgrades.value} className="flex flex-col w-[40%]">
                <div className="flex w-full justify-between text-start">
                  <span className="text-lg text-secondary-foreground">{upgrades.label}</span>
                  <Button
                    size={'sm'}
                    variant={'link'}
                    onClick={() => handleRemoveUpgrade(upgrades.value)}
                    className="ml-2 text-[0.7rem] text-primary right-0"
                  >
                    Remover
                  </Button>
                </div>
                <div className="w-full h-[1px] bg-muted"></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-2">
          <h1 className={`${elementColor.text}`}>Elemento:</h1>
          <select
            className={`p-2 border-2 bg-card outline-none ${elementColor.border} rounded ml-5`}
            {...register('element')}
          >
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
              <select
                value={currentAfinityUpgrade}
                onChange={(e) => setCurrentAfinityUpgrade(e.target.value as string)}
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
              <Button size={'sm'} variant={'ghost'} onClick={handleAddAfinityUpgrade} className="ml-2">
                Adicionar
              </Button>

              <ol className="mt-2 ml-5">
                {selectedAfinityUpgrades.map((upgrades) => (
                  <li key={upgrades.value} className="flex flex-col w-[40%]">
                    <div className="flex w-full justify-between text-start">
                      <span className="text-lg text-secondary-foreground">{upgrades.label}</span>
                      <Button
                        size={'sm'}
                        variant={'link'}
                        onClick={() => handleRemoveAfinityUpgrade(upgrades.value)}
                        className="ml-2 text-[0.7rem] text-primary right-0"
                      >
                        Remover
                      </Button>
                    </div>
                    <div className="w-full h-[1px] bg-muted"></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
