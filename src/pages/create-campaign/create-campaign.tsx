import { useForm } from 'react-hook-form';
import Navbar from '../../components/global/navbar';
import { createCampaignSchema, CreateCampaignSchema } from '../../schemas/create.campaign';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { createCampaign } from '../../api/fetch/campaigns';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Campaign } from '../../types/campaign';
import PageSetup from '../../components/ui/page-setup';

export default function CreateCampaign() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSubmit = async (data: CreateCampaignSchema) => {
    try {
      const response = await createCampaign(data);

      const cachedCampaigns: Campaign[] | undefined = queryClient.getQueryData(['campaigns']);

      if (cachedCampaigns) {
        queryClient.setQueryData(['campaigns'], [...cachedCampaigns, response]);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
    navigate('/campaigns');
  };
  return (
    <PageSetup>
      <div className="relative space-y-10">
        <h1 className="text-4xl font-bold">Criar campanha</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-8 relative bg-dark-bg-secondary border-4 p-5 -mb-5 rounded-xl border-border ">
          <div>
            <h1 className="mb-4 text-2xl font-medium">Nome:</h1>
            <Input placeholder="Preencha com o nome da campanha" className="w-1/4 ml-3" {...register('name')} />
            {errors.name && <span className="text-red mt-2">{errors.name.message}</span>}
          </div>
          <div>
            <h1 className="mb-4 text-2xl font-medium">Senha:</h1>
            <Input type="password" placeholder="Crie uma senha" className="w-1/4 ml-3" {...register('password')} />
            {errors.password && <span className="text-red mt-2">{errors.password.message}</span>}
          </div>
          <div>
            <h1 className="mb-4 text-2xl font-medium">Descrição:</h1>
            <Textarea placeholder="Adicinar descrição..." className="w-[85%] h-[200px] resize-none ml-3" {...register('description')} />
            {errors.description && <span className="text-red mt-2">{errors.description.message}</span>}
          </div>

          <div className="flex mr-10 py-10 justify-end">
            <Button type="submit" variant={'default'} size={'lg'}>
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </PageSetup>
  );
}
