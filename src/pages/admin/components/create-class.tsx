import { useForm, UseFormRegister } from 'react-hook-form';
import { createClassSchema, CreateClassSchema } from '../../../schemas/create.class';

import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { createClass } from '../../../api/fetch/classes';

const proficiencies = [
  { label: 'Armas simples', value: 'SIMPLE' },
  { label: 'Armas táticas', value: 'TATICAL' },
  { label: 'Armas pesadas', value: 'HEAVY' },
  { label: 'Armaduras leves', value: 'LIGHT_ARMOR' },
  { label: 'Armaduras pesadas', value: 'HEAVY_ARMOR' },
];

interface FormFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegister<CreateClassSchema>;
  name: keyof CreateClassSchema;
  type?: string;
  isTextarea?: boolean;
}

const FormField = ({ label, placeholder, register, name, type = 'text', isTextarea = false }: FormFieldProps) => (
  <div className="space-y-2 group">
    <h1 className="group-focus-within:text-primary">{label}</h1>
    {isTextarea ? (
      <Textarea placeholder={placeholder} className="ml-2 h-[200px]" {...register(name)} />
    ) : (
      <Input type={type} placeholder={placeholder} className="ml-2" {...register(name)} />
    )}
  </div>
);

export default function CreateClass() {
  const [selectedProficiencies, setSelectedProficiencies] = useState<{ label: string; value: string }[]>([]);
  const [currentProficiency, setCurrentProficiency] = useState<string | 'default'>('default');

  const handleAddProficiency = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    const selected = proficiencies.find((p) => p.value === currentProficiency);
    if (selected && !selectedProficiencies.some((p) => p.value === selected.value)) {
      setSelectedProficiencies([...selectedProficiencies, selected]);
      setCurrentProficiency('default');
    }
  };

  const handleRemoveProficiency = (value: string) => {
    setSelectedProficiencies(selectedProficiencies.filter((p) => p.value !== value));
  };

  const { reset, handleSubmit, register } = useForm<CreateClassSchema>({
    resolver: zodResolver(createClassSchema),
  });

  const onSubmit = async (data: CreateClassSchema) => {
    try {
      // Aqui você pode enviar os dados para o backend
      console.log(data);
      const proficiencies = selectedProficiencies.map((proficiency) => proficiency.value);
      console.log(proficiencies);

      const response = await createClass(data, proficiencies);

      console.log(response);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Criar nova classe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-xl space-y-10">
        <FormField label="Nome:" placeholder="Preencha o nome da classe..." register={register} name="name" />
        <FormField
          label="Descrição:"
          placeholder="Adicione a descrição da classe..."
          register={register}
          name="description"
          isTextarea
        />
        <FormField
          label="Pontos de Vida Iniciais:"
          placeholder="Preencha os pontos de vida iniciais..."
          register={register}
          name="initialHealth"
          type="text"
        />
        <FormField
          label="Pontos de Vida por Nível:"
          placeholder="Preencha os pontos de vida por nível..."
          register={register}
          name="hitPointsPerLevel"
          type="text"
        />
        <FormField
          label="Pontos de Esforço Iniciais:"
          placeholder="Preencha os pontos de esforço iniciais..."
          register={register}
          name="initialEffort"
          type="text"
        />
        <FormField
          label="Pontos de Esforço por Nível:"
          placeholder="Preencha os pontos de esforço por nível..."
          register={register}
          name="effortPointsPerLevel"
          type="text"
        />
        <FormField
          label="Pontos de Sanidade Iniciais:"
          placeholder="Preencha os pontos de sanidade iniciais..."
          register={register}
          name="initialSanity"
          type="text"
        />
        <FormField
          label="Pontos de Sanidade por Nível:"
          placeholder="Preencha os pontos de sanidade por nível..."
          register={register}
          name="SanityPointsPerLevel"
          type="text"
        />
        <div className="z-50">
          <h1 className="mb-5">Adicione as proficiências</h1>
          <select
            value={currentProficiency}
            onChange={(e) => setCurrentProficiency(e.target.value as string)}
            className="p-2 border-2 bg-card border-border rounded ml-5"
          >
            <option value="default" disabled>
              Proficiências
            </option>
            {proficiencies.map((proficiency) => (
              <option key={proficiency.value} value={proficiency.value}>
                {proficiency.label}
              </option>
            ))}
          </select>
          <Button size={'sm'} variant={'ghost'} onClick={handleAddProficiency} className="ml-2">
            Adicionar
          </Button>
          <div className="mt-4">
            <h3>Proficiencias Selecionadas:</h3>
            <ol className="mt-2 ml-5">
              {selectedProficiencies.map((proficiency) => (
                <li key={proficiency.value} className="flex flex-col w-[40%]">
                  <div className="flex w-full justify-between text-start">
                    <span className="text-lg text-secondary-foreground">{proficiency.label}</span>
                    <Button
                      size={'sm'}
                      variant={'link'}
                      onClick={() => handleRemoveProficiency(proficiency.value)}
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
        <div className="w-full flex justify-center">
          <Button type="submit" className="text-2xl rounded-xl w-1/5">
            Criar Classe
          </Button>
        </div>
      </form>
    </div>
  );
}
