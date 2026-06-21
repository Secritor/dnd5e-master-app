import { useQuery } from '@tanstack/react-query';
import { fetchOfficialCampaigns } from '../api/fetch-official-campaigns';
import { campaignKeys } from './campaign-keys';

export function useOfficialCampaigns() {
  return useQuery({
    queryKey: campaignKeys.official(),
    queryFn: fetchOfficialCampaigns,
  });
}
