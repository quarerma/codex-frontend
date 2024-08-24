import { useQuery, useQueryClient } from '@tanstack/react-query';
import NavBar from '../../components/global/navbar';
import CreateCampaignButton from './components/create.campaign.button';
import { getUserCampaigns } from '../../api/fetch/campaigns';
import JoinCampaignButton from './components/join.campaign.button';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function ViewCampaigns() {
  const queryClient = useQueryClient();
  const { data: campaigns } = useQuery({
    queryKey: ['campaigns'],
    queryFn: () => getUserCampaigns(),
  });

  useState(() => {
    const cachedCampaigns = queryClient.getQueryData(['campaigns']);
    console.log(cachedCampaigns);
  }),
    [campaigns];
  return (
    <div className="max-w-screen min-h-screen font-inter bg-dark-bg space-y-10">
      <NavBar />
      <div className="px-20 flex justify-between">
        <JoinCampaignButton />
        <CreateCampaignButton />
      </div>
      {campaigns?.map((campaign: any, index: number) => (
        <div key={index} className="px-20 text-primary">
          <h1>{campaign.name}</h1>
          <p>{campaign.description}</p>
        </div>
      ))}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}
