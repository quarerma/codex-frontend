import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getOrigins } from '../../../api/fetch/origins';
import { useEffect, useState } from 'react';
import OriginPick from './origin-pick';
import { Origin } from '../../../types/origin';
import { Button } from '../../../components/ui/button';
import { useCharacterCreation } from '../create-character';
import { FaSearch } from 'react-icons/fa';

export default function OriginRegister({ setValue }: CreateComponentProps) {
  const { data: origins = [] } = useQuery({
    queryKey: ['origins'],
    queryFn: getOrigins,
  });

  const { selectedOrigin, setSelectedOrigin } = useCharacterCreation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredOrigins, setFilteredOrigins] = useState<Origin[]>(origins);

  useEffect(() => {
    let filtered = origins;

    if (searchTerm) {
      filtered = filtered.filter((origin) => origin.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredOrigins(filtered);
  }, [searchTerm, origins]);

  function unselectOrigin() {
    setValue('originId', undefined);
    setSelectedOrigin(null);
  }

  return selectedOrigin ? (
    <div className="flex flex-col justify-center items-center space-y-20">
      <div className="w-full font-oswald font-extralight flex justify-center space-x-20">
        <Button className="mt-5 text-2xl p-6 rounded-xl" variant={'secondary'} onClick={unselectOrigin}>
          Mudar Origem
        </Button>
        <div className="text-3xl bg-dark-bg-secondary border-[3px] w-[50%] border-border p-5 flex flex-col rounded-2xl space-y-10">
          <div className="space-y-5">
            <h1 className="font-bold text-4xl text-center">{selectedOrigin.name}</h1>
            <div className="w-full h-[2px] bg-muted"></div>
          </div>
          <div>
            <h3 className="font-bold mb-1">Descrição:</h3>
            <p
              className="text-[1.3rem] leading-7 font-extralight"
              dangerouslySetInnerHTML={{ __html: selectedOrigin.description }}
            ></p>
          </div>
          <div>
            <h1 className="font-bold">Perícias Treinadas</h1>
            <ul className="list-disc list-inside text-xl font-light">
              {selectedOrigin.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="font-bold mb-2">Poder de Origem</h1>
            <label className="flex flex-col font-extralight text-xl">
              <h1>{selectedOrigin.feats.name}:</h1>
              <h1 dangerouslySetInnerHTML={{ __html: selectedOrigin.feats.description }}></h1>
            </label>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center">
      <p className="w-[40%] text-[2rem] leading-[55px] ml-10 font-light ">
        O que seu personagem fazia antes de se envolver com o paranormal e ingressar na Ordem da Realidade? A origem
        representa como a vida pregressa influencia sua carreira de investigador.
        <br />
        Ao escolher uma origem, você recebe duas perícias treinadas e um poder da origem.
        <br /> Cada origem apresentada a seguir é intencionalmente vaga, apenas uma ideia por onde começar. Você pode
        usá-la como está, para jogar rapidamente, ou colorir com quantos detalhes quiser, conforme o conceito de seu
        agente.
      </p>
      <div className="flex flex-col w-[60%] items-center px-40 space-y-5">
        <div className="flex w-full">
          <div className="flex-col w-full border-b-2 border-border">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder:text-foreground placeholder:text-4xl font-extralight text-3xl bg-transparent w-full focus:outline-none"
            />
            <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
          </div>
          <FaSearch className="text-2xl" />
        </div>

        {filteredOrigins.map((origin, index) => (
          <div key={index} className="w-full">
            <OriginPick setValue={setValue} origin={origin} />
          </div>
        ))}
      </div>
    </div>
  );
}
