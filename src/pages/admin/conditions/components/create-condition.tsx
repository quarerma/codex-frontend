import { useForm } from 'react-hook-form';
import { conditionsSchema, ConditionsSchema } from '../../../../schemas/conditions';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactQuill from 'react-quill';
import { quillModule } from '../../../../../lib/utils';
import { Input } from '../../../../components/ui/input';
import { createCondition } from '../../../../api/fetch/conditions';

export default function CreateCondition() {
  const { handleSubmit, register, setValue, watch, reset } = useForm<ConditionsSchema>({
    resolver: zodResolver(conditionsSchema),
  });

  const onSubmit = async (data: ConditionsSchema) => {
    try {
      const response = await createCondition(data);
      console.log(response);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark-bg-secondary flex flex-col space-y-10 p-5 w-full rounded-2xl h-fit border-2 border-border">
      <h1 className="text-5xl font-bold">Criar nova Condição</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="border-2 border-border p-5 text-3xl space-y-10">
        <div className="space-y-2 group">
          <h1 className="group-focus-within:text-primary">Nome da Condição:</h1>
          <Input type="text" placeholder="Preencha o nome da condição" className="ml-2" {...register('name')} />
        </div>
        <div className="space-y-2 group  h-[250px]">
          <h1 className="group-focus-within:text-primary">Descrição da Condição:</h1>
          <ReactQuill value={watch('description')} className="ml-2 h-[180px]" onChange={(content) => setValue('description', content)} modules={quillModule} />
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="bg-primary text-primary-foreground  px-5 py-2 rounded-lg">
            Criar Condição
          </button>
        </div>
      </form>
    </div>
  );
}
