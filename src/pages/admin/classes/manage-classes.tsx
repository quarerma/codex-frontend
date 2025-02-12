import { useEffect, useState } from 'react';
import AdminPageSetup from '../components/admin-page';
import { Button } from '../../../components/ui/button';

import CreateClass from './components/create-class';
import AssignClassFeat from './components/assign-class-feat';

import ReadClasses from './components/read-class';

export default function ManageClasses() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-classes') {
      setActiveComponent('read');
    } else if (hash === 'create-classes') {
      setActiveComponent('create');
    } else if (hash === 'add-feats') {
      setActiveComponent('add-feats');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-classes';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-classes';
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
            Criar Classe
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'}`}
          >
            Visualizar Classes
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('add-feats')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${activeComponent === 'add-feats' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'}`}
          >
            Adicionar Poder
          </Button>
        </div>
        {activeComponent === 'create' && <CreateClass />}
        {activeComponent === 'read' && <ReadClasses />}
        {activeComponent === 'add-feats' && <AssignClassFeat />}
      </div>
    </AdminPageSetup>
  );
}
