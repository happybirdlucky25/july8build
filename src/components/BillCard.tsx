"use client";

import Link from "next/link";

interface BillCardProps {
  bill_id: string;
  bill_number: string;
  title: string;
  status: string;
  summary?: string;
  description?: string;
}

export default function BillCard({ bill_id, bill_number, title, status, summary, description }: BillCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "introduced":
        return "bg-blue-100 text-blue-800";
      case "passed senate":
      case "passed house":
        return "bg-green-100 text-green-800";
      case "enacted":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={`/bill/${bill_id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{bill_number}</p>
        <p className="text-sm text-gray-700 line-clamp-3">
          {summary || description || "No description available."}
        </p>
      </div>
    </Link>
  );
}
