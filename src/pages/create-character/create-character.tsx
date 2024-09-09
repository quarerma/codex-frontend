import { useEffect, useState } from 'react';
import NavBar from '../../components/global/navbar';
import { getUserById } from '../../api/fetch/user';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createCharacterSchema, CreateCharacterSchema } from '../../schemas/create.character';
import { zodResolver } from '@hookform/resolvers/zod';
import CampaignsRegister from './components/campaigns-register';

export default function CreateCharacter() {
  const creationNavBar = [
    { name: 'Campanha', value: 0 },
    { name: 'Atributos', value: 1 },
    { name: 'Origem', value: 2 },
    { name: 'Classe', value: 3 },
    { name: 'Poderes', value: 4 },
    { name: 'Rituais', value: 5 },
  ];

  const [activeComponent, setActiveComponent] = useState(0);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => getUserById(),
  });

  const { handleSubmit, register, setValue, watch } = useForm<CreateCharacterSchema>({
    resolver: zodResolver(createCharacterSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('ownerId', user.id);
    }
  }, [user]);

  const onSubmit = async (data: CreateCharacterSchema) => {
    console.log(data);
  };

  const getComponent = (component: number) => {
    switch (component) {
      case 0:
        return <CampaignsRegister register={register} watch={watch} setValue={setValue} />;
      case 1:
        return <div>ATRIBUTOS</div>;
      case 2:
        return <div>ORIGENS</div>;
      case 3:
        return <div>CLASSE</div>;
      case 4:
        return <div>RITUAIS</div>;
      case 5:
        return <div>PODERES</div>;
    }
  };
  return (
    <div className="max-w-screen min-h-screen font-oswald text-foreground flex flex-col bg-dark-bg space-y-10">
      <NavBar />
      <h1 className="text-[#E1E1E1]/60 text-5xl tracking-[0.3rem] ml-10 font-semibold">Character Builder</h1>

      <div className="flex justify-between items-center w-full  ">
        <div className="w-[800px] h-[1px] "></div>
        {creationNavBar.map((item, index) => (
          <div key={index} className="flex items-center w-full  font-extralight relative">
            <div className="flex flex-col items-center space-y-12">
              <h1
                className="text-3xl z-10 cursor-pointer hover:scale-105 duration-100"
                onClick={() => setActiveComponent(item.value)}
              >
                {item.name}
              </h1>
              {activeComponent === item.value && <div className="w-4 h-4 rounded-full  bg-primary absolute "></div>}
            </div>
            {index !== creationNavBar.length - 1 && <label className="flex-1 h-[1px] bg-white mx-12"></label>}
          </div>
        ))}
      </div>
      <form className="ml-20 py-10 " onSubmit={handleSubmit(onSubmit)}>
        {getComponent(activeComponent)}
      </form>
    </div>
  );
}
