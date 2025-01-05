import { useState } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';

import { Ritual } from '../../../../types/ritual';
import { elementValues } from '../../../../types/elements';
import { getElementColor } from '../../../admin/feats/components/create-feats';
import { ritualRange } from '../../../../types/range';
import { Button } from '../../../../components/ui/button';
import { useCharacterRituals } from './character-rituals';
import { useCharacter } from '../../character-page';
import { assignCharacterRitual } from '../../../../api/fetch/character.rituals';

interface RitualInfoProps {
  ritual: Ritual;
}

export default function AddRitualInfo({ ritual }: RitualInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const { characterRituals, setCharacterRituals } = useCharacterRituals();

  const elements = elementValues;
  const range = ritualRange;

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  function formatRange(value: string) {
    const index = range.findIndex((range) => range.value === value);

    return range[index].label;
  }

  const elementColor = getElementColor(ritual.element || '');

  const { character } = useCharacter();

  async function handleAddRitual() {
    try {
      await assignCharacterRitual(character.id, ritual.id);
      const newRituals = [...characterRituals, { ritual, ritual_cost: ritual.normalCost }];

      setCharacterRituals(newRituals);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <h1 className="lg:text-2xl md:text-xl text-base font-semibold">{ritual.name}</h1>
        </div>
        <button className="lg:text-4xl text-3xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={`lg:text-2xl md:text-lg text-base  tracking-wide font-normal flex flex-col space-y-2 overflow-x-auto overflow-y-scroll lg:px-8 md:px-4 px-2 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen mb-6 ' : 'max-h-0 h-0'
        }`}
      >
        <div className="font-extralight text-lg ">
          <h3 className={`font-light text-lg w-fit px-1 mb-2 ${elementColor.bg} ${elementColor.text_foreground} `}>
            {formatElement(ritual.element || '')} {ritual.ritualLevel}
          </h3>
          <div className=" flex flex-col">
            <h3>Alcance: {formatRange(ritual.range || '')}</h3>
            <h1>Execução: {ritual.exectutionTime}</h1>
            <h1>Alvo: {ritual.target}</h1>
            <h1>Duração: {ritual.duration}</h1>
          </div>
        </div>

        <div>
          <p className="text-[1.1rem] leading-7 font-normal" dangerouslySetInnerHTML={{ __html: ritual.normalCastDescription }}></p>
        </div>
        {ritual.discentCastDescription && (
          <div className="text-lg font-bold">
            <h1>Discente (+{ritual.discentCost} PE)</h1>
            <p className="text-[1.1rem] leading-7 font-normal" dangerouslySetInnerHTML={{ __html: ritual.discentCastDescription }}></p>
          </div>
        )}
        {ritual.trueCastDescription && (
          <div className="text-lg font-bold">
            <h1>Verdadeiro (+{ritual.trueCost} PE)</h1>
            <p className="text-[1.1rem] leading-7 font-normal" dangerouslySetInnerHTML={{ __html: ritual.trueCastDescription }}></p>
          </div>
        )}
        {ritual.conditions.length > 0 && (
          <div>
            <h3 className="font-bold text-lg">Condições:</h3>
            {ritual.conditions.map((condition) => (
              <p key={condition.condition.id} className="text-base">
                {condition.condition.name}
              </p>
            ))}
          </div>
        )}
        <div className="flex items-center justify-end pt-5">
          <Button onClick={handleAddRitual} variant={'link'} className="text-primary font-inter">
            Adicionar Ritual
          </Button>
        </div>
      </div>
    </div>
  );
}
