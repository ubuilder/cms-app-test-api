import type { Db, DbFilter } from "$lib/types";
import type { AssetType } from "$lib/types/asset";

export async function getAssets({ filters, db }: {filters: DbFilter, db: Db}): Promise<AssetType[]> {
  return db<AssetType>("u-files")
    .query({ perPage: 50, where: filters })
    .then((res: any) => res.data);
}
