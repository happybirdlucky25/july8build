"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import BillCard from "@/components/BillCard";
import { searchBills, fetchRecentBills, type CongressBill } from "@/lib/congress-api";

export default function RealDataLegislationSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bills, setBills] = useState<CongressBill[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial bills or search results
  useEffect(() => {
    loadBills();
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadBills = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let bills: CongressBill[];
      
      if (searchQuery.trim()) {
        bills = await searchBills(searchQuery);
      } else {
        bills = await fetchRecentBills(); // Recent bills
      }

      setBills(bills);
    } catch (err) {
      setError('Failed to load bills. Please try again.');
      console.error('Error loading bills:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Congressional Legislation
        </h1>
        <p className="text-gray-600">
          Search current bills from recent Congressional sessions
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          placeholder="Search by title, sponsor, subject, or bill number..."
          onSearch={setSearchQuery}
        />
      </div>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {searchQuery.trim() ? (
            <>Search Results for &quot;{searchQuery}&quot; ({bills.length} found)</>
          ) : (
            <>Recent Congressional Bills ({bills.length} total)</>
          )}
        </h2>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading real congressional data...</p>
        </div>
      ) : error ? (
        /* Error State */
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">API Error</h3>
            <p className="text-red-600 text-sm mb-4">{error}</p>
            <button
              onClick={loadBills}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : bills.length === 0 ? (
        /* Empty State */
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No bills found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try different keywords or browse recent bills.</p>
        </div>
      ) : (
        /* Bills Grid */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bills.map((bill) => (
            <BillCard
              key={bill.bill_id}
              bill_id={bill.bill_id}
              bill_number={bill.bill_number}
              title={bill.title}
              status={bill.status}
              summary={bill.full_text}
              description={bill.description}
            />
          ))}
        </div>

      )}

      {/* Load More Button */}
      {bills.length >= 20 && (
        <div className="text-center mt-8">
          <button
            onClick={loadBills}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More Bills
          </button>
        </div>
      )}
    </div>
  );
}
