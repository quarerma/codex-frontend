import { z } from 'zod';
import FeatCreation from '../../../../components/global/create-feat-simplified';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createFeatSchema } from '../../../../schemas/create.feat';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { character_upgrades, CharacterUpgrade } from '../../../../types/character-upgrades';
import { assignFeat, getSubclasses } from '../../../../api/fetch/subclass';

const createSubClassFeatSchema = z.object({
  subclassId: z.string().min(1),
  levelRequired: z.coerce.number(),
  feat: createFeatSchema,
});

export type CreateSubClassFeatSchema = z.infer<typeof createSubClassFeatSchema>;

export default function AssignFeatSubclass() {
  const { handleSubmit, register, reset, watch, setValue } = useForm<CreateSubClassFeatSchema>({
    resolver: zodResolver(createSubClassFeatSchema),
    defaultValues: {
      feat: {
        element: 'REALITY',
      },
      subclassId: '',
    },
  });

  const { data: subclasses, refetch } = useQuery({
    queryKey: ['subclasses'],
    queryFn: getSubclasses,
  });

  const characterUpgrades = character_upgrades;

  const [selectedCharacterUpgrades, setSelectedCharacterUpgrades] = useState<
    { label: string; value: CharacterUpgrade; require: string; isCompleted: boolean }[]
  >([]);
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

  const clearEmptyFields = (data: CreateSubClassFeatSchema) => {
    if (!data.feat.prerequisites) {
      data.feat.prerequisites = undefined;
    }
    if (!data.feat.afinity) {
      data.feat.afinity = undefined;
    }
  };

  const [pending, setPending] = useState<string[]>();
  const onSubmit = async (data: CreateSubClassFeatSchema) => {
    try {
      setPending(undefined);
      clearEmptyFields(data);

      const pendingUpgrades = selectedCharacterUpgrades.filter((p) => !p.isCompleted).map((p) => p.label);

      if (pendingUpgrades.length > 0) {
        setPending(pendingUpgrades);
        return;
      }

      data.feat.characterUpgrade = selectedCharacterUpgrades.map((p) => p.value);

      await assignFeat(data);
      setSelectedCharacterUpgrades([]);

      reset({
        feat: {
          name: '',
          description: '',
        },
        levelRequired: undefined,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Atribuir Poder à Subclasse</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Selecione a subclasse:</h1>
          <select {...register('subclassId')} className="p-2 border-2 bg-card border-border rounded ml-5 ">
            <option value="" disabled>
              Subclasses
            </option>
            {subclasses?.map((c, index) => (
              <option key={index} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Selecione o nível do poder:</h1>
          <Input
            type="text"
            placeholder="Preencha o nível necessário"
            className="ml-2 w-fit"
            {...register('levelRequired')}
          />
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

        <div className="flex flex-col w-full items-center  justify-center">
          <Button type="submit" className="w-1/4">
            Criar Poder de subclasse
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
  return;
}
