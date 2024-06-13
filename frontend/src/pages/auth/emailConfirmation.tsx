import RootLayout from '@/app/layout';
import { useConfirmEmailMutation } from '@/graphql/generated/schema';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function EmailConfirmation() {
  const router = useRouter();
  const [confirmEmail] = useConfirmEmailMutation();

  const token = router.query.token as string;
  console.log(token);

  useEffect(() => {
    if (token)
      confirmEmail({ variables: { token } }).then(() => {
        setTimeout(() => {
          router.push('/auth/login');
        }, 5000);
      });
  }, [token]);

  return (
    <RootLayout>
      <p>
        Merci d'avoir confirmé votre email. Vous allez être redirigé.e vers la page de connexion
        dans quelques instants.
      </p>
    </RootLayout>
  );
}
