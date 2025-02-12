import { useState } from 'react';
import { Attack } from '../../../../types/character';
import { Button } from '../../../../components/ui/button';
import { IoMdArrowDropup } from 'react-icons/io';
import { weaponRange } from '../../../../types/range';
import { damageTypes } from '../../../../types/damage';

interface AttacksInfoProps {
  attack: Attack;
}

export default function AttacksInfo({ attack }: AttacksInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const range = weaponRange;

  function formatRange(value: string) {
    const index = range.findIndex((range) => range.value === value);

    return range[index].label;
  }

  function formatWeaponDamageType(value: string) {
    const index = damageTypes.findIndex((damageType) => damageType.value === value);

    return damageTypes[index].label;
  }

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between w-full items-center cursor-pointer pt-4 lg:px-6 md:px-4 px-2" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col">
          <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">{attack.name}</h1>
          <div className="flex space-x-2">
            <span className="text-lg font-light">
              Dados:{' '}
              {attack.damage_dies.map((die, index) => (
                <span key={index}>
                  {die}
                  {index < attack.damage_dies.length - 1 && ' + '}
                </span>
              ))}
            </span>
            {attack.extra_damage.length > 0 && (
              <span className="text-lg font-light">
                - Dados Extra:{' '}
                {attack.extra_damage.map((extra, index) => (
                  <span key={index}>
                    {extra}

                    {index < attack.extra_damage.length - 1 && ' + '}
                  </span>
                ))}
              </span>
            )}
          </div>
          <div>
            Teste: {attack.skill} {attack.roll_bonus ? `+ ${attack.roll_bonus}` : ''}
          </div>
          <div>
            Crítico: {attack.critical_margin === 20 ? '' : attack.critical_margin}x{attack.critical_multiplier}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
        </div>
      </div>

      <div
        className={`text-2xl  tracking-wide font-normal flex flex-col space-y-2 mt-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-4 px-2 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen mb-2 ' : 'max-h-0 h-0'
        }`}
      >
        <div>
          <h1>Modificações / Poderes / Equipamento:</h1>
          {attack.alterations.map((alteration, index) => (
            <div key={index} className="flex justify-between items-center text-lg">
              <span>{alteration.featName || alteration.itemName || alteration.modificationName}</span>
            </div>
          ))}
        </div>
        {/* <div className="flex items-center text-lg justify-between pt-5">
          <Button variant={'link'} className="text-primary ">
            Editar Ataque
          </Button>
          <Button variant={'link'} className="text-red-700 ">
            Remover Ataque
          </Button>
        </div> */}
      </div>
    </div>
  );
}
