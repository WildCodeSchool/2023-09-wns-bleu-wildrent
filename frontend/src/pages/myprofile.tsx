import Layout from '@/components/Layout';
import React, { useState } from 'react';
import {
  useDeleteUserMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} from '@/graphql/generated/schema';
import client from '@/graphql/client';
import Orders from '@/components/Orders';
import { useAlert } from '@/components/hooks/AlertContext';

const TABS = {
  ORDERS: 'ORDERS',
  PROFILE: 'PROFILE',
  ACCOUNT: 'ACCOUNT',
};

function MyProfile() {
  const { data } = useGetProfileQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [logout] = useLogoutMutation();
  const user = data?.getProfile;
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState(TABS.ORDERS);

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
        return showAlert('error', 'User not exist', 3000);
      }
    } catch (e) {
      console.error(`Something wrong with account delete: ${(e as Error).message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    formJSON.id = user?.id;
    try {
      const res = await updateUser({
        variables: {
          updatedUser: formJSON as any,
        },
      });
      if (res.data?.updateUser) {
        showAlert('success', 'User updated successfully', 3000);
      } else {
        showAlert('error', 'Error updated user', 3000);
      }
    } catch (e) {
      console.error((e as Error).message);
      showAlert('error', 'An error occurred while updating the profile.', 3000);
    } finally {
      await client.resetStore();
    }
  };

  return (
    <Layout>
      <section className="flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-1/4 p-4 md:border-r">
          <ul className="flex flex-row md:flex-col space-y-0 md:space-y-4 space-x-4 md:space-x-0">
            <li>
              <button
                onClick={() => setActiveTab(TABS.ORDERS)}
                className={`btn w-full ${activeTab === TABS.ORDERS ? 'btn-primary' : 'btn-secondary'}`}
              >
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(TABS.PROFILE)}
                className={`btn w-full ${activeTab === TABS.PROFILE ? 'btn-primary' : 'btn-secondary'}`}
              >
                Edit Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab(TABS.ACCOUNT)}
                className={`btn w-full ${activeTab === TABS.ACCOUNT ? 'btn-primary' : 'btn-secondary'}`}
              >
                Account Settings
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-3/4">
          {activeTab === TABS.ORDERS && <Orders />}
          {activeTab === TABS.PROFILE && (
            <div className="card card-compact w-full bg-base-100 shadow-xl p-5">
              <h2 className="mb-4 text-xl font-bold text-black">Edit your profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                  <div className="w-full">
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Lastname
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.lastname ?? ''}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Firstname
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.firstname ?? ''}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.email}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.address || ''}
                      placeholder="to complete"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="cp" className="block mb-2 text-sm font-medium text-gray-900">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="cp"
                      id="cp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.cp || ''}
                      placeholder="to complete"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      defaultValue={user?.city || ''}
                      placeholder="to complete"
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="picture"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Avatar
                    </label>
                    <input
                      type="text"
                      name="picture"
                      id="picture"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
          )}
          {activeTab === TABS.ACCOUNT && (
            <div>
              <div className="card card-compact w-full bg-base-100 shadow-xl p-5">
                <h2 className="text-xl font-bold text-black">Account Settings</h2>
                <button
                  className="btn btn-error text-primary mt-4 px-6 py-2"
                  onClick={deleteAccount}
                  type="button"
                >
                  Delete your account
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default MyProfile;
