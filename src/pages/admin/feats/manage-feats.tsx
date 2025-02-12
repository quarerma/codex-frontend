import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import AdminPageSetup from '../components/admin-page';
import CreateFeats from './components/create-feats';
import ReadFeats from './components/read-feats';

export default function ManageFeats() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-feats') {
      setActiveComponent('read');
    } else {
      setActiveComponent('create');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-feats';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-feats';
    } else if (activeComponent === 'add-feats') {
      window.location.hash = '#add-feats';
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
            Criar Poder
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'}`}
          >
            Visualizar Poderes
          </Button>
        </div>
        {activeComponent === 'read' && <ReadFeats />}
        {activeComponent === 'create' && <CreateFeats />}
      </div>
    </AdminPageSetup>
  );
}
