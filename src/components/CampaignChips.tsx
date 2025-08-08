"use client";

import { useState, useEffect } from "react";
import { Campaign } from "@/types/campaign";
import { getCampaignsForBill, getCampaignsForLegislator } from "@/utils/campaignUtils";

interface CampaignChipsProps {
  mode: "bill" | "legislator";
  itemId: string;
}

export default function CampaignChips({ mode, itemId }: CampaignChipsProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const loadCampaigns = () => {
      let itemCampaigns: Campaign[];
      if (mode === "bill") {
        itemCampaigns = getCampaignsForBill(itemId);
      } else {
        itemCampaigns = getCampaignsForLegislator(itemId);
      }
      setCampaigns(itemCampaigns);
    };

    loadCampaigns();
    
    // Listen for storage changes to update when campaigns are added/removed
    const handleStorageChange = () => {
      loadCampaigns();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mode, itemId]);

  if (campaigns.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700">Added to campaigns:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {campaigns.map((campaign) => (
          <span
            key={campaign.campaign_id}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          >
            {campaign.name}
          </span>
        ))}
      </div>
    </div>
  );
}
