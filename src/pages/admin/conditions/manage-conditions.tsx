import { useState, useEffect } from 'react';
import AdminPageSetup from '../components/admin-page';

import { Button } from '../../../components/ui/button';
import CreateCondition from './components/create-condition';

export default function ManageConditions() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-conditions') {
      setActiveComponent('read');
    } else {
      setActiveComponent('create');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-conditions';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-conditions';
    }
  }, [activeComponent]);

  return (
    <AdminPageSetup>
      <div className="w-full flex flex-col p-20 ">
        <div className="ml-6 sticky -mb-1 ">
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('create')}
            className={`px-3 py-2 rounded-t-xl border-2 ${activeComponent === 'create' ? 'bg-dark-bg-secondary border-b-dark-bg-secondary' : 'bg-transparent border-none'}`}
          >
            Criar Condição
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'}`}
          >
            Visualizar Condições
          </Button>
        </div>
        {activeComponent === 'read' && <div>Ler rituais</div>}
        {activeComponent === 'create' && <CreateCondition />}
      </div>
    </AdminPageSetup>
  );
}
