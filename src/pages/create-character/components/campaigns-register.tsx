import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getUserCampaignsAsPlayer } from '../../../api/fetch/campaigns';
import { Campaign } from '../../../types/campaign';
import { useCharacterCreation } from '../create-character';
import { Button } from '../../../components/ui/button';

export default function CampaignsRegister({ setValue }: CreateComponentProps) {
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns-player'],
    queryFn: getUserCampaignsAsPlayer,
  });

  const { selectedCampaign, setSelectedCampaign } = useCharacterCreation();

  function unselectCampaign() {
    setSelectedCampaign(null);
    setValue('campaignId', '');
  }

  if (!selectedCampaign) {
    return (
      <div className="grid grid-cols-4 auto-rows-[300px] font-light items-center gap-x-12">
        {campaigns?.map((campaign: Campaign, index: number) => (
          <div
            key={index}
            onClick={() => {
              setValue('campaignId', campaign.id);
              setSelectedCampaign(campaign);
            }}
            className="bg-dark-bg-secondary w-[95%] text-center h-full hover:border-white/70 hover:drop-shadow-[0_4px_20px_rgba(255,255,255,0.55)] hover:scale-105 duration-300 text-sm flex flex-col space-y-3 rounded-2xl border-[3px] border-border text-foreground font-oswald px-5 py-5 cursor-pointer"
          >
            <div className="flex-grow space-y-3">
              <div className="space-y-1">
                <h1 className="text-3xl text-center">{campaign.name}</h1>
                <div className="w-full h-[2px] bg-muted"></div>
              </div>
              <h1>Mestre: {campaign.owner.username}</h1>
              <h1 className="xl:text-lg">{campaign.description}</h1>
            </div>
            <div className="w-full justify-center flex">
              <Button size={'sm'} className=" text-sm w-fit text-center font-semibold px-10 py-1 rounded-lg ">
                Selecionar
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Caso uma campanha tenha sido selecionada
  return (
    <div className="flex flex-col justify-center items-center space-y-20">
      <div className="w-full font-oswald font-extralight flex justify-center space-x-20">
        <Button className="mt-5 text-2xl p-6 rounded-xl" variant={'secondary'} onClick={unselectCampaign}>
          Mudar Campanha
        </Button>
        <div className="text-4xl bg-dark-bg-secondary w-[40%]  border-border border-[3px] p-5 flex flex-col rounded-2xl text-center space-y-10">
          <div className="space-y-2">
            <h1>{selectedCampaign?.name}</h1>
            <div className="w-full h-[2px] bg-muted"></div>
          </div>
          <div className="text-3xl flex flex-col gap-y-5 text-start">
            <h1>Mestre: {selectedCampaign?.owner.username}</h1>
            <h1>{selectedCampaign?.description}</h1>
          </div>
        </div>
      </div>
      <p className="text-3xl text-center text-red-500">
        A Campanha selecionada será onde o personagem será criado. <br /> Essa escolha não poderá ser alterada
        futuramente, então escolha com cuidado.
      </p>
    </div>
  );
}
