import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";

import data from "@/constants/data.json";
import { decrypt } from "@/shared/utils/crypto";
import { cookies } from "next/headers";

export default async function Page() {
  const cookiesList = await cookies();
  const accessToken = cookiesList.get("accessToken")?.value;
  if (!accessToken) {
    return <div>No access token</div>;
  }
  const payload = await decrypt(accessToken);
  console.log(payload);
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
