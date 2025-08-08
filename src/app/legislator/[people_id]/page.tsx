"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { people, bills } from "@/data/mockData";
import TrackButton from "@/components/TrackButton";
import NotesPanel from "@/components/NotesPanel";
import CampaignPicker from "@/components/CampaignPicker";
import CampaignChips from "@/components/CampaignChips";
// import BillCard from "@/components/BillCard"; // Commented out as not currently used
import { useApp } from "@/contexts/AppContext";

export default function LegislatorDetail() {
  const params = useParams();
  const peopleId = params.people_id as string;
  const [showCampaignPicker, setShowCampaignPicker] = useState(false);
  
  const {
    trackedLegislators,
    toggleLegislatorTracking,
    addNote,
    editNote,
    deleteNote,
    getNotesForEntity,
  } = useApp();

  // Find the legislator
  const legislator = people.find(p => p.people_id === peopleId);
  
  if (!legislator) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Legislator Not Found</h1>
          <p className="text-gray-600">The legislator you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Get sponsored bills (mock implementation - in real app would check sponsors field)
  const sponsoredBills = bills.filter(bill => 
    bill.title.toLowerCase().includes("energy") && legislator.name === "Jane Doe" ||
    bill.title.toLowerCase().includes("housing") && legislator.name === "John Smith"
  );

  const isTracked = trackedLegislators.includes(peopleId);
  const notes = getNotesForEntity(peopleId);

  const getPartyColor = (party: string) => {
    switch (party.toLowerCase()) {
      case "democrat":
        return "bg-blue-100 text-blue-800";
      case "republican":
        return "bg-red-100 text-red-800";
      case "independent":
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
          data-ad-slot="1234567902"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Photo */}
          <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
            {legislator.img ? (
              <Image
                src={legislator.img}
                alt={legislator.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-4xl font-bold">
                  {legislator.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{legislator.name}</h1>
                <p className="text-lg text-gray-600 mb-2">{legislator.role} from {legislator.state}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPartyColor(legislator.party)}`}>
                  {legislator.party}
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
                  onToggle={() => toggleLegislatorTracking(peopleId)}
                  entityType="legislator"
                />
              </div>
            </div>

            {/* Campaign Chips */}
            <CampaignChips mode="legislator" itemId={peopleId} />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Office Information</h3>
                <p className="text-sm text-gray-600 mb-1">Chamber: {legislator.chamber}</p>
                {legislator.district && (
                  <p className="text-sm text-gray-600 mb-1">District: {legislator.district}</p>
                )}
                <p className="text-sm text-gray-600 mb-1">Time in Office: {legislator.time_in_office}</p>
                <p className="text-sm text-gray-600">Phone: {legislator.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                <p className="text-sm text-gray-600 mb-1">Participation Rate: {(legislator.participation_rate * 100).toFixed(1)}%</p>
                <p className="text-sm text-gray-600 mb-1">Bills Sponsored: {legislator.primary_bills_sponsored}</p>
                <p className="text-sm text-gray-600 mb-1">Effectiveness Score: {(legislator.effectiveness_score * 100).toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Bipartisan Rate: {(legislator.bipartisan_sponsorship_rate * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Official Channels</h3>
                <div className="space-y-2">
                  {legislator.website && (
                    <a
                      href={legislator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Official Website
                    </a>
                  )}
                  {legislator.contact_form && (
                    <a
                      href={legislator.contact_form}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Contact Form
                    </a>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Social Media</h3>
                <div className="space-y-2">
                  {legislator.twitter_account && (
                    <a
                      href={`https://twitter.com/${legislator.twitter_account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm"
                    >
                      @{legislator.twitter_account}
                    </a>
                  )}
                  {legislator.facebook_account && (
                    <a
                      href={`https://facebook.com/${legislator.facebook_account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Facebook
                    </a>
                  )}
                  {legislator.instagram_account && (
                    <a
                      href={`https://instagram.com/${legislator.instagram_account}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sponsored Bills */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sponsored Bills</h2>
            {sponsoredBills.length === 0 ? (
              <p className="text-gray-500">No sponsored bills found in the current dataset.</p>
            ) : (
              <div className="grid gap-4">
                {sponsoredBills.map((bill) => (
                  <div key={bill.bill_id} className="border border-gray-200 rounded-lg p-4">
                    <Link href={`/bill/${bill.bill_id}`}>
                      <h3 className="font-medium text-blue-600 hover:text-blue-800 mb-1">{bill.title}</h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-1">{bill.bill_number}</p>
                    <p className="text-sm text-gray-700">{bill.description}</p>
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                      {bill.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Voting Record Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Voting Record Summary</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{legislator.votes_cast}</div>
                <div className="text-sm text-gray-600">Votes Cast</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{legislator.missed_votes}</div>
                <div className="text-sm text-gray-600">Missed Votes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{(legislator.participation_rate * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Participation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NotesPanel
            entityId={peopleId}
            entityType="legislator"
            notes={notes}
            onAddNote={(title, content) => addNote(peopleId, title, content)}
            onEditNote={(noteId, title, content) => editNote(peopleId, noteId, title, content)}
            onDeleteNote={(noteId) => deleteNote(peopleId, noteId)}
          />
        </div>
      </div>

      {/* Campaign Picker Modal */}
      <CampaignPicker
        isOpen={showCampaignPicker}
        onClose={() => setShowCampaignPicker(false)}
        mode="legislator"
        itemId={peopleId}
        onSuccess={handleCampaignSuccess}
      />
    </div>
  );
}
