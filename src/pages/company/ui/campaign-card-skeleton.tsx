import { Card, Skeleton } from '@/shared/ui';

export function CampaignCardSkeleton() {
  return (
    <Card className="flex h-[400px] flex-row gap-5 overflow-hidden p-5">
      <Skeleton className="max-h-[360px] w-[270px] shrink-0 rounded-2xl" />
      <div className="flex min-w-0 flex-1 flex-col gap-3 pt-1">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
        <div className="flex flex-1 flex-col gap-2 pt-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/6" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </Card>
  );
}
