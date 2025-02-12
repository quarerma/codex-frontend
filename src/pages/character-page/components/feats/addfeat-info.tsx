import { useState } from 'react';
import { elementValues } from '../../../../types/elements';
import { Feat } from '../../../../types/feat';
import { getElementColor } from '../../../admin/feats/components/create-feats';
import { IoMdArrowDropup } from 'react-icons/io';
import { Button } from '../../../../components/ui/button';
import { useCharacterFeats } from './character-feat';
import { assignCharacterFeat } from '../../../../api/fetch/character.feats';
import { useCharacter } from '../../character-page';

interface AddFeatProps {
  feat: Feat;
}

export default function AddFeatInfo({ feat }: AddFeatProps) {
  const { characterFeats, addFeat } = useCharacterFeats();
  const [expanded, setExpanded] = useState(false);

  const elements = elementValues;

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  const { character } = useCharacter();
  async function handleAddFeat() {
    try {
      addFeat({ feat, usingAfinity: false });
      await assignCharacterFeat(character.id, feat.id);
    } catch (error) {
      console.error(error);
    }
  }

  const elementColor = getElementColor(feat.element || '');
  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <h1 className={`lg:text-4xl md:text-3xl text-xl font-semibold`}>{feat.name}</h1>
        <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={` font-normal tracking-wide flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen  mb-6 ' : 'max-h-0 h-0'
        }`}
      >
        <div>{feat.element !== 'REALITY' && <h3 className={`font-extralight text-2xl  ${elementColor.text}`}>Elemento: {formatElement(feat.element || '')}</h3>}</div>
        <div>
          <h3 className="font-bold text-4xl">Descrição:</h3>
          <p className="text-xl" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
        </div>
        {feat.afinity && (
          <div>
            <h3 className="font-bold text-3xl">Afinidade:</h3>
            <p className="text-xl">{feat.afinity}</p>
          </div>
        )}
        {feat.prerequisites && (
          <div>
            <h3 className="font-bold text-3xl">Pré-requisitos:</h3>
            <p className="text-xl">{feat.prerequisites}</p>
          </div>
        )}
        <div className="flex items-center justify-end pt-5">
          <Button onClick={handleAddFeat} variant={'link'} className="text-primary ">
            Adicionar Poder
          </Button>
        </div>
      </div>
    </div>
  );
}
