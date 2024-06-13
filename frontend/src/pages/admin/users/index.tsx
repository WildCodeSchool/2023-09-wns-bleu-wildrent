import Loader from '@/components/Loader';
import AdminTable from '@/components/admin/table/AdminTable';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import AdminTableModal from '@/components/admin/table/AdminTableModal';
import client from '@/graphql/client';
import {
  InputUpdate,
  NewUserInput,
  useCreateNewUserMutation,
  useGetAllUsersQuery,
  useUpdateUserAdminMutation,
} from '@/graphql/generated/schema';
import { useDeleteUserMutation } from '@/graphql/generated/schema';
import { createColumnsFromData, createDataset } from '@/utils/table';
import { useState } from 'react';
import { newUserFields } from '@/const';

export default function Page() {
  const [createUser] = useCreateNewUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserAdminMutation();

  const { data: users, loading, error } = useGetAllUsersQuery({});
  const [open, setOpen] = useState<boolean>(false);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  if (loading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEdit = (id: number) => {
    setUserId(id);
    setEditionMode(!editionMode);
  };

  const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
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
        alert(res.data.createNewUser.message);
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const updatedUser = Object.fromEntries(formData.entries());
    try {
      const res = await updateUser({
        variables: {
          updatedUser: {
            id: userId,
            ...updatedUser,
          },
        },
      });
      if (res.data?.updateUserAdmin.success) {
        setEditionMode(false);
        alert(res.data.updateUserAdmin.message);
      }
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const removeUser = async (id: number) => {
    try {
      const res = await deleteUser({
        variables: {
          userId: id,
        },
      });
      alert(res.data?.deleteUser.message);
    } catch (e) {
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const cols = createColumnsFromData(users?.allUsers);
  const dataset = createDataset(users?.allUsers || [], cols);

  return (
    <LayoutDashboard>
      <main className="container">
        <h1>Gestion des utilisateurs</h1>
        <div className="px-4">
          <AdminTable
            columns={cols}
            dataset={dataset}
            remove={removeUser}
            edit={handleEdit}
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
        {editionMode && (
          <AdminTableModal
            fields={newUserFields}
            handleSubmit={editUser}
            open={editionMode}
            setOpen={setEditionMode}
            editionMode={editionMode}
            id={userId}
          />
        )}
      </main>
    </LayoutDashboard>
  );
}
