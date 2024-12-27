import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

interface TrendRecord {
  _id: { [key: string]: string };
  unique_id: string;
  AllTrends: Array<{ title: string; region: string }>;
  date_time: string;
  ip_address: string;
}

export function RecordsList() {
  const [records, setRecords] = useState<TrendRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const { data } = await axios.get("http://localhost:3456/get-hashtags");
      setRecords(data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("Failed to fetch records. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading records...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (records[0]) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date & Time</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.unique_id}>
              <TableCell>
                {new Date(record.date_time).toLocaleString()}
              </TableCell>
              <TableCell>{record.ip_address}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Record Details</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Trends:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {record.AllTrends.map((trend, index) => (
                          <li key={index} className="flex gap-2">
                            <span>{trend.title}</span>
                            <span className="text-slate-500">·</span>
                            <span className="text-slate-500">
                              {trend.region}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4">IP Address: {record.ip_address}</p>
                      <p>
                        Date & Time:{" "}
                        {new Date(record.date_time).toLocaleString()}
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else {
    return <h3>No Records</h3>;
  }
}
