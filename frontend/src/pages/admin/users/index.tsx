import Loader from '@/components/Loader';
import AdminTable from '@/components/admin/table/AdminTable';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import AdminTableModal from '@/components/admin/table/AdminTableModal';
import client from '@/graphql/client';
import {
  NewUserInput,
  useCreateNewUserMutation,
  useGetAllUsersQuery,
  User,
  useUpdateUserAdminMutation,
} from '@/graphql/generated/schema';
import { useDeleteUserMutation } from '@/graphql/generated/schema';
import { createColumnsFromData, createDataset } from '@/utils/table';
import { useState } from 'react';
import { newUserFields } from '@/const';
import { useAlert } from '@/components/hooks/AlertContext';
import { validateForm } from '@/utils/validateForm';

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [editionMode, setEditionMode] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [defaultValues, setDefaultValues] = useState<Partial<User> | null>(null);

  const [createUser] = useCreateNewUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserAdminMutation();

  const { data: users, loading, error } = useGetAllUsersQuery({});
  const { showAlert } = useAlert();
  if (loading) return <Loader />;

  if (error) return <p>{error.message}</p>;

  const cols = createColumnsFromData(users?.allUsers);
  const dataset = createDataset(users?.allUsers || [], cols);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEdit = (id: number) => {
    const userToEdit = users?.allUsers.find((user) => user.id === id);
    if (userToEdit) {
      const { __typename, ...userWithoutTypename } = userToEdit;
      const userRecord: Record<string, string> = Object.entries(userWithoutTypename).reduce(
        (acc, [key, value]) => {
          acc[key] = value ? String(value) : ''; // Convertir toutes les valeurs en string
          return acc;
        },
        {} as Record<string, string>,
      );

      setUserId(id);
      setEditionMode(true);
      setDefaultValues(userRecord); // Utiliser userRecord
    }
  };

  const registerNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const { isEmailValid, isPasswordValid } = validateForm(formData);

    if (!isEmailValid) {
      showAlert('error', 'Invalid email address', 3000);
      return;
    }

    if (!isPasswordValid) {
      showAlert('error', 'Password must be at least 6 characters long', 3000);
      return;
    }
    const newUser = Object.fromEntries(formData.entries()) as NewUserInput;
    try {
      const res = await createUser({
        variables: {
          newUser,
        },
      });
      if (res.data?.createNewUser.success) {
        setOpen(false);
        showAlert('success', res.data?.createNewUser.message, 3000);
      } else {
        showAlert('error', 'Error adding user', 3000);
      }
    } catch (e) {
      showAlert('error', 'Network or query error while adding user', 3000);
      console.error('Error adding subcategory', error);
    } finally {
      client.resetStore();
    }
  };

  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const formData = new FormData(e.currentTarget);
    const { isEmailValid, isPasswordValid } = validateForm(formData);

    if (!isEmailValid) {
      showAlert('error', 'Invalid email address', 3000);
      return;
    }

    if (!isPasswordValid) {
      showAlert('error', 'Password must be at least 6 characters long', 3000);
      return;
    }
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
        showAlert('success', res.data.updateUserAdmin.message, 3000);
      } else {
        showAlert('error', 'Error updating user', 3000);
      }
    } catch (e) {
      showAlert('error', 'Network or query error while updating user', 3000);
      console.error((e as Error).message);
    } finally {
      client.resetStore();
    }
  };

  const removeUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const { data } = await deleteUser({
          variables: {
            userId: id,
          },
        });
        if (data?.deleteUser.success) {
          showAlert('success', 'User deleted successfully', 3000);
        } else {
          const message = data?.deleteUser?.message ?? 'An error occurred';
          showAlert('error', message, 3000);
        }
      } catch (e) {
        console.error((e as Error).message);
      } finally {
        client.resetStore();
      }
    }
  };

  return (
    <LayoutDashboard>
      <main className="container">
        <div className="text-center p-4">
          <h2>Users Management</h2>
        </div>
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
            defaultValues={defaultValues as Record<string, string>}
          />
        )}
      </main>
    </LayoutDashboard>
  );
}
