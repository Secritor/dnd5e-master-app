import styles from './campaign-card-skeleton.module.css';

export function CampaignCardSkeleton() {
  return (
    <article className={styles.card} aria-hidden="true">
      <div className={styles.cover} />
      <div className={styles.body} />
    </article>
  );
}
