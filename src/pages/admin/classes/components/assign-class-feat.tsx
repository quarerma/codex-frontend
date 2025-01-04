import { z } from 'zod';
import FeatCreation from '../../../../components/global/create-feat-simplified';
import { Button } from '../../../../components/ui/button';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createFeatSchema } from '../../../../schemas/create.feat';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { character_upgrades, CharacterUpgrade } from '../../../../types/character-upgrades';

import { Checkbox } from '../../../../components/ui/checkbox';
import { Input } from '../../../../components/ui/input';
import { get, post } from '../../../../api/axios';
import { ClassModel } from '../../../../types/class';

const createClassFeatSchema = z.object({
  classId: z.string().min(1),
  isInitialLevel: z.boolean(),
  feat: createFeatSchema,
});

export type CreateClassFeatSchema = z.infer<typeof createClassFeatSchema>;

export default function AssignClassFeat() {
  const { handleSubmit, register, reset, watch, setValue } = useForm<CreateClassFeatSchema>({
    resolver: zodResolver(createClassFeatSchema),
    defaultValues: {
      feat: {
        element: 'REALITY',
      },
      isInitialLevel: false,
    },
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => (await get('classes')) as ClassModel[],
  });

  const characterUpgrades = character_upgrades;

  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<{ label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]>([]);
  const [currentCharacterUpgrade, setCurrentCharacterUpgrade] = useState<string | 'default'>('default');

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

  const clearEmptyFields = (data: CreateClassFeatSchema) => {
    if (!data.feat.prerequisites) {
      data.feat.prerequisites = undefined;
    }
    if (!data.feat.afinity) {
      data.feat.afinity = undefined;
    }
  };

  const [pending, setPending] = useState<string[]>();
  const assignFeat = async (data: CreateClassFeatSchema) => {
    try {
      let response;
      const params = new URLSearchParams();
      params.append('classId', (data.classId as string) || '');

      if (data.isInitialLevel) {
        response = await post('classes/assign-initial-feat', data.feat, { params });
      } else {
        response = await post('classes/assign-feat', data.feat, { params });
      }

      return response;
    } catch (error) {
      console.error('Error assigning feat:', error);
      throw error;
    }
  };

  const onSubmit = async (data: CreateClassFeatSchema) => {
    try {
      setPending(undefined);
      clearEmptyFields(data);

      const pendingUpgrades = selectedCharacterUpgrades.filter((p) => !p.isCompleted).map((p) => p.label);

      if (pendingUpgrades.length > 0) {
        setPending(pendingUpgrades);
        return;
      }

      data.feat.characterUpgrade = selectedCharacterUpgrades.map((p) => p.value);

      // Call the fixed `assignFeat` function here
      await assignFeat(data);

      setSelectedCharacterUpgrades([]);

      reset({
        feat: {
          name: '',
        },
        isInitialLevel: true,
      });
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Atribuir Poder à Classe</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Selecione a Classe:</h1>
          <select {...register('classId')} className="p-2 border-2 bg-card border-border rounded ml-5 ">
            <option value="default" disabled>
              Subclasses
            </option>
            {classes?.map((c, index) => (
              <option key={index} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Poder inicial:</h1>
          <Checkbox className="ml-2 " {...register('isInitialLevel')} onCheckedChange={(checked) => setValue('isInitialLevel', Boolean(checked))} />
          {watch('isInitialLevel') == true ? (
            <p className=" text-sm mt-2">Este poder será atribuído ao personagem no nível inicial</p>
          ) : (
            <p className=" text-sm mt-2">Este poder será atribuído ao personagem em um nível específico</p>
          )}
        </div>

        <FeatCreation
          register={register}
          watch={watch}
          setValue={setValue}
          currentCharacterUpgrade={currentCharacterUpgrade}
          setCurrentCharacterUpgrade={setCurrentCharacterUpgrade}
          handleAddUpgrade={handleAddUpgrade}
          handleRemoveUpgrade={handleRemoveUpgrade}
          selectedCharacterUpgrades={selectedCharacterUpgrades}
          characterUpgrades={characterUpgrades}
        />
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Pré-requisitos:</h1>
          <Input type="text" placeholder="Preencha o pré-requisito" className="ml-2" {...register('feat.prerequisites')} />
        </div>

        <div className="flex flex-col w-full items-center  justify-center">
          <Button type="submit" className="w-1/4">
            Criar Poder de Classe
          </Button>
          {pending && <p className="text-red-500 text-lg mt-2">As seguintes modificações ainda não foram completadas: {pending.join(', ')}</p>}
        </div>
      </form>
    </div>
  );
  return;
}
