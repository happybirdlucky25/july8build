"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { campaigns } from "@/data/mockData";
import CampaignCard from "@/components/CampaignCard";
import EmptyState from "@/components/EmptyState";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Campaign } from "@/types/campaign";

export default function CampaignsPage() {
  return (
    <ProtectedRoute>
      <CampaignsContent />
    </ProtectedRoute>
  );
}

function CampaignsContent() {
  const [userCampaigns, setUserCampaigns] = useState<Campaign[]>([]);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    // Initialize campaigns from mock data
    setUserCampaigns(campaigns as Campaign[]);
    
    // Get campaign count from localStorage
    const storedCount = localStorage.getItem('poliux_campaign_count');
    const count = storedCount ? parseInt(storedCount, 10) : campaigns.length;
    setCampaignCount(count);
  }, []);

  const canCreateCampaign = campaignCount < 25;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Google AdSense Ad */}
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5431445907349741"
        data-ad-slot="1234567894"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Campaigns</h1>
          <p className="text-gray-600">
            Manage your advocacy campaigns and track your progress
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          {canCreateCampaign ? (
            <Link
              href="/campaigns/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Campaign
            </Link>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Campaign limit reached</p>
              <p className="text-xs text-gray-400">Maximum 25 campaigns allowed</p>
            </div>
          )}
        </div>
      </div>

      {/* Campaign Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {userCampaigns.length} of 25 campaigns used
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(campaignCount / 25) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Campaigns List */}
      {userCampaigns.length === 0 ? (
        <EmptyState
          title="No campaigns yet"
          description="Create your first campaign to start organizing your advocacy efforts and tracking your progress."
          actionLabel="Create Your First Campaign"
          actionHref="/campaigns/new"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userCampaigns.map((campaign) => (
            <CampaignCard key={campaign.campaign_id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
