import { Card, Skeleton } from '@/shared/ui';
import styles from './campaign-card-skeleton.module.css';

export function CampaignCardSkeleton() {
  return (
    <Card className={styles.card}>
      <Skeleton className={styles.image} />
      <div className={styles.body}>
        <Skeleton className={styles.lineTitle} />
        <Skeleton className={styles.lineMeta} />
        <div className={styles.badgeRow}>
          <Skeleton className={styles.badgeSm} />
          <Skeleton className={styles.badgeLg} />
          <Skeleton className={styles.badgeMd} />
        </div>
        <div className={styles.lines}>
          <Skeleton className={styles.line} />
          <Skeleton className={styles.line} />
          <Skeleton className={styles.lineShort} />
          <Skeleton className={styles.line} />
          <Skeleton className={styles.lineShorter} />
          <Skeleton className={styles.line} />
        </div>
      </div>
    </Card>
  );
}
