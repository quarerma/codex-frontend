import { useEffect, useState } from 'react';
import AdminPageSetup from '../components/admin-page';
import CreateSubClasses from './components/create-subclass';
import { Button } from '../../../components/ui/button';
import ReadSubClasses from './components/read-subclasses';
import AssignFeatSubclass from './components/add-feat-subclass';

export default function ManageSubclasses() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-subclasses') {
      setActiveComponent('read');
    } else if (hash === 'create-subclasses') {
      setActiveComponent('create');
    } else if (hash === 'add-feats') {
      setActiveComponent('add-feats');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-subclasses';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-subclasses';
    }
  }, [activeComponent]);

  return (
    <AdminPageSetup>
      <div className="w-full flex flex-col p-20 font-inter">
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
            Criar Subclasse
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${
              activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'
            }`}
          >
            Visualizar Subclasses
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('add-feats')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${
              activeComponent === 'add-feats' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'
            }`}
          >
            Adicionar Poder
          </Button>
        </div>
        {activeComponent === 'read' && <ReadSubClasses />}
        {activeComponent === 'create' && <CreateSubClasses />}
        {activeComponent === 'add-feats' && <AssignFeatSubclass />}
      </div>
    </AdminPageSetup>
  );
}
