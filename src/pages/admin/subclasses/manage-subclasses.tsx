import AdminPageSetup from '../components/admin-page';
import CreateSubClasses from './components/create-subclass';

export default function ManageSubclasses() {
  return (
    <AdminPageSetup>
      <div className="w-full flex p-20 font-inter ">
        <CreateSubClasses />
      </div>
    </AdminPageSetup>
  );
}
