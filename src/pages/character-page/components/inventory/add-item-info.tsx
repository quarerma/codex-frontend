import { useState } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';

import { Button } from '../../../../components/ui/button';
import { Equipment } from '../../../../types/equipment';
import { addInventoryItem } from '../../../../api/fetch/inventory';
import { useCharacter } from '../../character-page';
import { useInventory } from './character-inventory';
import { formatElement, formatRange, formatWeaponCategory, formatWeaponDamageType, formatWeaponHandType, formatWeaponType } from '../../../../components/format/formatters';

interface AddItemInfoProps {
  equipment: Equipment;
}

export default function AddItemInfo({ equipment }: AddItemInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { handleAddItem } = useInventory();

  const { character } = useCharacter();

  async function handleAddEquipment() {
    try {
      setIsLoading(true);
      const response = await addInventoryItem(character.id, equipment.id);

      handleAddItem(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-center cursor-pointer pt-4 lg:px-6 md:px-4 px-2" onClick={() => setExpanded(!expanded)}>
        <div className="flex ">
          <h1 className="lg:text-4xl md:text-3xl text-xl font-semibold">{equipment.name}</h1>
        </div>
        <button className="lg:text-5xl text-5xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
      </div>
      <div onClick={() => setExpanded(!expanded)} className="flex lg:px-6 md:px-4 cursor-pointer px-2 pb-4 pt-4 items-center justify-start space-x-5">
        <span>
          <span className="text-primary/50">Categoria: </span>
          {equipment.category}
        </span>
        {equipment.type === 'WEAPON' && (
          <>
            <span>
              <span className="text-primary/50">Dano:</span> {equipment.Weapon?.damage}
            </span>
            <span>
              <span className="text-primary/50">Crítico:</span> {''}
              {equipment.Weapon?.critical_range === 20 ? '' : equipment.Weapon?.critical_range + '/'}x{equipment.Weapon?.critical_multiplier}
            </span>
            <span>
              <span className="text-primary/50">Alcance:</span> {formatRange(equipment.Weapon?.range || '')}
            </span>
            <span>
              <span className="text-primary/50">Tipo de Dano:</span> {formatWeaponDamageType(equipment.Weapon?.damage_type || '')}
            </span>
          </>
        )}
        {equipment.type === 'ARMOR' && (
          <>
            <span>
              <span className="text-primary/50">Defesa:</span> +{equipment.characterUpgrades.map((item) => item.type === 'DEFESA' && item.upgradeValue)}
            </span>
          </>
        )}
        {equipment.type === 'CURSED_ITEM' && (
          <>
            <span>
              {' '}
              <span className="text-primary/50">Elemento:</span> {formatElement(equipment.CursedItem?.element || '')}
            </span>
          </>
        )}
        <span>
          <span className="text-primary/50">Espaços:</span> {equipment.weight}
        </span>
      </div>

      <div
        className={`text-2xl  tracking-wide font-normal flex flex-col space-y-2 mt-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-4 px-2 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen mb-2 ' : 'max-h-0 h-0'
        }`}
      >
        {equipment.type === 'WEAPON' && (
          <div className="flex  text-white/40 text-xl  items-center font-extralight">
            <span>{formatWeaponCategory(equipment.Weapon?.weapon_category || '')}</span>
            <div className="w-[10px] ml-2 mr-2  h-[1px] bg-white/40"></div>
            <span>{formatWeaponType(equipment.Weapon?.weapon_type || '')}</span>
            <div className="w-[10px] ml-2 mr-2  h-[1px] bg-white/40"></div>
            <span>{formatWeaponHandType(equipment.Weapon?.hand_type || '')}</span>
          </div>
        )}

        <p dangerouslySetInnerHTML={{ __html: equipment.description }}></p>
        {isLoading ? (
          <div className="w-4 h-4 rounded-full border-t border-l border-primary animate-spin flex items-center text-lg justify-end pt-5"></div>
        ) : (
          <div className="flex items-center text-lg justify-end pt-5">
            <Button onClick={handleAddEquipment} variant={'link'} className="text-primary ">
              Adicionar Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
