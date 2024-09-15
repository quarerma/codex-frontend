import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getClasses } from '../../../api/fetch/classes';
import ClassPick, { ClassFocus } from './classes-picker';
import { useCharacterCreation } from '../create-character';
import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';

export default function ClassesRegister({ setValue, watch }: CreateComponentProps) {
  const { data: classes = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: getClasses,
  });

  const { selectedClass, setSelectedClass, setSelectedSubclass } = useCharacterCreation();

  const unSelectClass = () => {
    setSelectedClass(null);
    setValue('classId', undefined);
    setValue('subclassId', undefined);
    setSelectedSubclass(null);
  };

  return selectedClass ? (
    <div className="flex flex-col justify-center items-center space-y-20">
      <div className="w-full font-oswald font-extralight flex justify-center space-x-20">
        <Button className="mt-5 text-2xl p-6 rounded-xl" variant={'secondary'} onClick={unSelectClass}>
          Mudar Classe
        </Button>
        <ClassFocus classModel={selectedClass} setValue={setValue} />
      </div>
    </div>
  ) : (
    <div className="flex justify-center  ">
      <p className="w-[40%] text-2xl leading-10  ml-10 font-light ">
        Sua classe representa o treinamento que você recebeu na Ordem para enfrentar os horrores do Outro Lado. Em
        termos de jogo, é o seu traço mais essencial, pois define suas habilidades e seu papel no grupo de
        investigadores. O <strong>Ordem Paranormal RPG</strong> apresenta três classes, cada uma representando um
        arquétipo distinto de heróis em histórias de terror e suspense:
        <br />
        <br />
        <strong className="text-primary">Combatente:</strong> Um mestre em armas brancas e de fogo, sempre na linha de
        frente da batalha contra o Outro Lado. Jogue com um combatente se quiser ser o escudo do grupo — forte,
        perigoso, e implacável.
        <br />
        <br />
        <strong className="text-primary">Especialista:</strong> Com uma mente afiada, muita lábia e um arsenal de
        conhecimentos, o especialista resolve problemas com criatividade. Jogue com um especialista se quiser ser a
        chave para superar desafios complexos, versátil em qualquer situação.
        <br />
        <br />
        <strong className="text-primary">Ocultista:</strong> Um profundo conhecedor do paranormal, que desvenda os
        mistérios do Outro Lado e os utiliza em rituais poderosos. Jogue com um ocultista se quiser controlar forças
        sobrenaturais — mas lembre-se, todo poder vem com um preço.
        <br />
        <br />
        Escolha com sabedoria. Sua classe determinará como você enfrentará os segredos e perigos que espreitam além do
        véu.
      </p>
      <div className="flex flex-col w-[60%] items-center px-40 space-y-5">
        {classes.map((classObj, index) => (
          <ClassPick key={index} classModel={classObj} setValue={setValue} />
        ))}
      </div>
    </div>
  );
}
