import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
// import { tempTrendData } from "./tempData";
import axios from "axios";

interface TrendData {
  _id: { [key: string]: string };
  AllTrends: Array<any>;
  date_time: string;
  ip_address: string;
}

export default function Home() {
  const [trendData, setTrendData] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(false);

  const runScript = async () => {
    setLoading(true);

    try {
      const { data: response } = await axios.post(
        "http://localhost:3456/fetch-hashtags"
      );
      setTrendData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-[100vw] flex-col items-center justify-center p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Twitter Trends Scraper</CardTitle>
          <CardDescription>
            Click the button to fetch the latest Twitter trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runScript} disabled={loading} className="w-full">
            {loading ? "Running script..." : "Click here to run the script"}
          </Button>
          <Link
            to="/records"
            className="block mt-4 text-center text-blue-500 hover:underline"
          >
            View All Records
          </Link>

          {trendData && (
            <div className="mt-6 space-y-4">
              <p className="font-semibold">
                These are the most happening topics as on{" "}
                {new Date(trendData.date_time).toLocaleString()}
              </p>
              <ul className="list-disc list-inside space-y-1">
                {trendData.AllTrends.map((el) => (
                  <>
                    <li className="flex gap-[0.5rem]">
                      <span>{el.title}</span>
                      <span style={{ scale: "1.3" }}>·</span>
                      <span className="text-slate-500">{el.region}</span>
                    </li>
                  </>
                ))}
              </ul>
              <p>
                The IP address used for this query was {trendData.ip_address}
              </p>
              <details>
                <summary className="cursor-pointer font-medium">
                  View JSON extract
                </summary>
                <pre className="bg-gray-100 p-4 mt-2 rounded text-sm overflow-x-auto">
                  {JSON.stringify([trendData], null, 2)}
                </pre>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
