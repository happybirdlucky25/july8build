"use client";

import Link from "next/link";
import { Campaign } from "@/types/campaign";

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <Link 
              href={`/campaigns/${campaign.campaign_id}`}
              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {campaign.name}
            </Link>
          </div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            campaign.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {campaign.status === 'active' ? 'Active' : 'Archived'}
          </span>
        </div>

        {/* Description */}
        {campaign.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {campaign.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Updated {formatDate(campaign.updated_at)}</span>
          <Link 
            href={`/campaigns/${campaign.campaign_id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
