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
    <div className="max-w-screen min-h-screen text-inter text-foreground bg-dark-bg space-y-10">
      <Navbar />
      <div className="px-20 relative">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5 relative">
          <h1 className="text-4xl font-bold">Criar campanha</h1>
          <div>
            <Input placeholder="Nome" className="w-1/4" {...register('name')} />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <Input type="password" placeholder="Senha" className="w-1/4" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div>
            <Textarea placeholder="Descrição" className="w-3/4 h-[200px] resize-none" {...register('description')} />
            {errors.description && <span>{errors.description.message}</span>}
          </div>

          <div className="flex w-3/4 justify-end">
            <Button type="submit" className="self-end text-2xl rounded-xl">
              Create Campaign
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
