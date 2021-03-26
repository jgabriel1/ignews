import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="">
            <time>12 de março de 2021</time>

            <strong>Lorem Ipsum</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mattis leo sed diam sagittis, sed consequat mi placerat. In non
              est posuere, imperdiet ipsum vitae, pulvinar est.
            </p>
          </a>

          <a href="">
            <time>12 de março de 2021</time>

            <strong>Lorem Ipsum</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mattis leo sed diam sagittis, sed consequat mi placerat. In non
              est posuere, imperdiet ipsum vitae, pulvinar est.
            </p>
          </a>

          <a href="">
            <time>12 de março de 2021</time>

            <strong>Lorem Ipsum</strong>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              mattis leo sed diam sagittis, sed consequat mi placerat. In non
              est posuere, imperdiet ipsum vitae, pulvinar est.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}
