import AdminTable from '@/components/admin/AdminTable';
import LayoutDashboard from '@/components/admin/LayoutDashboard';
import client from '@/graphql/client';
import { useGetAllUsersQuery } from '@/graphql/generated/schema';
import { useDeleteUserMutation } from '@/graphql/generated/schema';
import { createColumnsFromData, createDataset } from '@/utils/table';

export default function Page() {
  const [deleteUser] = useDeleteUserMutation();
  const { data: users, loading, error } = useGetAllUsersQuery({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  const removeUser = async (id: number) => {
    try {
      await deleteUser({
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

  return (
    <LayoutDashboard>
      <main className="container">
        <h1>Gestion des utilisateurs</h1>
        <div className="px-4">
          <AdminTable columns={cols} dataset={dataset} remove={removeUser} />
        </div>
      </main>
    </LayoutDashboard>
  );
}
