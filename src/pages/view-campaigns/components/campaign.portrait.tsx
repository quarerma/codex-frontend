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
      className="bg-dark-bg-secondary hover:border-2 hover:scale-105  duration-300 text-sm flex flex-col justify-center space-y-2 w-full rounded-2xl border border-primary text-foreground font-inter  px-5 py-3"
    >
      <h1 className="text-2xl   text-center">{campaign.name}</h1>
      <h1 className="text-sm">{campaign.description}</h1>
      <div>
        {isDMing ? <h1>Mestrando</h1> : <h1>Mestre: {campaign.owner.username}</h1>}
        <h1>Criada em: {formattedCreatedAt}</h1>
      </div>
    </Link>
  );
}
