import { Feat } from '../../../../types/feat';
import { elementValues } from '../../../../types/elements';
import { getElementColor } from '../../../admin/feats/components/create-feats';
import { Button } from '../../../../components/ui/button';
import { useCharacter } from '../../character-page';
import { removeCharacterFeat, unUseFeatAffinity, useFeatAffinity } from '../../../../api/fetch/character.feats';
import { useQueryClient } from '@tanstack/react-query';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../../../../components/ui/sheet';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useCharacterFeats } from './character-feat';

interface FeatInfoProps {
  feat: Feat;
  usingAfinity?: boolean;
  requiredLevel?: number;
}

export default function FeatInfo({ feat, usingAfinity, requiredLevel }: FeatInfoProps) {
  const elements = elementValues;

  const { removeFeat } = useCharacterFeats();

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);

    return elements[index].label;
  }

  const elementColor = getElementColor(feat.element || '');

  const { character } = useCharacter();
  const queryClient = useQueryClient();

  async function handleRemoveFeat() {
    try {
      removeFeat(feat.id);
      await removeCharacterFeat(character.id, feat.id);

      // remove from array
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUseAfinity() {
    try {
      await useFeatAffinity(character.id, feat.id);
      queryClient.invalidateQueries({
        queryKey: ['character', character.id],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUnUseAfinity() {
    try {
      await unUseFeatAffinity(character.id, feat.id);
      queryClient.invalidateQueries({
        queryKey: ['character', character.id],
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Sheet>
      <SheetTrigger className="flex w-full flex-col border-[3px] border-border relative group">
        <div className="flex justify-between items-center cursor-pointer lg:p-6 md:p-4 p-2 ">
          <h1 className={`lg:text-4xl md:text-2xl text-xl font-semibold `}>
            {feat.name} {requiredLevel && <span>- {requiredLevel}%</span>}
          </h1>
        </div>
        <AiOutlineInfoCircle size={16} className="absolute top-1/2 -translate-y-1/2 right-4" />
      </SheetTrigger>

      <SheetContent className={`lg:text-4xl font-romannew md:text-2xl text-xl  font-normal text-white ${elementColor.border} border-l-4 flex flex-col  overflow-x-auto `}>
        <SheetHeader className="font-semibold w-full flex text-4xl ">
          {feat.name} {requiredLevel && ` - ${requiredLevel}%`}
        </SheetHeader>
        <div>{feat.element !== 'REALITY' && <h3 className={`font-extralight text-3xl  ${elementColor.text}`}>Elemento: {formatElement(feat.element || '')}</h3>}</div>
        <p className="text-2xl" dangerouslySetInnerHTML={{ __html: feat.description }}></p>
        {feat.afinity && (
          <div>
            <h3 className="font-semibold text-3xl">Afinidade:</h3>
            <p className="text-2xl">{feat.afinity}</p>
          </div>
        )}
        {feat.prerequisites && (
          <div>
            <h3 className="font-semibold text-3xl">Pré-requisitos:</h3>
            <p className="text-2xl">{feat.prerequisites}</p>
          </div>
        )}
        <div className="flex items-center pt-5 ">
          {feat.afinity && !usingAfinity && (
            <div className="flex w-full   ">
              <Button variant="link" className=" text-primary  text-2xl font-semibold" onClick={handleUseAfinity}>
                Usar Afinidade
              </Button>
            </div>
          )}
          {feat.afinity && usingAfinity && (
            <div className="flex w-full justify-start ">
              <Button className="w-fit  text-2xl font-semibold" onClick={handleUnUseAfinity}>
                Parar de usar Afinidade
              </Button>
            </div>
          )}
          {(feat.type === 'GENERAL' || feat.type === 'CUSTOM') && (
            <Button onClick={handleRemoveFeat} variant={'link'} className="text-red-600 text-2xl font-semibold">
              Excluir Poder
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
