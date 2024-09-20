import { useQuery } from '@tanstack/react-query';
import { getPossibleCampaignEquipment } from '../../../../api/fetch/equipment';
import { DialogContent, DialogHeader, DialogTitle } from '../../../../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';

import { useCharacter } from '../../character-page';
import AddItemInfo from './add-item-info';
import { useEffect, useState } from 'react';
import { itemType } from '../../../../types/equipment';
import { FaSearch } from 'react-icons/fa';

export default function AddItemModal() {
  const { character } = useCharacter();
  const { data: equipment = [] } = useQuery({
    queryKey: ['equipment', character.campaignId],
    queryFn: () => getPossibleCampaignEquipment(character.campaignId),
  });

  const [selectedType, setSelectedType] = useState<string>('all');
  const [filteredEquipment, setFilteredEquipment] = useState(equipment);
  const [itemSource, setItemSource] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    let filtered = equipment;

    switch (itemSource) {
      case 'all':
        filtered = equipment;
        break;
      case 'book':
        filtered = equipment.filter((item) => item.is_custom === false);
        break;
      case 'campaign':
        filtered = equipment.filter((item) => item.is_custom === true);
        break;
      default:
        break;
    }

    filtered = filtered.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedType === 'all') {
      setFilteredEquipment(filtered);
    } else {
      setFilteredEquipment(filtered.filter((item) => item.type === selectedType));
    }
  }, [equipment, selectedType, itemSource, searchTerm]);

  return (
    <DialogContent className="text-foreground  max-h-[80vh] h-[80vh] w-1/2 font-oswald flex flex-col space-y-2   border-primary">
      <DialogHeader>
        <DialogTitle className="text-3xl">Adicionar Item</DialogTitle>
      </DialogHeader>
      <div className="flex w-full">
        <div className="flex-col w-full border-b-2 border-border">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-foreground placeholder:text-xl font-extralight text-lg bg-transparent w-full focus:outline-none"
          />
          <div className="w-full h-[1px] drop-shadow-xl bg-white-text"></div>
        </div>
        <FaSearch className="text-lg" />
      </div>
      <div className="flex space-x-5">
        <Select defaultValue="all" onValueChange={setSelectedType} value={selectedType}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Selecione o tipo de Item" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              {itemType.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={setItemSource} value={itemSource}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Selecione o tipo de Item" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fonte dos Itens</SelectLabel>
              <SelectItem value="all">Todas as fontes</SelectItem>
              <SelectItem value="book">Livro</SelectItem>
              <SelectItem value="campaign">Campanha</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div
        className="flex flex-col max-h-[100%] overflow-auto space-y-1"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {filteredEquipment.map((item) => (
          <div key={item.id}>
            <AddItemInfo equipment={item} />
          </div>
        ))}
      </div>
    </DialogContent>
  );
}
