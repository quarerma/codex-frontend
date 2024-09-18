import { z } from 'zod';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { joinCampaign } from '../../../api/fetch/campaigns';
import { useQueryClient } from '@tanstack/react-query';
import { Campaign } from '../../../types/campaign';

export const JoinCampaignSchema = z.object({
  campaignId: z.string().min(1),
  password: z.string().min(1),
});
export type JoinCampaignSchema = z.infer<typeof JoinCampaignSchema>;
export default function JoinCampaignButton() {
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit } = useForm<JoinCampaignSchema>({
    resolver: zodResolver(JoinCampaignSchema),
  });

  const onSubmit = async (data: JoinCampaignSchema) => {
    try {
      const response = await joinCampaign(data);

      const cacheData: Campaign[] | undefined = queryClient.getQueryData(['campaigns']);

      if (!cacheData) {
        queryClient.setQueryData(['campaigns'], response);
      } else {
        queryClient.setQueryData(['campaigns'], [...cacheData, response]);
      }

      queryClient.invalidateQueries({ queryKey: ['campaigns-player'] });

      reset({
        campaignId: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-foreground  h-full text-2xl font-semibold px-10 py-1 rounded-xl hover:bg-primary-foreground bg-dark-bg-secondary border-[1px] border-primary">
        Entrar em uma campanha
      </DialogTrigger>
      <DialogContent className="text-foreground border-primary">
        <DialogHeader>
          <DialogTitle className="p-2 mb-5 text-3xl">Participar de uma Campanha</DialogTitle>
          <DialogDescription className="space-y-5 flex flex-col items-center">
            <Input type="text" placeholder="Código da Campanha" {...register('campaignId')} />
            <Input type="password" placeholder="Senha" {...register('password')} />
          </DialogDescription>
          <DialogFooter className="flex w-full flex-col items-center px-10">
            <div className="w-full flex  items-center justify-between pt-5">
              <DialogClose className="text-xl">
                <Button type="button" variant="secondary" className="rounded-2xl text-xl">
                  Cancelar
                </Button>
              </DialogClose>
              <Button onClick={handleSubmit(onSubmit)} type="submit" className="text-xl rounded-2xl">
                Participar
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
