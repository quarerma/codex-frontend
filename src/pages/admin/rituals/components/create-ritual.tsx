import { useForm } from 'react-hook-form';
import { createRitualsSchema, CreateRitualsSchema } from '../../../../schemas/create.rituals';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../../components/ui/input';
import ReactQuill from 'react-quill';
import { quillModule } from '../../../../../lib/utils';
import { ritualRange } from '../../../../types/range';
import { elementValues } from '../../../../types/elements';
import { damageTypes } from '../../../../types/damage';
import { useQuery } from '@tanstack/react-query';
import { getConditions } from '../../../../api/fetch/conditions';
import { useState } from 'react';
import { createRitual } from '../../../../api/fetch/rituals';

interface RitualInputProps {
  label: string;
  type: string;
  placeholder?: string;
  register: any;
  name: keyof CreateRitualsSchema;
  required?: boolean;
}

interface RitualSelectProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  name: string;
}

interface RitualDescriptionProps {
  label: string;
  name: keyof CreateRitualsSchema;
  value: string;
  onChange: (content: string) => void;
}

function RitualInput({ label, type, placeholder, register, name, required = false }: RitualInputProps) {
  return (
    <div className="space-y-2 group">
      <h1 className="group-focus-within:text-primary">
        {label} {required && '*'}
      </h1>
      <Input type={type} placeholder={placeholder} className="ml-2 w-fit" {...register(name)} />
    </div>
  );
}

