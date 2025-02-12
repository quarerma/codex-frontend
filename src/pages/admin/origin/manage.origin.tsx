import { useState, useEffect } from 'react';
import AdminPageSetup from '../components/admin-page';

import { Button } from '../../../components/ui/button';
import CreateOrigin from './components/create-origin';
import ReadOrigins from './components/read-origins';

export default function ManageOrigins() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-origins') {
      setActiveComponent('read');
    } else {
      setActiveComponent('create');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-origins';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-origins';
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
            Criar Origem
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'}`}
          >
            Visualizar Origens
          </Button>
        </div>
        {activeComponent === 'read' && <ReadOrigins />}
        {activeComponent === 'create' && <CreateOrigin />}
      </div>
    </AdminPageSetup>
  );
}
