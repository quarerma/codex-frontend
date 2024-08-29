import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';

import { Button } from '../../../components/ui/button';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { createSkillSchema, CreateSkillSchema } from '../../../schemas/create.skill';
import { Atributes } from '../../../types/character-upgrades';
import { Checkbox } from '../../../components/ui/checkbox';

export default function CreateSkills() {
  const { handleSubmit, register, reset, setValue, watch } = useForm<CreateSkillSchema>({
    resolver: zodResolver(createSkillSchema),
  });
  const description = watch('description'); // Para observar mudanças no campo
  const atribute = Atributes;

  // UseEffect para registrar o campo quando o componente monta
  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  // imprima todos os watch
  useEffect(() => {
    console.log(watch('needs_kit'));
  }, [watch('needs_kit')]);
  const onSubmit = async (data: CreateSkillSchema) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-3xl font-bold">Criar nova sub classe</h1>

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
          />
        </div>
        <div className="space-y-2 group">
          <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('atribute')}>
            <option value="" disabled>
              Atributos
            </option>
            {atribute.map((atribute) => (
              <option key={atribute.value}>{atribute.label}</option>
            ))}
          </select>
        </div>
        <div className="flex ml-5 items-center space-x-2">
          <Checkbox
            className="h-[18px] w-[18px]"
            onCheckedChange={(checked) => setValue('needs_kit', Boolean(checked))}
          />
          <h1>Precisa de kit</h1>
        </div>
        <div className="flex ml-5 items-center space-x-2">
          <Checkbox
            className="h-[18px] w-[18px]"
            {...register('carry_peanalty')}
            onCheckedChange={(checked) => setValue('carry_peanalty', Boolean(checked))}
          />
          <h1>Penalidade de carga</h1>
        </div>
        <div className="flex ml-5 items-center space-x-2">
          <Checkbox
            className="h-[18px] w-[18px]"
            {...register('only_trained')}
            onCheckedChange={(checked) => setValue('only_trained', Boolean(checked))}
          />
          <h1>Apenas treinado</h1>
        </div>
        <div className="flex ml-5 items-center space-x-2">
          <Checkbox
            className="h-[18px] w-[18px]"
            onCheckedChange={(checked) => setValue('is_custom', Boolean(checked))}
          />
          <h1>Customizada</h1>
        </div>

        <div className="w-full flex justify-center">
          <Button type="submit" className="text-2xl rounded-xl mt-10 w-1/5">
            Criar perícia
          </Button>
        </div>
      </form>
    </div>
  );
}