function RitualSelect({ label, options, onChange }: RitualSelectProps) {
  return (
    <div className="space-y-2 group">
      <h1 className="group-focus-within:text-primary">{label}*</h1>
      <select className="p-2 border-2 ml-2 bg-card border-border rounded" onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>
          {label}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RitualDescription({ label, value, onChange }: RitualDescriptionProps) {
  return (
    <div className="space-y-2 group h-[250px]">
      <h1 className="group-focus-within:text-primary">{label}</h1>
      <ReactQuill value={value} className="ml-2 h-[180px]" onChange={onChange} modules={quillModule} />
    </div>
  );
}

export default function CreateRitual() {
  const { register, handleSubmit, setValue, watch, reset } = useForm<CreateRitualsSchema>({
    resolver: zodResolver(createRitualsSchema),
    defaultValues: {
      type: 'EFFECT',
      range: 'SELF',
      trueCastDescription: undefined,
      trueCost: undefined,
      discentCost: undefined,
      discentCastDescription: undefined,
    },
  });

  const ritualType = watch('type');
  const { data: conditions = [] } = useQuery({
    queryKey: ['conditions'],
    queryFn: getConditions,
  });

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [currentCondition, setCurrentCondition] = useState<string>('default');

  const handleAddCondition = () => {
    if (currentCondition !== 'default' && !selectedConditions.includes(currentCondition)) {
      setSelectedConditions((prev) => [...prev, currentCondition]);
    }
  };

  const handleRemoveCondition = (condition: string) => {
    setSelectedConditions((prev) => prev.filter((c) => c !== condition));
  };

  const onSubmit = async (data: CreateRitualsSchema) => {
    try {
      // Atualizar o estado antes da chamada assíncrona
      data.conditions = selectedConditions;

      await createRitual(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-5xl font-bold">Criar novo Ritual</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-3xl space-y-10">
        <RitualInput label="Nome do Ritual" type="text" placeholder="Preencha o nome do ritual" register={register} name="name" required />
        <RitualInput label="Custo do Ritual" type="text" register={register} name="normalCost" required />
        <RitualInput label="Círculo do Ritual" type="text" register={register} name="ritualLevel" required />
        <RitualInput label="Tempo de Execução" type="text" register={register} name="exectutionTime" required />
        <RitualInput label="Resistência" type="text" register={register} name="resistance" required />

        <RitualSelect label="Alcance de Ritual" options={ritualRange} onChange={(value) => setValue('range', value)} name="range" />

        <RitualInput label="Alvos" type="text" register={register} name="target" required />
        <RitualInput label="Duração" type="text" register={register} name="duration" required />

        <RitualSelect label="Elemento" options={elementValues} onChange={(value) => setValue('element', value)} name="element" />

        <RitualSelect
          label="Tipo de Ritual"
          options={[
            { value: 'EFFECT', label: 'Efeito' },
            { value: 'DAMAGE', label: 'Dano' },
          ]}
          onChange={(value) => setValue('type', value)}
          name="type"
        />

        {ritualType === 'DAMAGE' && (
          <>
            <RitualInput label="Dano do Ritual" type="text" placeholder="Exemplo: 2d10 + 5" register={register} name="normalCastDamage" />
            <RitualSelect label="Tipo de Dano" options={damageTypes} onChange={(value) => setValue('normalCastDamageType', value)} name="normalCastDamageType" />
          </>
        )}

        <RitualDescription
          label="Descrição da Execução Padrão"
          name="normalCastDescription"
          value={watch('normalCastDescription')}
          onChange={(content) => setValue('normalCastDescription', content)}
        />

        <div className="w-full flex items-center justify-between">
          <div className="flex-grow h-[1px] bg-white"></div>
          <h1 className="text-5xl text-primary whitespace-nowrap mx-4">Versão Discente</h1>
          <div className="flex-grow h-[1px] bg-white"></div>
        </div>

        <RitualInput label="Custo da Versão Discente" type="text" register={register} name="discentCost" />
        <RitualDescription
          label="Descrição da Versão Discente"
          name="discentCastDescription"
          value={watch('discentCastDescription') || ''}
          onChange={(content) => setValue('discentCastDescription', content)}
        />

        {ritualType === 'DAMAGE' && (
          <>
            <RitualInput label="Dano da Versão Discente" type="text" placeholder="Exemplo: 2d10 + 5" register={register} name="discentCastDamage" />
            <RitualSelect label="Tipo de Dano" options={damageTypes} onChange={(value) => setValue('discentCastDamageType', value)} name="discentCastDamageType" />
          </>
        )}

        <div className="w-full flex items-center justify-between">
          <div className="flex-grow h-[1px] bg-white"></div>
          <h1 className="text-5xl whitespace-nowrap mx-4 text-primary">Versão Verdadeira</h1>
          <div className="flex-grow h-[1px] bg-white"></div>
        </div>

        <RitualInput label="Custo da Versão Verdadeira" type="text" register={register} name="trueCost" />
        <RitualDescription
          label="Descrição da Versão Verdadeira"
          name="trueCastDescription"
          value={watch('trueCastDescription') || ''}
          onChange={(content) => setValue('trueCastDescription', content)}
        />

        {ritualType === 'DAMAGE' && (
          <>
            <RitualInput label="Dano da Versão Verdadeira" type="text" placeholder="Exemplo: 2d10 + 5" register={register} name="trueCastDamage" />
            <RitualSelect label="Tipo de Dano" options={damageTypes} onChange={(value) => setValue('trueCastDamageType', value)} name="trueCastDamageType" />
          </>
        )}
        <div className="w-full flex items-center justify-between">
          <div className="flex-grow h-[1px] bg-white"></div>
          <h1 className="text-5xl text-primary whitespace-nowrap mx-4">Condições</h1>
          <div className="flex-grow h-[1px] bg-white"></div>
        </div>

        <div className="flex space-x-5">
          <select value={currentCondition} onChange={(e) => setCurrentCondition(e.target.value)} className="p-2 border-2 bg-card border-border rounded ml-5">
            <option value="default" disabled>
              Condições
            </option>
            {conditions.map((c, index) => (
              <option key={index} value={c.id}>
                <div className="flex">
                  <p>{c.name}</p>
                </div>
              </option>
            ))}
          </select>
          <button onClick={() => handleAddCondition()} className="text-primary">
            Adicionar
          </button>
        </div>

        <ol className="flex flex-col mt-2 ml-5">
          {selectedConditions.map((condition, index) => (
            <li key={index}>
              <div className="flex justify-between text-secondary-foreground">
                <p>{conditions.find((c) => c.id === condition)?.name}</p>
                <button onClick={() => handleRemoveCondition(condition)} className="text-red-500">
                  Remover
                </button>
              </div>
              <div className="h-[1px] w-full bg-muted mt-2"></div>
            </li>
          ))}
        </ol>

        <div className="flex justify-center">
          <button type="submit" className="w-1/4 text-4xl rounded-2xl">
            Criar Ritual
          </button>
        </div>
      </form>
    </div>
  );
}
