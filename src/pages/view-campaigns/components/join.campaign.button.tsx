import { Link } from 'react-router-dom';

export default function JoinCampaignButton() {
  return (
    <Link
      to={'/create-campaign'}
      className="text-foreground text-2xl font-semibold px-10 py-1 rounded-xl hover:bg-primary-foreground bg-dark-bg-secondary border-[1px] border-primary"
    >
      Participar de uma campanha
    </Link>
  );
}
