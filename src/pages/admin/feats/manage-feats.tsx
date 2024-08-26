import AdminPageSetup from '../components/admin-page';
import CreateFeats from '../components/create-feats';

export default function ManageFeats() {
  return (
    <AdminPageSetup>
      <div className="w-full flex p-20">
        <CreateFeats />
      </div>
    </AdminPageSetup>
  );
}
