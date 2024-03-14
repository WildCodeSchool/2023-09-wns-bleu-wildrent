import Layout from '@/components/Layout';
import React from 'react';
import {
  GetProfileDocument,
  useGetProfileQuery,
  useUpdateUserMutation,
} from '@/graphql/generated/schema';
import router from 'next/router';
import Link from 'next/link';

function MyProfile() {
  const { data } = useGetProfileQuery();
  const [updateUser] = useUpdateUserMutation();
  const user = data?.getProfile;
  console.log({ user });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());
    console.log({ formJSON });
    updateUser({
      variables: {
        updatedUser: formJSON as any,
      },
      refetchQueries: [{ query: GetProfileDocument }],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        const message = res.data?.updateUser.message;
        alert(message);
        if (res.data?.updateUser.success) {
          router.push(`/myprofile`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert(error.message || 'Une erreur est survenue lors de la mise à jour du profil.');
      });
  };
  return (
    <Layout>
      <section className="">
        <div className="card card-compact w-full bg-base-100 shadow-xl p-5 m-5">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Historique des commandes
          </h2>
          <p> Aucune commande à ce jour</p>
        </div>
        <div className="card card-compact w-full bg-base-100 shadow-xl p-5  m-5">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Modifier votre profil
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="w-full">
                <label
                  htmlFor="lastname "
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  NOM
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.lastname}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="firstname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.firstname}
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
                  Mot de passe
                </label>
                <Link
                  href="#"
                  // className="w-full p-2.5 hover:bg-white hover:rounded-lg text-blue-600 visited:text-purple-600"
                  className="hover:bg-gray-50 border border-gray-300text-blue-600 visited:text-purple-600 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  réinitialiser votre mot de passe
                </Link>
              </div>
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.address || ''}
                  placeholder="à compléter"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="cp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Code Postal
                </label>
                <input
                  type="string"
                  name="cp"
                  id="cp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.cp || ''}
                  placeholder="à compléter"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ville
                </label>
                <input
                  type="string"
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  defaultValue={user?.city || ''}
                  placeholder="à compléter"
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
                  placeholder="à compléter"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button type="submit" className="btn btn-active btn-secondary">
                Update product
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default MyProfile;
