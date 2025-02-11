import { useEffect, useState } from 'react';
import { IoMdArrowDropup, IoMdCloseCircleOutline } from 'react-icons/io';
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
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../../../../components/ui/sheet';
import { Trash2 } from 'lucide-react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface RitualInfoProps {
  ritual: Ritual;
  ritual_cost: number;
}

export default function RitualInfo({ ritual, ritual_cost }: RitualInfoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [toastIds, setToastIds] = useState<(number | string)[]>([]);

  useEffect(() => {
    if (!isDialogOpen) setToastTimerToDefault();
  }, [isDialogOpen]);

  const elements = elementValues;
  const range = ritualRange;
  const elementColor = getElementColor(ritual.element || '');
  const { character } = useCharacter();

  function dismissToast(toastId: number | string) {
    toast.dismiss(toastId);
    setToastIds((prev) => prev.filter((id) => id !== toastId));
  }

  function setToastTimerToDefault() {
    if (toastIds.length > 0) {
      toastIds.forEach((id) => {
        toast('', { id, duration: 5000 });
      });
    }
  }

  function formatElement(value: string) {
    const index = elements.findIndex((element) => element.value === value);
    return elements[index]?.label || value;
  }

  function formatRange(value: string) {
    const index = range.findIndex((range) => range.value === value);
    return range[index]?.label || value;
  }

  const rollAttack = (die: string, castType: string, damageType: string) => {
    const result = rollDamage(die);
    const toastId = toast('', {
      onAutoClose: () => dismissToast(toastId),
      onDismiss: () => dismissToast(toastId),
      description: (
        <div className="flex flex-col w-full font-oswald">
          <h1 className="text-xl tracking-wide font-medium">
            {ritual.name} {castType}
          </h1>
          <h1 className="text-lg font-light mt-2">
            Total:{' '}
            <span className="font-bold">
              {result.total} <span className={`${elementColor.text}`}>({damageType})</span>
            </span>
          </h1>
          <IoMdCloseCircleOutline className="absolute right-1 top-1 text-xl cursor-pointer hover:scale-105 duration-300" onClick={() => dismissToast(toastId)} />
        </div>
      ),
      classNames: {
        toast: `bg-dark-bg-secondary border-2 ${elementColor.border} ${elementColor.drop_shadow} text-white w-full flex`,
      },
    });
    return result;
  };

  async function handleRemoveRitual() {
    try {
      await removeCharacterRitual(character.id, ritual.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="flex w-full flex-col border-[3px] border-border relative group">
        <div className="flex justify-between items-center cursor-pointer lg:py-6 md:py-4 py-2 lg:px-4 md:px-2 px-1">
          <div className="flex flex-col">
            <div className="lg:text-4xl md:text-2xl flex items-center  space-x-2 text-start font-semibold font-romannew">
              <h1>{ritual.name}</h1>
            </div>
            {ritual.type === 'DAMAGE' && (
              <div className="z-10 space-x-2 flex">
                <span>Dano:</span>
                {['normalCastDamage', 'discentCastDamage', 'trueCastDamage'].map((key, index) => {
                  const damageKey = key as keyof typeof ritual.damageRitual;
                  const damageTypeKey = `${key}Type` as keyof typeof ritual.damageRitual;
                  if (ritual.damageRitual[damageKey]) {
                    return (
                      <span
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          rollAttack(ritual.damageRitual[damageKey]!, index === 1 ? 'Discente' : index === 2 ? 'Verdadeiro' : '', formatDamageType(ritual.damageRitual[damageTypeKey]!));
                        }}
                        className="text-primary/40 hover:scale-105 duration-300 hover:text-primary"
                      >
                        {index > 0 && ' | '} {ritual.damageRitual[damageKey]}
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </div>
        <AiOutlineInfoCircle size={16} className="absolute top-1/2 -translate-y-1/2 right-4" />
        {/* <div className='absolute top-1/2 -translate-y-1/2 right-4 text-red-700 hover:scale-110 duration-300 cursor-pointer hover:scale-105 duration-300" ' onClick={handleRemoveRitual}>
          <Trash2 />
        </div> */}
      </SheetTrigger>

      <SheetContent
        className={`lg:text-2xl md:text-lg text-base  font-normal text-white ${elementColor.border} border-l-4 flex flex-col space-y-5 overflow-x-auto `}
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <SheetHeader className="font-semibold w-full flex text-4xl font-romannew">{ritual.name}</SheetHeader>
        <div className="font-extralight text-lg">
          <h3 className={`font-light text-lg w-fit px-1 mb-2 ${elementColor.bg} ${elementColor.text_foreground}`}>
            {formatElement(ritual.element || '')} {ritual.ritualLevel}
          </h3>
          <div className="space-y-2">
            <h1>Custo: {ritual_cost}</h1>
            <h3>Alcance: {formatRange(ritual.range || '')}</h3>
            <h1>Execução: {ritual.exectutionTime}</h1>
            <h1>Alvo: {ritual.target}</h1>
            <h1>Duração: {ritual.duration}</h1>
          </div>
        </div>

        <div>
          <p className="text-[1.1rem] leading-7" dangerouslySetInnerHTML={{ __html: ritual.normalCastDescription }}></p>
        </div>

        {ritual.discentCastDescription && (
          <div className="text-lg font-semibold">
            <h1>Discente (+{ritual.discentCost} PE)</h1>
            <p className="text-[1.1rem] leading-7" dangerouslySetInnerHTML={{ __html: ritual.discentCastDescription }}></p>
          </div>
        )}

        {ritual.trueCastDescription && (
          <div className="text-lg font-semibold">
            <h1>Verdadeiro (+{ritual.trueCost} PE)</h1>
            <p className="text-[1.1rem] leading-7" dangerouslySetInnerHTML={{ __html: ritual.trueCastDescription }}></p>
          </div>
        )}

        {ritual.conditions.length > 0 && (
          <div>
            <h3 className="text-xl text-center">Condições:</h3>
            {ritual.conditions.map((condition) => (
              <div key={condition.condition.id} className="text-lg">
                <span className="underline">{condition.condition.name}:</span>
                <p className="font-extralight text-base" dangerouslySetInnerHTML={{ __html: condition.condition.description }}></p>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={handleRemoveRitual} variant="link" className="text-red-500">
            Remover Ritual
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
