import { createContext, useContext, useEffect, useState } from 'react';
import NavBar from '../../components/global/navbar';
import { getUserById } from '../../api/fetch/user';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createCharacterSchema, CreateCharacterSchema } from '../../schemas/create.character';
import { zodResolver } from '@hookform/resolvers/zod';
import CampaignsRegister from './components/campaigns-register';
import { getUserCampaignsAsPlayer } from '../../api/fetch/campaigns';
import JoinCampaignButton from '../view-campaigns/components/join.campaign.button';
import AtributesRegister from './components/atributes-register';
import OriginRegister from './components/origin-register';
import { Origin } from '../../types/origin';
import { Campaign } from '../../types/campaign';
import ClassesRegister from './components/classes-register';
import { ClassModel } from '../../types/class';
import { Subclass } from '../../types/sublass';
import FeatsRegister from './components/feats-register';
import { Feat } from '../../types/feat';

const CharacterCreationContext = createContext<
  | {
      selectedCampaign: Campaign | null;
      setSelectedCampaign: (campaign: Campaign | null) => void;
      selectedOrigin: Origin | null;
      setSelectedOrigin: (origin: Origin | null) => void;
      selectedClass: ClassModel | null;
      setSelectedClass: (classModel: ClassModel | null) => void;
      selectedSubclass: Subclass | null;
      setSelectedSubclass: (subclass: Subclass | null) => void;
      selectedFeats: Feat[] | null;
      setSelectedFeats: (feats: Feat[] | null) => void;
    }
  | undefined
>(undefined);

export const useCharacterCreation = () => {
  const context = useContext(CharacterCreationContext);
  if (!context) {
    throw new Error('useCharacterCreation must be used within a CharacterCreationProvider');
  }
  return context;
};

export default function CreateCharacter() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassModel | null>(null);
  const [selectedSubclass, setSelectedSubclass] = useState<Subclass | null>(null);
  const [selectedFeats, setSelectedFeats] = useState<Feat[] | null>(null);

  const creationNavBar = [
    { name: 'Campanha', value: 0 },
    { name: 'Atributos', value: 1 },
    { name: 'Origem', value: 2 },
    { name: 'Classe', value: 3 },
    { name: 'Poderes', value: 4 },
    { name: 'Rituais', value: 5 },
  ];

  const { data: campaigns } = useQuery({
    queryKey: ['campaigns-player'],
    queryFn: getUserCampaignsAsPlayer,
  });

  const [activeComponent, setActiveComponent] = useState(0);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getUserById(),
  });

  const { handleSubmit, register, setValue, watch } = useForm<CreateCharacterSchema>({
    resolver: zodResolver(createCharacterSchema),
    defaultValues: {
      strenght: 1,
      dexterity: 1,
      vitality: 1,
      intelligence: 1,
      presence: 1,
    },
  });

  useEffect(() => {
    console.log(watch());
  }, [watch('featsId')]);

  useEffect(() => {
    if (user) {
      setValue('ownerId', user.id);
    }
  }, [user, setValue]);

  const onSubmit = async (data: CreateCharacterSchema) => {
    console.log(data);
  };

  const getComponent = (component: number) => {
    switch (component) {
      case 0:
        return <CampaignsRegister register={register} watch={watch} setValue={setValue} />;
      case 1:
        return <AtributesRegister register={register} watch={watch} setValue={setValue} />;
      case 2:
        return <OriginRegister register={register} watch={watch} setValue={setValue} />;
      case 3:
        return <ClassesRegister register={register} watch={watch} setValue={setValue} />;
      case 4:
        return <FeatsRegister register={register} watch={watch} setValue={setValue} />;
      case 5:
        return <div>RITUAIS</div>;
      default:
        return null;
    }
  };
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <CharacterCreationContext.Provider
      value={{
        selectedSubclass,
        setSelectedSubclass,
        selectedCampaign,
        setSelectedCampaign,
        selectedOrigin,
        setSelectedOrigin,
        selectedClass,
        setSelectedClass,
        selectedFeats,
        setSelectedFeats,
      }}
    >
      <div className="max-w-screen min-h-screen overflow-x-hidden  font-oswald text-foreground flex flex-col bg-dark-bg space-y-10">
        <div className="fixed">
          <NavBar />
        </div>
        <h1 className="text-[#E1E1E1]/60  pt-[100px] text-5xl tracking-[0.3rem] ml-10 font-semibold">
          Character Builder
        </h1>
        {campaigns?.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 space-y-10">
            <h1 className="text-3xl">Você não está em nenhuma campanha</h1>
            <JoinCampaignButton />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center w-full">
              <div className="w-[800px] h-[1px]"></div>
              {creationNavBar.map((item, index) => (
                <div key={index} className="flex items-center w-full font-extralight ">
                  <div className="flex flex-col items-center ">
                    <h1
                      className={`text-3xl  cursor-pointer hover:scale-105 duration-100`}
                      onClick={() => setActiveComponent(item.value)}
                    >
                      {item.name}
                    </h1>
                    {activeComponent === item.value && <div className="w-4 h-4 rounded-full mt-2 bg-primary  "></div>}
                  </div>
                  {index !== creationNavBar.length - 1 && <label className="flex-1 h-[1px] bg-white mx-12"></label>}
                </div>
              ))}
            </div>
            <form className="ml-32 py-10 " onSubmit={handleSubmit(onSubmit)}>
              {getComponent(activeComponent)}
            </form>
          </>
        )}
        <div className="w-full flex justify-center ">
          {showScrollButton && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-5 justify-center px-8 py-2 text-2xl bg-primary text-primary-foreground rounded-2xl shadow-lg hover:scale-105 duration-300"
            >
              Voltar ao Topo
            </button>
          )}
        </div>
      </div>
    </CharacterCreationContext.Provider>
  );
}
