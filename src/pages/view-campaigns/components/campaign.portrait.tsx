import { Link } from 'react-router-dom';
import { Campaign } from '../../../types/campaign';
import { format } from 'date-fns';

interface CampaignPortraitProps {
  campaign: Campaign;
  isDMing: boolean;
}
export default function CampaignPortrait({ campaign, isDMing }: CampaignPortraitProps) {
  const formattedCreatedAt = format(new Date(campaign.createdAt), 'dd/MM/yyyy');
  return (
    <Link
      to={`${campaign.id}`}
      className="bg-dark-bg-secondary w-[95%] hover:drop-shadow-[0_4px_50px_rgba(255,255,0,0.37)] hover:scale-105 duration-300 text-sm flex flex-col space-y-3  rounded-2xl border border-primary text-foreground font-inter px-5 py-5"
    >
      <div className="flex-grow space-y-4">
        <div className="space-y-1">
          <h1 className="text-2xl text-center">{campaign.name}</h1>
          <div className="w-full h-[2px] bg-muted "></div>
        </div>
        <h1 className="xl:text-base lg:text-sm">{campaign.description}</h1>
      </div>

      <div className="mt-auto text-muted-foreground">
        {isDMing ? <h1>Mestrando</h1> : <h1>Mestre: {campaign.owner.username}</h1>}
        <h1 className="text-xs ">Criada em: {formattedCreatedAt}</h1>
      </div>
    </Link>
  );
}
