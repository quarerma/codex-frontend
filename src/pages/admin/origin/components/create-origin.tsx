import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input';
import ReactQuill from 'react-quill';
import { useEffect, useState } from 'react';
import { character_upgrades, CharacterUpgrade } from '../../../../types/character-upgrades';
import { Button } from '../../../../components/ui/button';
import { elementValues } from '../../../../types/elements';
import { quillModule } from '../../../../../lib/utils';

import UpgradeList from '../../components/upgradeList';
import { createOriginSchema, CreateOriginSchema } from '../../../../schemas/create.origin';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSkills } from '../../../../api/fetch/skills';
import { createOrigin } from '../../../../api/fetch/origins';
import { Origin } from '../../../../types/origin';

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

export default function CreateOrigin() {
  const { handleSubmit, register, reset, watch, setValue } = useForm<CreateOriginSchema>({
    resolver: zodResolver(createOriginSchema),
    defaultValues: {
      feat: {
        element: 'REALITY',
      },
    },
  });

  const characterUpgrades = character_upgrades;

  const [elementColor, setElementColor] = useState({
    text: 'text-border',
    border: 'border-border',
  });

  const { data: skills } = useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  useEffect(() => {
    setElementColor(getElementColor(watch('feat.element')));
  }, [watch('feat.element')]);

  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<
    { label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]
  >([]);
  const [currentCharacterUpgrade, setCurrentCharacterUpgrade] = useState<string | 'default'>('default');

  const [currentSkill, setCurrentSkill] = useState<string | 'default'>('default');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSkill !== 'default' && !selectedSkills.includes(currentSkill)) {
      setSelectedSkills([...selectedSkills, currentSkill]);
      setCurrentSkill('default');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
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

  const clearEmptyFields = (data: CreateOriginSchema) => {
    if (!data.feat.prerequisites) {
      data.feat.prerequisites = undefined;
    }
    if (!data.feat.afinity) {
      data.feat.afinity = undefined;
    }
  };

  const [pending, setPending] = useState<string[]>();
  const onSubmit = async (data: CreateOriginSchema) => {
    try {
      console.log(data);
      setPending(undefined);
      clearEmptyFields(data);

      const pendingUpgrades = selectedCharacterUpgrades.filter((p) => !p.isCompleted).map((p) => p.label);

      if (pendingUpgrades.length > 0) {
        setPending(pendingUpgrades);
        return;
      }

      data.skills = selectedSkills;
      data.feat.characterUpgrade = selectedCharacterUpgrades.map((p) => p.value);

      const response = await createOrigin(data);
      const queryClient = useQueryClient();

      const origins: Origin[] | undefined = queryClient.getQueryData(['origins']);

      if (origins) {
        queryClient.setQueryData(['origins'], [...origins, response]);
      }

      setSelectedCharacterUpgrades([]);
      setSelectedSkills([]);

      reset({
        description: '',
        feat: {
          name: '',
          element: 'REALITY',
        },
        name: '',
        skills: [],
      });

      console.log(watch());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Criar nova Origem</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome da Origem:</h1>
          <Input type="text" placeholder="Preencha o nome da origem" className="ml-2" {...register('name')} />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição da Origem:</h1>
          <ReactQuill
            value={watch('description')}
            className="ml-2 h-[180px]"
            onChange={(content) => setValue('description', content)}
            modules={quillModule}
          />
        </div>

        <div className="z-50">
          <h1 className="mb-5">Perícias treinadas</h1>
          <select
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value as string)}
            className="p-2 border-2 bg-card border-border rounded ml-5 "
          >
            <option value="default" disabled>
              Perícias
            </option>
            {skills?.map((c, index) => (
              <option key={index} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <Button size={'sm'} variant={'ghost'} onClick={handleAddSkill} className="ml-2">
            Adicionar
          </Button>
          <ol className="flex flex-col mt-2 ml-5">
            {selectedSkills.map((skill) => (
              <li>
                <div className="flex justify-between text-secondary-foreground">
                  <p className=" mt-2">{skill}</p>
                  <Button size={'sm'} variant={'link'} onClick={() => handleRemoveSkill(skill)}>
                    Remover
                  </Button>
                </div>
                <div className="h-[1px] w-full bg-muted mt-2"></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome do Poder da Origem:</h1>
          <Input
            type="text"
            placeholder="Preencha o nome do Poder da Origem "
            className="ml-2"
            {...register('feat.name')}
          />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição do Poder da Origem:</h1>
          <ReactQuill
            value={watch('feat.description')}
            className="ml-2 h-[180px]"
            onChange={(content) => setValue('feat.description', content)}
            modules={quillModule}
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
          <UpgradeList
            selectedCharacterUpgrades={selectedCharacterUpgrades}
            handleRemoveUpgrade={handleRemoveUpgrade}
          />
        </div>
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

        <div className="flex flex-col w-full items-center  justify-center">
          <Button type="submit" className="w-1/4">
            Criar Origem
          </Button>
          {pending && (
            <p className="text-red-500 text-lg mt-2">
              As seguintes modificações ainda não foram completadas: {pending.join(', ')}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
