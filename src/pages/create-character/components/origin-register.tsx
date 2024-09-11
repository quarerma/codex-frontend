import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getOrigins } from '../../../api/fetch/origins';
import { useState } from 'react';
import OriginPick from './origin-pick';

export default function OriginRegister({ register, setValue, watch }: CreateComponentProps) {
  const { data: origins = [] } = useQuery({
    queryKey: ['origins'],
    queryFn: getOrigins,
  });

  return (
    <div className="flex">
      <p className="w-[40%] text-4xl leading-[60px] font-light ">
        {' '}
        O que seu personagem fazia antes de se envolver com o paranormal e ingressar na Ordem da Realidade? A origem
        representa como a vida pregressa influencia sua carreira de investigador.
        <br />
        Ao escolher uma origem, você recebe duas perícias treinadas e um poder da origem.
        <br /> Cada origem apresentada a seguir é intencionalmente vaga, apenas uma ideia por onde começar. Você pode
        usá-la como está, para jogar rapidamente, ou colorir com quantos detalhes quiser, conforme o conceito de seu
        agente.
      </p>
      <div className="flex flex-col w-[60%] items-center px-40 space-y-5">
        {origins.map((origin, index) => (
          <div key={index} className="w-full">
            <OriginPick setValue={setValue} origin={origin} />
          </div>
        ))}
      </div>
    </div>
  );
}
