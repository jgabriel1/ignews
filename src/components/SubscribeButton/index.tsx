import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripeJS';
import styles from './styles.module.scss';

type SubscribeButtonProps = {
  priceId: string;
};

type SessionWithActiveSubscription = Session & {
  activeSubscription: object | null;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession() as [SessionWithActiveSubscription, boolean];
  const router = useRouter();

  const handleSubscribe = async () => {
    if (!session) {
      return signIn('github');
    }

    if (session.activeSubscription) {
      router.push('/posts');

      return;
    }

    try {
      const response = await api.post<{ sessionId: string }>('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
