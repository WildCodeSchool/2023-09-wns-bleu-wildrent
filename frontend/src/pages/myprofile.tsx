import Layout from '@/components/Layout';
import React from 'react';
import {
  useDeleteUserMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from '@/graphql/generated/schema';
import router from 'next/router';
import Link from 'next/link';
import client from '@/graphql/client';
import Orders from '@/components/Orders';

function MyProfile() {
  const { data } = useGetProfileQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();
  const user = data?.getProfile;

  const deleteAccount = async () => {
    try {
      if (user && user.id) {
        const res = await deleteUser({
          variables: {
            userId: user.id,
          },
        });
        if (res.data?.deleteUser.success) {
          await logout();
          await client.resetStore();
        }
        return alert(res.data?.deleteUser.message);
      } else {
        return alert('User not exist');
      }
    } catch (e) {
      console.error(`Something wrong with account delete: ${(e as Error).message}`);
    } finally {
      router.push('/auth/register');
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    try {
      const res = await updateUser({
        variables: {
          updatedUser: formJSON as any,
        },
      });
      const message = res.data?.updateUser.message;
      alert(message);
    } catch (e) {
      console.error((e as Error).message);
      alert((e as Error).message || 'Une erreur est survenue lors de la mise à jour du profil.');
    } finally {
      await client.resetStore();
    }
  };
  return (
    <Layout>
      <section className="">
        <Orders />
        <div className="card card-compact w-full bg-base-100 shadow-xl p-5  m-5">
          <h2 className="mb-4 text-xl font-bold dark:text-white">Edit your profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="lastname "
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.lastname ?? ''}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.firstname ?? ''}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.email}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <Link
                  href="#"
                  // className="w-full p-2.5 hover:bg-white hover:rounded-lg text-blue-600 visited:text-purple-600"
                  className="hover:bg-gray-50 border border-gray-300text-blue-600 visited:text-purple-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  Reset your password
                </Link>
              </div>
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.address || ''}
                  placeholder="to complete"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="cp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Postal Code
                </label>
                <input
                  type="string"
                  name="cp"
                  id="cp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.cp || ''}
                  placeholder="to complete"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  type="string"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.city || ''}
                  placeholder="to complete"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="picture"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Avatar
                </label>
                <input
                  type="string"
                  name="picture"
                  id="picture"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.picture || ''}
                  placeholder="to complete"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="btn btn-active btn-secondary">
                Save
              </button>
            </div>
          </form>
        </div>
        <button
          className="btn btn-error text-primary mt-4 ml-4 px-6 py-2 "
          onClick={deleteAccount}
          type="button"
        >
          Delete your account
        </button>
      </section>
    </Layout>
  );
}

export default MyProfile;
