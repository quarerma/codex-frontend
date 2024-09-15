import { useState } from 'react';
import { CreateComponentProps } from '../props/create-component';
import { IoMdArrowDropup } from 'react-icons/io';
import { Button } from '../../../components/ui/button';
import { Ritual } from '../../../types/ritual';
import { elementValues } from '../../../types/elements';
import { getElementColor } from '../../admin/feats/components/create-feats';
import { ritualRange } from '../../../types/range';
import { useCharacterCreation } from '../create-character';

interface OriginProps {
  ritual: Ritual;
  setValue: CreateComponentProps['setValue'];
  watch: CreateComponentProps['watch'];
}

export default function RitualPicker({ ritual, setValue, watch }: OriginProps) {
  const [expanded, setExpanded] = useState(false);

  const elements = elementValues;
  const range = ritualRange;

  const { setSelectedRituals, selectedRituals } = useCharacterCreation();

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  function formatRange(value: string) {
    const index = range.findIndex((range) => range.value === value);

    return range[index].label;
  }

  const elementColor = getElementColor(ritual.element || '');

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div
        className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2"
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className="lg:text-3xl md:text-2xl text-base font-semibold">{ritual.name}</h1>
        <button className="lg:text-4xl text-3xl font-bold">
          {expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}
        </button>
      </div>

      <div
        className={`lg:text-2xl md:text-lg text-base  font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-12 md:px-8 px-4 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div className="font-extralight text-lg ">
          <h3 className={`font-light text-lg w-fit px-1 mb-2 ${elementColor.bg} ${elementColor.text_foreground} `}>
            {formatElement(ritual.element || '')} {ritual.ritualLevel}
          </h3>
          <div className="space-y-2 flex flex-col">
            <h3>Alcance: {formatRange(ritual.range || '')}</h3>
            <h1>Execução: {ritual.exectutionTime}</h1>
            <h1>Alvo: {ritual.target}</h1>
            <h1>Duração: {ritual.duration}</h1>
          </div>
        </div>

        <div>
          <p
            className="text-[1.1rem] leading-7 font-normal"
            dangerouslySetInnerHTML={{ __html: ritual.normalCastDescription }}
          ></p>
        </div>
        {ritual.discentCastDescription && (
          <div className="text-lg font-bold">
            <h1>Discente (+{ritual.discentCost} PE)</h1>
            <p
              className="text-[1.1rem] leading-7 font-normal"
              dangerouslySetInnerHTML={{ __html: ritual.discentCastDescription }}
            ></p>
          </div>
        )}
        {ritual.trueCastDescription && (
          <div className="text-lg font-bold">
            <h1>Verdadeiro (+{ritual.trueCost} PE)</h1>
            <p
              className="text-[1.1rem] leading-7 font-normal"
              dangerouslySetInnerHTML={{ __html: ritual.trueCastDescription }}
            ></p>
          </div>
        )}

        <div className="w-full flex items-center justify-center pt-5 ">
          <Button
            onClick={() => {
              const currentRituals = watch('ritualsIds') || [];

              setValue('ritualsIds', [...currentRituals, ritual.id]);
              const pastRituals: Ritual[] | [] = selectedRituals || [];

              if (pastRituals.find((f) => f.id === ritual.id)) {
                return;
              }
              pastRituals.push(ritual);
              setSelectedRituals(pastRituals);
            }}
            className="w-[80%]"
          >
            Adicionar Ritual
          </Button>
        </div>
      </div>
    </div>
  );
}
