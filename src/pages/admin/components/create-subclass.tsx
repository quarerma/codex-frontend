import { useQuery } from '@tanstack/react-query';
import { getClasses } from '../../../api/fetch/classes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSubClassSchema, CreateSubClassSchema } from '../../../schemas/create.subclass';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { createSubclass, getSubclasses } from '../../../api/fetch/subclass';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';

export default function CreateSubClasses() {
  const { data: classes } = useQuery({
    queryKey: ['classes'],
    queryFn: () => getClasses(),
  });

  const { data: subclasses } = useQuery({
    queryKey: ['subclasses'],
    queryFn: () => getSubclasses(),
  });

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateSubClassSchema>({
    resolver: zodResolver(createSubClassSchema),
  });
  const description = watch('description'); // Para observar mudanças no campo

  // UseEffect para registrar o campo quando o componente monta
  useEffect(() => {
    register('description', { required: true });
  }, [register]);

  const onSubmit = async (data: CreateSubClassSchema) => {
    try {
      console.log(data);
      const response = await createSubclass(data);

      console.log(response);
      reset();
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
          <h1 className="group-focus-within:text-primary">Classe:</h1>
          <select className="p-2 border-2 bg-card border-border rounded ml-5" {...register('classId')}>
            <option value="">Selecione uma classe</option>
            {classes?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" className="text-2xl rounded-xl mt-10 w-1/5">
            Criar subclasse
          </Button>
        </div>
      </form>
      {subclasses?.map((subclass) => (
        <div key={subclass.id} className="border-2 border-border p-5 text-xl space-y-10">
          <h1 className="text-3xl font-bold">{subclass.name}</h1>
          <p>{subclass.description}</p>
          <p>{subclass.class.name}</p>
          <p dangerouslySetInnerHTML={{ __html: subclass.class.description }}></p>
        </div>
      ))}
    </div>
  );
}
