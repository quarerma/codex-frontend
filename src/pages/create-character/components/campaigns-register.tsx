import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getUserCampaignsAsPlayer } from '../../../api/fetch/campaigns';
import { useEffect, useState } from 'react';
import { Campaign } from '../../../types/campaign';

export default function CampaignsRegister({ watch, setValue }: CreateComponentProps) {
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns-player'],
    queryFn: getUserCampaignsAsPlayer,
  });

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign>();
  useEffect(() => {
    console.log(watch('campaignId'));
  }, [watch('campaignId')]);

  function unselectCampaign() {
    setValue('campaignId', '');
  }

  if (!watch('campaignId')) {
    return (
      <div className="grid grid-cols-4 auto-rows-[250px] font-light items-center gap-x-12">
        {campaigns?.map((campaign, index) => (
          <div
            key={index}
            onClick={() => {
              setValue('campaignId', campaign.id);
              setSelectedCampaign(campaign);
            }}
            className="bg-dark-bg-secondary w-[95%] text-center h-full hover:drop-shadow-[0_4px_20px_rgba(255,255,0,0.37)] hover:scale-105 duration-300 text-sm flex flex-col space-y-3 rounded-2xl border border-primary text-foreground font-oswald px-5 py-5 cursor-pointer"
          >
            <div className="flex-grow space-y-4">
              <div className="space-y-1">
                <h1 className="text-2xl text-center">{campaign.name}</h1>
                <div className="w-full h-[2px] bg-muted"></div>
              </div>
              <h1>Mestre: {campaign.owner.username}</h1>
              <h1 className="xl:text-sm">{campaign.description}</h1>
            </div>
            <div className="w-full justify-center flex">
              <button className="text-foreground text-sm w-fit text-center font-semibold px-10 py-1 rounded-xl bg-dark-bg-secondary border-[1px] border-primary">
                Selecionar
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Caso uma campanha tenha sido selecionada
  return (
    <div className="flex flex-col justify-center items-center space-y-20">
      <div className="w-full mt-10 font-oswald font-extralight flex justify-center items-center space-x-20">
        <button
          onClick={unselectCampaign}
          className="text-foreground hover:scale-110 text-xl duration-300 w-fit text-center font-normal px-10 py-1 rounded-xl bg-dark-bg-secondary border-[1px] border-primary"
        >
          Mudar Campanha
        </button>
        <div className=" text-4xl bg-dark-bg-secondary border border-primary p-5 flex flex-col rounded-2xl text-center space-y-10">
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
