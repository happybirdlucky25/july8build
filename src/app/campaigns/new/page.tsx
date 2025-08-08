"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CampaignForm from "@/components/CampaignForm";
import { CampaignFormData, CampaignValidationErrors } from "@/types/campaign";

export default function NewCampaignPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CampaignValidationErrors>({});
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    // Get campaign count from localStorage
    const storedCount = localStorage.getItem('poliux_campaign_count');
    const count = storedCount ? parseInt(storedCount, 10) : 3; // Default to 3 from mock data
    setCampaignCount(count);
  }, []);

  const handleSubmit = async (formData: CampaignFormData & { selectedBills: string[], selectedLegislators: string[] }) => {
    if (campaignCount >= 25) {
      setErrors({ general: "You have reached the maximum limit of 25 campaigns." });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Create new campaign ID
      const newCampaignId = Date.now();

      // Create new campaign (in real app, this would be an API call)
      const newCampaign = {
        campaign_id: newCampaignId,
        owner_id: "u001",
        name: formData.name,
        description: formData.description || null,
        status: "active" as const,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Create campaign bills associations
      const campaignBills = formData.selectedBills.map(billId => ({
        campaign_id: newCampaignId,
        bill_id: billId,
        added_at: new Date().toISOString()
      }));

      // Create campaign legislators associations
      const campaignLegislators = formData.selectedLegislators.map(legislatorId => ({
        campaign_id: newCampaignId,
        people_id: legislatorId,
        added_at: new Date().toISOString()
      }));

      // In a real app, you'd save these to your database
      // For now, we'll store in localStorage for demonstration
      const existingCampaigns = JSON.parse(localStorage.getItem('poliux_campaigns') || '[]');
      const existingCampaignBills = JSON.parse(localStorage.getItem('poliux_campaign_bills') || '[]');
      const existingCampaignLegislators = JSON.parse(localStorage.getItem('poliux_campaign_legislators') || '[]');

      localStorage.setItem('poliux_campaigns', JSON.stringify([...existingCampaigns, newCampaign]));
      localStorage.setItem('poliux_campaign_bills', JSON.stringify([...existingCampaignBills, ...campaignBills]));
      localStorage.setItem('poliux_campaign_legislators', JSON.stringify([...existingCampaignLegislators, ...campaignLegislators]));

      // Update localStorage count
      const newCount = campaignCount + 1;
      localStorage.setItem('poliux_campaign_count', newCount.toString());

      // Redirect to the new campaign's detail page
      router.push(`/campaigns/${newCampaignId}`);
    } catch {
      setErrors({ general: "Failed to create campaign. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  if (campaignCount >= 25) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Limit Reached</h1>
          <p className="text-gray-600 mb-6">
            You have reached the maximum limit of 25 campaigns. Please archive or delete an existing campaign before creating a new one.
          </p>
          <Link
            href="/campaigns"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back to Campaigns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
              {/* Google AdSense Ad */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-5431445907349741"
            data-ad-slot="1234567895"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Link
            href="/campaigns"
            className="text-gray-400 hover:text-gray-600 mr-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
        </div>
        <p className="text-gray-600">
          Create a new advocacy campaign and optionally include bills and legislators from your tracked items.
        </p>
      </div>

      {/* Campaign Limit Info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-blue-700">
            {campaignCount} of 25 campaigns used
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <CampaignForm
          onSubmit={handleSubmit}
          onCancel={() => router.push('/campaigns')}
          isLoading={isLoading}
          errors={errors}
        />
      </div>
    </div>
  );
}
