import { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import DOMPurify from 'dompurify'; // Import DOMPurify

import { removeIventoryItem } from '../../../../api/fetch/inventory';
import { useCharacter } from '../../character-page';
import { InventorySlot } from '../../../../types/inventory';
import { formatElement, formatRange, formatWeaponDamageType, formatWeaponHandType, formatWeaponType } from '../../../../components/format/formatters';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../../../../components/ui/sheet';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ReactQuill from 'react-quill';
import { post } from '../../../../api/axios';

interface AddItemInfoProps {
  slot: InventorySlot;
  onRemoveItem: (slotId: string) => void;
  onUpdateItem: (slot: InventorySlot) => void;
}

export default function ItemInfo({ slot, onRemoveItem, onUpdateItem }: AddItemInfoProps) {
  const { character } = useCharacter();
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [editedSlot, setEditedSlot] = useState(slot); // Local state for editing
  const [isLoading, setIsLoading] = useState(false);

  async function handleRemoveItem() {
    try {
      setIsLoading(true);
      await removeIventoryItem(slot.id, character.id);
      onRemoveItem(slot.id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: keyof InventorySlot) {
    setEditedSlot((prev) => ({
      ...prev,
      [key]: event.target.value,
    }));
  }

  async function handleSaveChanges() {
    try {
      const body = {
        id: slot.id,
        new_local_name: editedSlot.local_name,
        new_category: Number(editedSlot.category),
        new_weight: Number(editedSlot.weight),
        new_local_description: editedSlot.local_description,
      };

      console.log('Body:', body);
      setIsLoading(true);
      const response = await post('inventory/update-slot', body, {});

      console.log('Response:', response);

      onUpdateItem(editedSlot);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update item:', error);
    } finally {
      setIsLoading(false);
    }
  }

  function toggleEditMode() {
    setIsEditing((prev) => !prev);
  }

  const labelClass = isEditing ? 'border border-primary p-2 rounded ' : ''; // Border when editing

  return (
    <Sheet>
      <SheetTrigger className="flex flex-col border-[3px] border-border relative w-full">
        <div className="flex w-full items-center cursor-pointer lg:p-6 md:p-4 p-2">
          <h1 className="lg:text-4xl md:text-3xl text-base font-semibold text-left font-romannew">{slot.local_name}</h1>

          <div className="flex items-center space-x-2 ml-auto mr-4">
            <span>
              <span className="text-primary/50">Categoria: </span>
              {slot.category}
            </span>
            <span>
              <span className="text-primary/50">Espaços:</span> {slot.weight}
            </span>
          </div>

          <AiOutlineInfoCircle size={16} className="absolute top-1/2 -translate-y-1/2 right-4" />
        </div>
      </SheetTrigger>

      <SheetContent className={`lg:text-2xl md:text-lg text-base font-normal text-white flex flex-col overflow-x-hidden`}>
        <SheetHeader className="font-semibold w-full flex text-2xl font-romannew text-4xl">
          {isEditing ? (
            <input type="text" value={editedSlot.local_name} onChange={(e) => handleInputChange(e, 'local_name')} className={`w-full bg-transparent font-romannew ${labelClass}`} />
          ) : (
            slot.local_name
          )}
        </SheetHeader>

        <div className={`flex items-center text-base space-x-2`}>
          <span>
            <span className="text-primary/50">Categoria: </span>
            {isEditing ? <input type="number" value={editedSlot.category} onChange={(e) => handleInputChange(e, 'category')} className={`bg-transparent  w-[75px] ${labelClass}`} /> : slot.category}
          </span>
          <span>
            <span className="text-primary/50">Espaços:</span>
            {isEditing ? <input type="number" value={editedSlot.weight} onChange={(e) => handleInputChange(e, 'weight')} className={`bg-transparent w-[75px] ${labelClass}`} /> : slot.weight}
          </span>
        </div>

        <div className={`flex items-center text-sm justify-start space-x-5`}>
          {slot.equipment?.type === 'WEAPON' && (
            <>
              <span>
                <span className="text-primary/50">Dano:</span> {slot.equipment.Weapon?.damage}
              </span>
              <span>
                <span className="text-primary/50">Crítico:</span> {slot.equipment.Weapon?.critical_range === 20 ? '' : `${slot.equipment.Weapon?.critical_range}/`}x
                {slot.equipment.Weapon?.critical_multiplier}
              </span>
              <span>
                <span className="text-primary/50">Alcance:</span> {formatRange(slot.equipment.Weapon?.range || '')}
              </span>
              <span>
                <span className="text-primary/50">Tipo de Dano:</span> {formatWeaponDamageType(slot.equipment.Weapon?.damage_type || '')}
              </span>
            </>
          )}
          {slot.equipment?.type === 'ARMOR' && (
            <span>
              <span className="text-primary/50">Defesa:</span> +
              {slot.equipment.characterUpgrades
                .filter((item) => item.type === 'DEFESA')
                .map((item) => item.upgradeValue)
                .join(', ')}
            </span>
          )}
          {slot.equipment?.type === 'CURSED_ITEM' && (
            <span>
              <span className="text-primary/50">Elemento:</span> {formatElement(slot.equipment.CursedItem?.element || '')}
            </span>
          )}
        </div>

        {slot.equipment?.type === 'WEAPON' && (
          <div className="flex text-white/40 text-base items-center font-extralight">
            <span>{formatWeaponType(slot.equipment.Weapon?.weapon_type || '')}</span>
            <div className="w-[10px] mx-2 h-[1px] bg-white/40"></div>
            <span>{formatWeaponHandType(slot.equipment.Weapon?.hand_type || '')}</span>
          </div>
        )}

        {isEditing ? (
          <div className=" h-[250px]">
            <ReactQuill
              value={editedSlot.local_description} // Display plain text
              onChange={(content) => setEditedSlot((prev) => ({ ...prev, local_description: content }))}
              className={`text-base bg-transparent h-[180px] `}
            />
          </div>
        ) : (
          <p className="text-base" dangerouslySetInnerHTML={{ __html: slot.local_description }}></p>
        )}

        <div className="flex items-center text-sm justify-between pt-5">
          {isLoading ? (
            <span className="animate-spin w-4 h-4 border-t border-l border-primary rounded-full"></span>
          ) : (
            <Button onClick={isEditing ? handleSaveChanges : toggleEditMode} variant="link" className="text-primary font-inter">
              {isEditing ? 'Salvar Alterações' : 'Editar Item'}
            </Button>
          )}
          {isLoading ? (
            <span className="animate-spin w-4 h-4 border-t border-l border-primary rounded-full border-red-700"></span>
          ) : (
            <Button onClick={handleRemoveItem} variant="link" className="text-red-700 font-inter">
              Remover Item
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
