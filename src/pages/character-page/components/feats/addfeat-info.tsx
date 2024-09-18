import { useState } from 'react';
import { elementValues } from '../../../../types/elements';
import { Feat } from '../../../../types/feat';
import { getElementColor } from '../../../admin/feats/components/create-feats';
import { IoMdArrowDropup } from 'react-icons/io';
import { Button } from '../../../../components/ui/button';
import { useCharacterFeats } from './character-feat';

interface AddFeatProps {
  feat: Feat;
}

export default function AddFeatInfo({ feat }: AddFeatProps) {
  const { characterFeats, setCharacterFeats } = useCharacterFeats();
  const [expanded, setExpanded] = useState(false);

  const elements = elementValues;

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  function handleAddFeat() {
    console.log('Adicionando poder');
    console.log(feat);

    const newFeats = [...characterFeats, { feat, usingAfinity: false }];

    setCharacterFeats(newFeats);
  }

  const elementColor = getElementColor(feat.element || '');
  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div
        className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2"
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className={`lg:text-2xl md:text-xl text-base font-semibold`}>{feat.name}</h1>
        <button className="lg:text-4xl text-3xl font-bold">
          {expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}
        </button>
      </div>

      <div
        className={` font-normal tracking-wide flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen  mb-6 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          {feat.element !== 'REALITY' && (
            <h3 className={`font-extralight text-lg  ${elementColor.text}`}>
              Elemento: {formatElement(feat.element || '')}
            </h3>
          )}
        </div>
        <div>
          <h3 className="font-bold text-2xl">Descrição:</h3>
          <p className="text-base" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
        </div>
        {feat.afinity && (
          <div>
            <h3 className="font-bold text-xl">Afinidade:</h3>
            <p className="text-base">{feat.afinity}</p>
          </div>
        )}
        {feat.prerequisites && (
          <div>
            <h3 className="font-bold text-xl">Pré-requisitos:</h3>
            <p className="text-base">{feat.prerequisites}</p>
          </div>
        )}
        <div className="flex items-center justify-end pt-5">
          <Button onClick={handleAddFeat} variant={'link'} className="text-primary font-inter">
            Adicionar Poder
          </Button>
        </div>
      </div>
    </div>
  );
}
