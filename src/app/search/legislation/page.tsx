"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import BillCard from "@/components/BillCard";
import { bills, bill_summaries } from "@/data/mockData";

export default function SearchLegislation() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bills based on search query
  const filteredBills = useMemo(() => {
    if (!searchQuery.trim()) return bills;
    
    const query = searchQuery.toLowerCase();
    return bills.filter(bill => 
      bill.title.toLowerCase().includes(query) ||
      bill.bill_number.toLowerCase().includes(query) ||
      bill.description.toLowerCase().includes(query) ||
      bill.status.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Get summary for a bill
  const getBillSummary = (billId: string) => {
    const summary = bill_summaries.find(s => s.bill_id === billId);
    return summary?.summary_text;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
                  {/* Google AdSense Ad */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5431445907349741"
                data-ad-slot="1234567891"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Legislation</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          placeholder="Search bills by title, number, or description..."
          onSearch={setSearchQuery}
        />
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {searchQuery.trim() ? (
            <>Results for &quot;{searchQuery}&quot; ({filteredBills.length} found)</>
          ) : (
            <>All Bills ({filteredBills.length} total)</>
          )}
        </h2>
      </div>

      {/* Bills Grid */}
      {filteredBills.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No bills found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or browse all available bills.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBills.map((bill) => (
            <BillCard
              key={bill.bill_id}
              bill_id={bill.bill_id}
              bill_number={bill.bill_number}
              title={bill.title}
              status={bill.status}
              summary={getBillSummary(bill.bill_id)}
              description={bill.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
