import { Link, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { GiMagicSwirl, GiWarAxe, GiNotebook } from 'react-icons/gi';
import { RiDashboardFill } from 'react-icons/ri';
import { BsMagic } from 'react-icons/bs';
import { useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function CampaignSideBar() {
  const { id: campaignId } = useParams();
  const linksMap = [
    {
      name: 'Players',
      url: `/campaigns/${campaignId}/players`,
      imageComponent: <FaUser />,
    },

    {
      name: 'Perícias',
      url: `/campaigns/${campaignId}/skills`,
      imageComponent: <GiNotebook />,
    },

    {
      name: 'Equipamentos',
      url: `/campaigns/${campaignId}/equipment`,
      imageComponent: <GiWarAxe />,
    },

    {
      name: 'Poderes',
      url: `/campaigns/${campaignId}/feats`,
      imageComponent: <GiMagicSwirl />,
    },
    {
      name: 'Rituais',
      url: `/campaigns/${campaignId}/rituals`,
      imageComponent: <BsMagic />,
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      style={{
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      className={`${
        isSidebarOpen ? 'w-96' : 'w-[120px]'
      } max-h-full relative overflow-y-scroll duration-500   bg-dark-bg-secondary font-oswald border-r-4 border-border text-foreground`}
    >
      <div className={`absolute right-0 items-center z-50 px-5 py-3 duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-3xl">
          <FaArrowRightLong />
        </button>
      </div>
      <div className="flex flex-col bg-dark-bg-secondary items-center mt-5 gap-y-2 justify-center sticky top-0">
        {isSidebarOpen ? (
          <Link to={`/campaigns/${campaignId}`} className="text-center   hover:text-primary text-3xl font-bold">
            Principal
          </Link>
        ) : (
          <RiDashboardFill className="text-5xl mt-5 mb-5  hover:text-primary" />
        )}
        <div className="w-11/12 h-[2px] bg-border"></div>
      </div>
      {isSidebarOpen ? (
        <div className="flex flex-col  mt-10 gap-y-10 px-5">
          {linksMap.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className="text-2xl hover:text-primary flex items-center  gap-x-2 font-semibold transition-colors duration-200"
            >
              {link.imageComponent}
              {link.name}
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center text-[2.35rem] items-center mt-10 gap-y-10 px-5">
          {linksMap.map((link, index) => (
            <Link
              key={index}
              to={link.url}
              className=" hover:text-primary flex items-center  gap-x-2 font-semibold transition-colors duration-200"
            >
              {link.imageComponent}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
