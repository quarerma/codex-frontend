import AdminPageSetup from '../components/admin-page';
import CreateSkills from '../components/create-skills';

export default function ManageSkills() {
  return (
    <AdminPageSetup>
      <div className="w-full flex p-20">
        <CreateSkills />
      </div>
    </AdminPageSetup>
  );
}
