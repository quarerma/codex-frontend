import { useState } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';

import { Ritual } from '../../../../types/ritual';
import { elementValues } from '../../../../types/elements';
import { getElementColor } from '../../../admin/feats/components/create-feats';
import { ritualRange } from '../../../../types/range';
import { Button } from '../../../../components/ui/button';
import { useCharacter } from '../../character-page';
import { removeCharacterRitual } from '../../../../api/fetch/character.rituals';
import { toast } from 'sonner';
import { rollDamage } from '../dieRoller/roller';
import { formatDamageType } from '../../../../components/format/formatters';

interface RitualInfoProps {
  ritual: Ritual;
  ritual_cost: number;
}

export default function RitualInfo({ ritual, ritual_cost }: RitualInfoProps) {
  const [expanded, setExpanded] = useState(false);

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

  const rollAttack = (die: string, castType: string, damageType: string) => {
    const result = rollDamage(die);
    console.log(result);
    toast(`${ritual.name} ${castType}`, {
      classNames: {
        description: 'text-xl font-light ',
        title: 'text-xl font-bold w-full ',
      },

      className: `bg-dark-bg-secondary flex  border ${elementColor.border}  text-foreground`,
      description: (
        <div className="flex w-full gap-x-5">
          <h1>Total</h1>
          <span>{result.total}</span>
          <span>{damageType}</span>
        </div>
      ),
    });
    return result;
  };

  const { character } = useCharacter();

  async function handleRemoveRitual() {
    try {
      await removeCharacterRitual(character.id, ritual.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <h1 className="lg:text-2xl md:text-xl text-base font-semibold">{ritual.name}</h1>
          <div className="z-50">
            {ritual.type === 'DAMAGE' && (
              <h1 className="space-x-2 flex">
                <span>Dano:</span>
                {ritual.damageRitual.normalCastDamage && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      rollAttack(ritual.damageRitual.normalCastDamage, '', formatDamageType(ritual.damageRitual.normalCastDamageType));
                    }}
                    className="text-primary/40 hover:scale-105 duration-300 hover:text-primary"
                  >
                    {ritual.damageRitual.normalCastDamage}
                  </span>
                )}
                {ritual.damageRitual.discentCastDamage && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      rollAttack(ritual.damageRitual.discentCastDamage, 'Discente', formatDamageType(ritual.damageRitual.discentCastDamageType));
                    }}
                    className="text-primary/40 hover:scale-105 duration-300 hover:text-primary"
                  >
                    {' '}
                    | {ritual.damageRitual.discentCastDamage}
                  </span>
                )}
                {ritual.damageRitual.trueCastDamage && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      rollAttack(ritual.damageRitual.trueCastDamage, 'Verdadeiro', formatDamageType(ritual.damageRitual.trueCastDamageType));
                    }}
                    className="text-primary/40 hover:scale-105 duration-300 hover:text-primary"
                  >
                    {' '}
                    | {ritual.damageRitual.trueCastDamage}
                  </span>
                )}
              </h1>
            )}
          </div>
        </div>
        <button className="lg:text-4xl text-3xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>

      <div
        className={`lg:text-2xl md:text-lg text-base  tracking-wide font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-4 px-2 duration-300 transition-max-height  ${
          expanded ? '  mb-6 ' : 'max-h-0 h-0'
        }`}
      >
        <div className="font-extralight text-lg ">
          <h3 className={`font-light text-lg w-fit px-1 mb-2 ${elementColor.bg} ${elementColor.text_foreground} `}>
            {formatElement(ritual.element || '')} {ritual.ritualLevel}
          </h3>
          <div className="space-y-2 flex flex-col">
            <h1>Custo: {ritual_cost}</h1>
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
            <h3 className=" text-xl text-center">Condições:</h3>
            {ritual.conditions.map((condition) => (
              <span key={condition.condition.id} className="text-lg ">
                <span className="underline">{condition.condition.name}:</span>
                <p className="font-extralight text-base" dangerouslySetInnerHTML={{ __html: condition.condition.description }}></p>
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={handleRemoveRitual} variant={'link'} className="text-red-500">
            Remover Ritual
          </Button>
        </div>
      </div>
    </div>
  );
}
