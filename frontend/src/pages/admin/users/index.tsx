import Loader from '@/components/Loader';
import AdminTable from '@/components/admin/table/AdminTable';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import AdminTableModal from '@/components/admin/table/AdminTableModal';
import client from '@/graphql/client';
import {
  NewUserInput,
  useCreateNewUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '@/graphql/generated/schema';
import { useDeleteUserMutation } from '@/graphql/generated/schema';
import { createColumnsFromData, createDataset } from '@/utils/table';
import { useState } from 'react';
import { newUserFields } from '@/const';

export default function Page() {
  const [createUser] = useCreateNewUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data: users, loading, error } = useGetAllUsersQuery({});
  const [open, setOpen] = useState<boolean>(false);

  if (loading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  const handleOpen = () => {
    setOpen(!open);
  };

  const registerNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newUser = Object.fromEntries(formData.entries()) as NewUserInput;
    try {
      const res = await createUser({
        variables: {
          newUser,
        },
      });
      if (res.data?.createNewUser.success) {
        setOpen(false);
      } else {
        return;
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const editUser = async (id: number) => {};

  const removeUser = async (id: number) => {
    try {
      const res = await deleteUser({
        variables: {
          userId: id,
        },
      });
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const cols = createColumnsFromData(users?.allUsers);
  const dataset = createDataset(users?.allUsers || [], cols);

  console.log(cols, dataset);

  return (
    <LayoutDashboard>
      <main className="container">
        <h1>Gestion des utilisateurs</h1>
        <div className="px-4">
          <AdminTable
            columns={cols}
            dataset={dataset}
            remove={removeUser}
            edit={editUser}
            create={handleOpen}
          />
        </div>
        {open && (
          <AdminTableModal
            fields={newUserFields}
            handleSubmit={registerNewUser}
            open={open}
            setOpen={setOpen}
          />
        )}
      </main>
    </LayoutDashboard>
  );
}
