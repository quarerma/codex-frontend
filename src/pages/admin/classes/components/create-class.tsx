import { useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Textarea } from '../../../../components/ui/textarea';
import { Input } from '../../../../components/ui/input';
import { createClassSchema, CreateClassSchema } from '../../../../schemas/create.class';
import { equipmentProficience } from '../../../../types/class';
import { createClass } from '../../../../api/fetch/classes';
import { Button } from '../../../../components/ui/button';

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
    {isTextarea ? <Textarea placeholder={placeholder} className="ml-2 h-[200px]" {...register(name)} /> : <Input type={type} placeholder={placeholder} className="ml-2" {...register(name)} />}
  </div>
);

export default function CreateClass() {
  const proficiencies = equipmentProficience;
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

  const { reset, handleSubmit, register, watch, setValue } = useForm<CreateClassSchema>({
    resolver: zodResolver(createClassSchema),
  });

  const description = watch('description'); // Para observar mudanças no campo

  // UseEffect para registrar o campo quando o componente monta
  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  const onSubmit = async (data: CreateClassSchema) => {
    try {
      // Aqui você pode enviar os dados para o backend

      const proficiencies = selectedProficiencies.map((proficiency) => proficiency.value);

      await createClass(data, proficiencies);

      reset();
      setSelectedProficiencies([]);
      setCurrentProficiency('default');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-5xl font-bold">Criar nova classe</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-3xl space-y-10">
        <FormField label="Nome:" placeholder="Preencha o nome da classe..." register={register} name="name" />
        <div className="space-y-2 group  h-[300px]">
          <h1 className="group-focus-within:text-primary">Descrição:</h1>
          <ReactQuill className="ml-2 h-[220px]" value={description} onChange={(content) => setValue('description', content)} />
        </div>
        <FormField label="Perícias iniciais:" placeholder="Preencha com o número absoluto" register={register} name="number_of_skills" type="text" />
        <FormField label="Pontos de Vida Iniciais:" placeholder="Preencha os pontos de vida iniciais..." register={register} name="initialHealth" type="text" />
        <FormField label="Pontos de Vida por Nível:" placeholder="Preencha os pontos de vida por nível..." register={register} name="hitPointsPerLevel" type="text" />
        <FormField label="Pontos de Esforço Iniciais:" placeholder="Preencha os pontos de esforço iniciais..." register={register} name="initialEffort" type="text" />
        <FormField label="Pontos de Esforço por Nível:" placeholder="Preencha os pontos de esforço por nível..." register={register} name="effortPointsPerLevel" type="text" />
        <FormField label="Pontos de Sanidade Iniciais:" placeholder="Preencha os pontos de sanidade iniciais..." register={register} name="initialSanity" type="text" />
        <FormField label="Pontos de Sanidade por Nível:" placeholder="Preencha os pontos de sanidade por nível..." register={register} name="SanityPointsPerLevel" type="text" />
        <div className="z-50">
          <h1 className="mb-5">Adicione as proficiências</h1>
          <select value={currentProficiency} onChange={(e) => setCurrentProficiency(e.target.value as string)} className="p-2 border-2 bg-card border-border rounded ml-5">
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
            <h3>Proficiências Selecionadas:</h3>
            <ol className="mt-2 ml-5">
              {selectedProficiencies.map((proficiency) => (
                <li key={proficiency.value} className="flex flex-col w-[40%]">
                  <div className="flex w-full justify-between text-start">
                    <span className="text-2xl text-secondary-foreground">{proficiency.label}</span>
                    <Button size={'sm'} variant={'link'} onClick={() => handleRemoveProficiency(proficiency.value)} className="ml-2 text-[0.7rem] text-primary right-0">
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
          <Button type="submit" className="text-4xl rounded-xl w-1/5">
            Criar Classe
          </Button>
        </div>
      </form>
    </div>
  );
}
