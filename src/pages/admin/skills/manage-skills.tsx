import { useState, useEffect } from 'react';
import AdminPageSetup from '../components/admin-page';
import CreateSkills from '../components/create-skills';
import ReadSkills from '../components/read-skills';
import { Button } from '../../../components/ui/button';

export default function ManageSkills() {
  const [activeComponent, setActiveComponent] = useState('create');

  useEffect(() => {
    // Atualiza o componente ativo baseado no hash da URL
    const hash = window.location.hash.substring(1);
    if (hash === 'read-skills') {
      setActiveComponent('read');
    } else {
      setActiveComponent('create');
    }
  }, []);

  // Atualiza o hash da URL quando o componente ativo mudar
  useEffect(() => {
    if (activeComponent === 'read') {
      window.location.hash = '#read-skills';
    } else if (activeComponent === 'create') {
      window.location.hash = '#create-skills';
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
            Criar Perícia
          </Button>
          <Button
            variant={'outline'}
            onClick={() => setActiveComponent('read')}
            className={`px-3 py-2 rounded-t-xl border-2 border-b-dark-bg-secondary  ${
              activeComponent === 'read' ? 'bg-dark-bg-secondary ' : 'bg-transparent border-none'
            }`}
          >
            Visualizar Perícias
          </Button>
        </div>
        {activeComponent === 'read' && <ReadSkills />}
        {activeComponent === 'create' && <CreateSkills />}
      </div>
    </AdminPageSetup>
  );
}
