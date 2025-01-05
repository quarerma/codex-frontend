import { useState } from 'react';

import { IoMdArrowDropup } from 'react-icons/io';

import { elementValues } from '../../../../types/elements';
import { weaponRange } from '../../../../types/range';
import { Button } from '../../../../components/ui/button';

import { removeIventoryItem } from '../../../../api/fetch/inventory';
import { useCharacter } from '../../character-page';
import { Inventory, InventorySlot } from '../../../../types/inventory';
import { formatElement, formatRange, formatWeaponDamageType, formatWeaponHandType, formatWeaponType } from '../../../../components/format/formatters';

interface AddItemInfoProps {
  slot: InventorySlot;
  onRemoveItem: (slotId: string) => void;
}

export default function ItemInfo({ slot, onRemoveItem }: AddItemInfoProps) {
  const [expanded, setExpanded] = useState(false);

  const { character } = useCharacter();
  async function handleRemoveItem() {
    try {
      await removeIventoryItem(slot.id, character.id);
      onRemoveItem(slot.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={`flex flex-col border-[3px] border-border  `}>
      <div className="flex justify-between items-baseline space-x-1 cursor-pointer pt-4 lg:px-6 md:px-4 px-2" onClick={() => setExpanded(!expanded)}>
        <h1 className="lg:text-xl md:text-xl text-base font-semibold">{slot.equipment.name}</h1>

        <div className="flex items-center space-x-2">
          <span>
            <span className="text-primary/50">Categoria: </span>
            {slot.equipment.category}
          </span>
          <span>
            <span className="text-primary/50">Espaços:</span> {slot.equipment.weight}
          </span>
          <button className="lg:text-4xl text-3xl font-bold">{expanded ? <IoMdArrowDropup /> : <IoMdArrowDropup className="rotate-180" />}</button>
        </div>
      </div>

      <div
        className={`text-lg  tracking-wide font-normal flex flex-col space-y-2 mt-5 overflow-x-auto overflow-y-hidden lg:px-8 md:px-4 px-2 duration-300 transition-max-height  ${
          expanded ? 'max-h-screen mb-2 ' : 'max-h-0 h-0'
        }`}
      >
        <div className="flex  cursor-pointer   items-center text-sm justify-start space-x-5">
          {slot.equipment.type === 'WEAPON' && (
            <>
              <span>
                <span className="text-primary/50">Dano:</span> {slot.equipment.Weapon?.damage}
              </span>
              <span>
                <span className="text-primary/50">Crítico:</span> {''}
                {slot.equipment.Weapon?.critical_range === 20 ? '' : slot.equipment.Weapon?.critical_range + '/'}x{slot.equipment.Weapon?.critical_multiplier}
              </span>
              <span>
                <span className="text-primary/50">Alcance:</span> {formatRange(slot.equipment.Weapon?.range || '')}
              </span>
              <span>
                <span className="text-primary/50">Tipo de Dano:</span> {formatWeaponDamageType(slot.equipment.Weapon?.damage_type || '')}
              </span>
            </>
          )}
          {slot.equipment.type === 'ARMOR' && (
            <>
              <span>
                <span className="text-primary/50">Defesa:</span> +{slot.equipment.characterUpgrades.map((item) => item.type === 'DEFESA' && item.upgradeValue)}
              </span>
            </>
          )}
          {slot.equipment.type === 'CURSED_ITEM' && (
            <>
              <span>
                {' '}
                <span className="text-primary/50">Elemento:</span> {formatElement(slot.equipment.CursedItem?.element || '')}
              </span>
            </>
          )}
        </div>
        {slot.equipment.type === 'WEAPON' && (
          <div className="flex  text-white/40 text-base  items-center font-extralight">
            <span>{formatWeaponType(slot.equipment.Weapon?.weapon_type || '')}</span>
            <div className="w-[10px] ml-2 mr-2  h-[1px] bg-white/40"></div>
            <span>{formatWeaponHandType(slot.equipment.Weapon?.hand_type || '')}</span>
          </div>
        )}

        <p dangerouslySetInnerHTML={{ __html: slot.equipment.description }}></p>
        <div className="flex items-center text-sm justify-between pt-5">
          <Button variant={'link'} className="text-primary font-inter">
            Editar Item
          </Button>
          <Button onClick={handleRemoveItem} variant={'link'} className="text-red-700 font-inter">
            Remover Item
          </Button>
        </div>
      </div>
    </div>
  );
}
