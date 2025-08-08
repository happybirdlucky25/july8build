"use client";

import { useState, useEffect, useCallback } from "react";
import { Campaign } from "@/types/campaign";
import { listUserCampaigns, linkBillToCampaign, linkLegislatorToCampaign, isBillInCampaign, isLegislatorInCampaign } from "@/utils/campaignUtils";

interface CampaignPickerProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "bill" | "legislator";
  itemId: string;
  onSuccess?: () => void;
}

export default function CampaignPicker({
  isOpen,
  onClose,
  mode,
  itemId,
  onSuccess
}: CampaignPickerProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState("");
  const [newCampaignDescription, setNewCampaignDescription] = useState("");
  const [createError, setCreateError] = useState("");

  const loadCampaigns = useCallback(() => {
    const userCampaigns = listUserCampaigns();
    setCampaigns(userCampaigns);
    
    // Check which campaigns already contain this item
    const alreadyInCampaigns: number[] = [];
    
    userCampaigns.forEach(campaign => {
      if (mode === "bill") {
        if (isBillInCampaign(itemId, campaign.id)) {
          alreadyInCampaigns.push(campaign.id);
        }
      } else {
        if (isLegislatorInCampaign(itemId, campaign.id)) {
          alreadyInCampaigns.push(campaign.id);
        }
      }
    });
    
    setSelectedCampaignIds(alreadyInCampaigns);
  }, [mode, itemId]);

  useEffect(() => {
    if (isOpen) {
      loadCampaigns();
    }
  }, [isOpen, loadCampaigns]);

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    campaign.status === "active"
  );

  const handleCampaignToggle = (campaignId: number) => {
    setSelectedCampaignIds(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleCreateCampaign = async () => {
    if (!newCampaignName.trim()) {
      setCreateError("Campaign name is required");
      return;
    }

    if (newCampaignName.length < 3) {
      setCreateError("Campaign name must be at least 3 characters");
      return;
    }

    if (newCampaignName.length > 120) {
      setCreateError("Campaign name must be 120 characters or less");
      return;
    }

    setCreateError("");
    setIsLoading(true);

    try {
      // Create new campaign
      const newCampaignId = Date.now();
      const newCampaign = {
        campaign_id: newCampaignId,
        owner_id: "u001",
        name: newCampaignName.trim(),
        description: newCampaignDescription.trim() || null,
        status: "active" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Save to localStorage
      const existingCampaigns = JSON.parse(localStorage.getItem('poliux_campaigns') || '[]');
      localStorage.setItem('poliux_campaigns', JSON.stringify([...existingCampaigns, newCampaign]));

      // Add to local state
      setCampaigns(prev => [...prev, newCampaign]);
      setSelectedCampaignIds(prev => [...prev, newCampaignId]);

      // Reset form
      setNewCampaignName("");
      setNewCampaignDescription("");
      setShowCreateForm(false);
    } catch {
      setCreateError("Failed to create campaign. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (selectedCampaignIds.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "bill") {
        linkBillToCampaign(selectedCampaignIds[0], [itemId]);
      } else {
        linkLegislatorToCampaign(selectedCampaignIds[0], [itemId]);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to link item to campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isItemInCampaign = (campaignId: number) => {
    if (mode === "bill") {
      return isBillInCampaign(itemId, campaignId);
    } else {
      return isLegislatorInCampaign(itemId, campaignId);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Add to Campaign
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Select campaigns to add this {mode === "bill" ? "bill" : "legislator"} to
          </p>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Campaign List */}
        <div className="flex-1 overflow-y-auto max-h-64">
          {filteredCampaigns.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-gray-500 mb-4">No campaigns found</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first campaign
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => {
                const isAlreadyInCampaign = isItemInCampaign(campaign.campaign_id);
                const isSelected = selectedCampaignIds.includes(campaign.campaign_id);
                
                return (
                  <label
                    key={campaign.campaign_id}
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                      isAlreadyInCampaign ? 'opacity-50' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCampaignToggle(campaign.campaign_id)}
                      disabled={isAlreadyInCampaign}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      {campaign.description && (
                        <div className="text-sm text-gray-500 mt-1">{campaign.description}</div>
                      )}
                      {isAlreadyInCampaign && (
                        <div className="text-xs text-blue-600 mt-1">Already in campaign</div>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Create Campaign Form */}
        {showCreateForm && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Create New Campaign</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Campaign name"
                value={newCampaignName}
                onChange={(e) => setNewCampaignName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Description (optional)"
                value={newCampaignDescription}
                onChange={(e) => setNewCampaignDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {createError && (
                <p className="text-sm text-red-600">{createError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleCreateCampaign}
                  disabled={isLoading}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create"}
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewCampaignName("");
                    setNewCampaignDescription("");
                    setCreateError("");
                  }}
                  className="px-3 py-1 text-gray-600 text-sm hover:text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedCampaignIds.length} campaign{selectedCampaignIds.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedCampaignIds.length === 0 || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add to Campaign"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
