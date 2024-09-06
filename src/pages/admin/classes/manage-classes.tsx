import AdminPageSetup from '../components/admin-page';
import CreateClass from './components/create-class';

export default function ManageClasses() {
  return (
    <AdminPageSetup>
      <div className="w-full flex p-20 ">
        <CreateClass />
      </div>
    </AdminPageSetup>
  );
}
