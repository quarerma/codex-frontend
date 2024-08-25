import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/sidebar';
import { getAllUsers } from '../../../api/fetch/user';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';

export default function ManageUsers() {
  const [searchUsers, setSearchUsers] = useState(false);
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => getAllUsers(),
    enabled: searchUsers,
    staleTime: 100 * 60 * 10,
  });

  return (
    <div className="max-w-screen min-h-screen bg-dark-bg font-inter text-foreground flex">
      <Sidebar />
      <div className="flex flex-col gap-y-5 p-10 w-full">
        <div className="w-full flex flex-col items-center justify-center py-10 ">
          <div className="flex flex-col bg-dark-bg-secondary w-full p-5 border-2 border-border gap-y-10">
            <div className="gap-y-2">
              <h1 className="text-3xl font-semibold text-left ">Usuários</h1>
              <h1 className="text-sm text-muted-foreground">Gerencie os usuários</h1>
            </div>
            <Table className="text-xl w-full   border-2 border-border">
              <TableCaption className="mt-10 mb-5">Exibindo {users ? `${users.length}` : '0'} usuários</TableCaption>
              <TableHeader className="border-0">
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users?.map((user: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button className="w-[20%] text-xl py-7 rounded-xl " variant={'default'} onClick={() => setSearchUsers(true)}>
            Search Users
          </Button>
        </div>
      </div>
    </div>
  );
}
