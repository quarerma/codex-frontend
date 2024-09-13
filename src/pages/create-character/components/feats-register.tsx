import { useQuery } from '@tanstack/react-query';
import { CreateComponentProps } from '../props/create-component';
import { getGeneralFeats } from '../../../api/fetch/featst';
import FeatPicker from './feats-picker';
import { useEffect, useState } from 'react';

export default function FeatsRegister({ setValue, watch, register }: CreateComponentProps) {
  const { data: feats = [] } = useQuery({
    queryKey: ['feats'],
    queryFn: getGeneralFeats,
  });

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
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
        {feats.map((feat, index) => (
          <FeatPicker key={index} feat={feat} setValue={setValue} watch={watch} />
        ))}
      </div>
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 px-8 py-2 text-2xl bg-primary text-primary-foreground rounded-2xl shadow-lg hover:scale-105 duration-300"
        >
          Voltar ao Topo
        </button>
      )}
    </div>
  );
}
