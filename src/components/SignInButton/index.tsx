import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';
import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();
  const isUserLoggedIn = !!session;

  const handleSignInWithGithub = async () => {
    await signIn('github');
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return isUserLoggedIn ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleSignOut}
    >
      <FaGithub color="#04d361" />

      {session.user.name}

      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={handleSignInWithGithub}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
