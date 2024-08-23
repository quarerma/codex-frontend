import { getUserById } from '../../api/auth/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '../../types/user';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
/* <ReactQueryDevtools initialIsOpen={false} /> */

import { Link } from 'react-router-dom';

export default function HomePage() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserById(),
  });

  const cachedData = queryClient.getQueryData<User>(['user']);
  console.log(cachedData);
  return (
    <div>
      <h1>{user?.username}</h1>
      <Link to={'/admin/dashboard'}>Admin</Link>
    </div>
  );
}
