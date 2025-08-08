"use client";

import { useState } from "react";
import { bills, bill_summaries, people } from "@/data/mockData";
import BillCard from "@/components/BillCard";
import LegislatorCard from "@/components/LegislatorCard";
import Tabs from "@/components/Tabs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useApp } from "@/contexts/AppContext";

export default function TrackedPage() {
  return (
    <ProtectedRoute>
      <TrackedContent />
    </ProtectedRoute>
  );
}

function TrackedContent() {
  const [activeTab, setActiveTab] = useState("bills");
  const { trackedBills, trackedLegislators } = useApp();

  // Get tracked bills data
  const trackedBillsData = bills.filter(bill => trackedBills.includes(bill.bill_id));
  
  // Get tracked legislators data
  const trackedLegislatorsData = people.filter(person => trackedLegislators.includes(person.people_id));

  // Get summary for a bill
  const getBillSummary = (billId: string) => {
    const summary = bill_summaries.find(s => s.bill_id === billId);
    return summary?.summary_text;
  };

  const tabs = [
    { id: "bills", label: "Tracked Bills", count: trackedBills.length },
    { id: "legislators", label: "Tracked Legislators", count: trackedLegislators.length }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
                  {/* Google AdSense Ad */}
            <div className="mb-8 p-4 bg-white border border-gray-200 rounded-lg">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5431445907349741"
                data-ad-slot="1234567893"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Tracked Items</h1>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-8"
      />

      {/* Content */}
      {activeTab === "bills" && (
        <div>
          {trackedBillsData.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tracked bills yet</h3>
              <p className="text-gray-500 mb-4">
                Start tracking bills to keep up with legislation that matters to you.
              </p>
              <a
                href="/search/legislation"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Search Bills
              </a>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Tracked Bills ({trackedBillsData.length})
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trackedBillsData.map((bill) => (
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
            </>
          )}
        </div>
      )}

      {activeTab === "legislators" && (
        <div>
          {trackedLegislatorsData.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tracked legislators yet</h3>
              <p className="text-gray-500 mb-4">
                Start tracking legislators to stay informed about your representatives.
              </p>
              <a
                href="/search/legislators"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Search Legislators
              </a>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Tracked Legislators ({trackedLegislatorsData.length})
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {trackedLegislatorsData.map((legislator) => (
                  <LegislatorCard
                    key={legislator.people_id}
                    people_id={legislator.people_id}
                    name={legislator.name}
                    state={legislator.state}
                    party={legislator.party}
                    chamber={legislator.chamber}
                    role={legislator.role}
                    img={legislator.img}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
