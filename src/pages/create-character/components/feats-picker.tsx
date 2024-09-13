import { IoMdArrowDropup } from 'react-icons/io';
import { Feat } from '../../../types/feat';
import { CreateComponentProps } from '../props/create-component';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { elementValues } from '../../../types/elements';
import { getElementColor } from '../../admin/feats/components/create-feats';
import { useCharacterCreation } from '../create-character';

interface FeatPickerProps {
  setValue: CreateComponentProps['setValue'];
  watch: CreateComponentProps['watch'];
  feat: Feat;
}

export default function FeatPicker({ feat, setValue, watch }: FeatPickerProps) {
  const [expanded, setExpanded] = useState(false);

  const elements = elementValues;

  const { setSelectedFeats, selectedFeats } = useCharacterCreation();

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  const elementColor = getElementColor(feat.element || '');
  return (
    <div className={`flex h-fit flex-col border-[3px] border-border  `}>
      <div
        className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2"
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className={`lg:text-3xl md:text-2xl text-base font-semibold`}>{feat.name}</h1>
        <button className="lg:text-4xl text-3xl font-bold">
          {expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}
        </button>
      </div>

      <div
        className={` font-normal flex flex-col space-y-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-6 px-4 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen lg:mb-16 md:mb-6 mb-4 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h3 className={`font-extralight text-lg  ${elementColor.text}`}>
            Elemento: {formatElement(feat.element || '')}
          </h3>
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

        <div className="w-full flex items-center justify-center pt-5 ">
          <Button
            onClick={() => {
              {
                const currentFeatsId = watch('featsId') || [];
                // push the feat id to the character feats array
                setValue('featsId', [...currentFeatsId, feat.id]);
                setSelectedFeats((prevFeats: Feat[] | null) => {
                  return prevFeats ? [...prevFeats, feat] : [feat];
                });
              }
            }}
            className="w-[80%]"
          >
            Adicionar Poder
          </Button>
        </div>
      </div>
    </div>
  );
}
