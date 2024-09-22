import { useState, useEffect } from 'react';

import CreateEquip from './components/create-equip';
import DmPageSetup from '../dm-page-setup';
import { Button } from '../../../../components/ui/button';

export default function ManageCamapignEquipments() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-equips') {
      setActiveComponent('read');
    } else {
      setActiveComponent('create');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-equips';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-equips';
    }
  }, [activeComponent]);

  return (
    <DmPageSetup>
      <div className="w-full flex flex-col p-20 font-oswald">
        <div className="ml-6 sticky -mb-1 ">
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('create')}
            className={`px-3 py-2 rounded-t-xl border-2 ${
              activeComponent === 'create'
                ? 'bg-dark-bg-secondary border-b-dark-bg-secondary'
                : 'bg-transparent border-none'
            }`}
          >
            Criar Equipamento
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${
              activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'
            }`}
          >
            Visualizar Equipamentos
          </Button>
        </div>
        {activeComponent === 'read' && <div>Ler Equipamentos</div>}
        {activeComponent === 'create' && <CreateEquip />}
      </div>
    </DmPageSetup>
  );
}
