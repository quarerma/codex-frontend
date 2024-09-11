import { useQuery } from '@tanstack/react-query';
import NavBar from '../../components/global/navbar';
import CreateCampaignButton from './components/create.campaign.button';
import { getUserCampaigns } from '../../api/fetch/campaigns';
import JoinCampaignButton from './components/join.campaign.button';

import { useState, useEffect } from 'react';
import { Campaign } from '../../types/campaign';
import { getUserById } from '../../api/fetch/user';
import { FaSearch } from 'react-icons/fa';
import CampaignPortrait from './components/campaign.portrait';

export default function ViewCampaigns() {
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getUserCampaigns(),
  });

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserById(),
  });

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    if (campaigns) {
      setFilteredCampaigns(
        campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, campaigns]);

  return (
    <div className="max-w-screen min-h-screen font-oswald bg-dark-bg space-y-10">
      <NavBar />

      <div className="flex justify-between  items-center text-foreground ml-20 pb-10 mr-20 ">
        <div className="flex ">
          <div className=" flex-col border-b-2 border-border">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className=" placeholder:text-foreground placeholder:text-4xl placeholder:font-extrabold text-3xl  bg-transparent w-full focus:outline-none"
            />
            <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
          </div>
          <FaSearch className="text-2xl" />
        </div>
        <JoinCampaignButton />
        <CreateCampaignButton />
      </div>
      <div className="grid grid-cols-3   auto-rows-[200px] gap-14 ml-20 mr-20">
        {filteredCampaigns.map((campaign: Campaign, index: number) => (
          <div key={index} className="flex  justify-center">
            <CampaignPortrait campaign={campaign} isDMing={campaign.owner.id === user?.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
