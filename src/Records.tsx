import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecordsList } from "./records-list";

export default function RecordsPage() {
  return (
    <main className="flex min-h-screen w-[100vw] flex-col items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Twitter Trends Records</CardTitle>
          <CardDescription>
            View all previously scraped Twitter trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecordsList />
        </CardContent>
      </Card>
    </main>
  );
}
