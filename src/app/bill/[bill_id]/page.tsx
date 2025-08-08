"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { bills, bill_summaries, history, documents } from "@/data/mockData";
import TrackButton from "@/components/TrackButton";
import NotesPanel from "@/components/NotesPanel";
import CampaignPicker from "@/components/CampaignPicker";
import CampaignChips from "@/components/CampaignChips";
import { useApp } from "@/contexts/AppContext";

export default function BillDetail() {
  const params = useParams();
  const billId = params.bill_id as string;
  const [showCampaignPicker, setShowCampaignPicker] = useState(false);
  
  const {
    trackedBills,
    toggleBillTracking,
    addNote,
    editNote,
    deleteNote,
    getNotesForEntity,
  } = useApp();

  // Find the bill
  const bill = bills.find(b => b.bill_id === billId);
  
  if (!bill) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Bill Not Found</h1>
          <p className="text-gray-600">The bill you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Get related data
  const summary = bill_summaries.find(s => s.bill_id === billId);
  const billHistory = history.filter(h => h.bill_id === billId).sort((a, b) => a.sequence - b.sequence);
  const billDocuments = documents.filter(d => d.bill_id === billId);
  const isTracked = trackedBills.includes(billId);
  const notes = getNotesForEntity(billId);

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

  const handleCampaignSuccess = () => {
    // Force re-render of CampaignChips
    setShowCampaignPicker(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Google AdSense Ad */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5431445907349741"
          data-ad-slot="1234567901"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{bill.title}</h1>
            <p className="text-lg text-gray-600 mb-2">{bill.bill_number}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bill.status)}`}>
              {bill.status}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCampaignPicker(true)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Add to Campaign
            </button>
            <TrackButton
              isTracked={isTracked}
              onToggle={() => toggleBillTracking(billId)}
              entityType="bill"
            />
          </div>
        </div>
        
        {/* Campaign Chips */}
        <CampaignChips mode="bill" itemId={billId} />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Status Details</h3>
            <p className="text-sm text-gray-600 mb-1">Status Date: {new Date(bill.status_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-1">Last Action: {new Date(bill.last_action_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600">Committee: {bill.committee}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-700">{bill.description}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Summary */}
          {summary && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AI Summary</h2>
              <p className="text-gray-700 leading-relaxed">{summary.summary_text}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Confidence: {(summary.confidence_score * 100).toFixed(0)}%</p>
                <p>Model: {summary.model_version}</p>
              </div>
            </div>
          )}

          {/* Last Action */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest Action</h2>
            <p className="text-gray-700">{bill.last_action}</p>
            <p className="text-sm text-gray-500 mt-2">{new Date(bill.last_action_date).toLocaleDateString()}</p>
          </div>

          {/* History */}
          {billHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Bill History</h2>
              <div className="space-y-3">
                {billHistory.map((item) => (
                  <div key={item.history_id} className="border-l-4 border-blue-500 pl-4">
                    <p className="text-gray-700">{item.action}</p>
                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()} - {item.chamber}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Documents */}
          {billDocuments.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents</h2>
              <div className="space-y-2">
                {billDocuments.map((doc) => (
                  <div key={doc.document_id} className="flex items-center justify-between p-3 border border-gray-200 rounded">
                    <div>
                      <p className="font-medium text-gray-900">{doc.document_desc}</p>
                      <p className="text-sm text-gray-500">
                        {doc.document_type} • {(doc.document_size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NotesPanel
            entityId={billId}
            entityType="bill"
            notes={notes}
            onAddNote={(title, content) => addNote(billId, title, content)}
            onEditNote={(noteId, title, content) => editNote(billId, noteId, title, content)}
            onDeleteNote={(noteId) => deleteNote(billId, noteId)}
          />
        </div>
      </div>

      {/* Campaign Picker Modal */}
      <CampaignPicker
        isOpen={showCampaignPicker}
        onClose={() => setShowCampaignPicker(false)}
        mode="bill"
        itemId={billId}
        onSuccess={handleCampaignSuccess}
      />
    </div>
  );
}
