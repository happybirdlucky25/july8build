"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { campaigns, campaign_bills, campaign_legislators, campaign_reports, bills, people } from "@/data/mockData";
import CampaignForm from "@/components/CampaignForm";
import TrackedItemsPicker from "@/components/TrackedItemsPicker";
import ReportOrderForm from "@/components/ReportOrderForm";
import ReportRow from "@/components/ReportRow";
import ReportDetailDrawer from "@/components/ReportDetailDrawer";
import { Campaign, CampaignFormData, CampaignValidationErrors, CampaignReport, ReportOrderFormData, ReportOrderValidationErrors } from "@/types/campaign";
import { Bill, Person } from "@/types/mockData";

export default function CampaignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const campaignId = parseInt(params.id as string, 10);
  
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<CampaignValidationErrors>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Bills and Legislators state
  const [campaignBills, setCampaignBills] = useState<Bill[]>([]);
  const [campaignLegislators, setCampaignLegislators] = useState<Person[]>([]);
  const [showBillsPicker, setShowBillsPicker] = useState(false);
  const [showLegislatorsPicker, setShowLegislatorsPicker] = useState(false);
  
  // Reports state
  const [campaignReports, setCampaignReports] = useState<CampaignReport[]>([]);
  const [, setShowReportForm] = useState(false);
  const [reportErrors, setReportErrors] = useState<ReportOrderValidationErrors>({});
  const [selectedReport, setSelectedReport] = useState<CampaignReport | null>(null);
  const [showReportDetail, setShowReportDetail] = useState(false);

  useEffect(() => {
          // Find campaign from mock data
      const foundCampaign = campaigns.find(c => c.campaign_id === campaignId);
      if (foundCampaign) {
        setCampaign(foundCampaign as Campaign);
      
      // Load campaign bills
      const billIds = campaign_bills
        .filter(cb => cb.campaign_id === campaignId)
        .map(cb => cb.bill_id);
      const campaignBillsData = bills.filter(bill => billIds.includes(bill.bill_id));
      setCampaignBills(campaignBillsData);
      
      // Load campaign legislators
      const peopleIds = campaign_legislators
        .filter(cl => cl.campaign_id === campaignId)
        .map(cl => cl.people_id);
      const campaignLegislatorsData = people.filter(person => peopleIds.includes(person.people_id));
      setCampaignLegislators(campaignLegislatorsData);
      
              // Load campaign reports
        const campaignReportsData = campaign_reports.filter(cr => cr.campaign_id === campaignId);
        setCampaignReports(campaignReportsData as CampaignReport[]);
    } else {
      // Campaign not found, redirect to campaigns list
      router.push('/campaigns');
    }
  }, [campaignId, router]);

  // Get tracked items for picker (commented out as they're not currently used)
  // const getTrackedBills = (): Bill[] => {
  //   const trackedBillIds = user_tracked_legislation.map(utl => utl.bill_id);
  //   return bills.filter(bill => trackedBillIds.includes(bill.bill_id));
  // };

  // const getTrackedLegislators = (): Person[] => {
  //   const trackedPeopleIds = user_tracked_legislators.map(utl => utl.people_id);
  //   return people.filter(person => trackedPeopleIds.includes(person.people_id));
  // };

  // Campaign management functions
  const handleUpdate = async (formData: CampaignFormData) => {
    if (!campaign) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update campaign (in real app, this would be an API call)
      const updatedCampaign = {
        ...campaign,
        name: formData.name,
        description: formData.description || null,
        updated_at: new Date().toISOString()
      };

      setCampaign(updatedCampaign);
      setIsEditing(false);
    } catch {
      setErrors({ general: "Failed to update campaign. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchive = async () => {
    if (!campaign) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newStatus = campaign.status === 'active' ? 'archived' : 'active';
      const updatedCampaign = {
        ...campaign,
        status: newStatus as 'active' | 'archived',
        updated_at: new Date().toISOString()
      };

      setCampaign(updatedCampaign);
    } catch {
      setErrors({ general: "Failed to update campaign status. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!campaign) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update localStorage count
      const currentCount = localStorage.getItem('poliux_campaign_count');
      const count = currentCount ? parseInt(currentCount, 10) : 3;
      localStorage.setItem('poliux_campaign_count', (count - 1).toString());

      // In a real app, you'd remove the campaign from your state management
      router.push('/campaigns');
    } catch {
      setErrors({ general: "Failed to delete campaign. Please try again." });
      setIsLoading(false);
    }
  };

  // Bills and Legislators management functions (commented out as not currently used)
  // const handleAddBills = (billIds: string[]) => {
  //   const newBills = bills.filter(bill => billIds.includes(bill.bill_id));
  //   setCampaignBills(prev => [...prev, ...newBills]);
  //   setShowBillsPicker(false);
  // };

  // const handleAddLegislators = (peopleIds: string[]) => {
  //   const newLegislators = people.filter(person => peopleIds.includes(person.people_id));
  //   setCampaignLegislators(prev => [...prev, ...newLegislators]);
  //   setShowLegislatorsPicker(false);
  // };

  const handleRemoveBill = (billId: string) => {
    setCampaignBills(prev => prev.filter(bill => bill.bill_id !== billId));
  };

  const handleRemoveLegislator = (peopleId: string) => {
    setCampaignLegislators(prev => prev.filter(person => person.people_id !== peopleId));
  };

  // Reports management functions
  const handleOrderReport = async (formData: ReportOrderFormData) => {
    setIsLoading(true);
    setReportErrors({});

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReport: CampaignReport = {
        report_id: `r${Date.now()}`,
        campaign_id: campaignId,
        type: formData.type,
        scope: formData.scope,
        status: 'queued',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setCampaignReports(prev => [newReport, ...prev]);
      setShowReportForm(false);

      // Simulate status changes
      setTimeout(() => {
        setCampaignReports(prev => prev.map(r => 
          r.report_id === newReport.report_id 
            ? { ...r, status: 'processing', updated_at: new Date().toISOString() }
            : r
        ));
      }, 1000);

      setTimeout(() => {
        setCampaignReports(prev => prev.map(r => 
          r.report_id === newReport.report_id 
            ? { 
                ...r, 
                status: 'ready', 
                updated_at: new Date().toISOString(),
                content: {
                  sections: [
                    {
                      title: "Executive Summary",
                      content: `This is a generated ${formData.type.replace('_', ' ')} report for the selected items. The analysis covers key aspects and provides actionable insights.`
                    },
                    {
                      title: "Key Findings",
                      content: "Based on the analysis of the selected bills and legislators, several important patterns and implications have been identified."
                    },
                    {
                      title: "Recommendations",
                      content: "Consider these strategic recommendations for your advocacy efforts and policy engagement."
                    }
                  ]
                }
              }
            : r
        ));
      }, 3000);

    } catch {
      setReportErrors({ general: "Failed to order report. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryReport = (reportId: string) => {
    setCampaignReports(prev => prev.map(r => 
      r.report_id === reportId 
        ? { ...r, status: 'queued', updated_at: new Date().toISOString() }
        : r
    ));
  };

  const handleCancelReport = (reportId: string) => {
    setCampaignReports(prev => prev.filter(r => r.report_id !== reportId));
  };

  const handleViewReport = (report: CampaignReport) => {
    setSelectedReport(report);
    setShowReportDetail(true);
  };

  if (!campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Google AdSense Ad */}
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5431445907349741"
        data-ad-slot="1234567896"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
    </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link
            href="/campaigns"
            className="text-gray-400 hover:text-gray-600 mr-4"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{campaign.name}</h1>
            <div className="flex items-center mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                campaign.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status === 'active' ? 'Active' : 'Archived'}
              </span>
              <span className="text-gray-500 text-sm ml-4">
                Updated {formatDate(campaign.updated_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleArchive}
                disabled={isLoading}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {campaign.status === 'active' ? 'Archive' : 'Unarchive'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isLoading}
                className="px-4 py-2 border border-red-300 rounded-md text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {/* Error Display */}
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{errors.general}</p>
        </div>
      )}

      {/* Campaign Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        {isEditing ? (
          <CampaignForm
            initialData={{
              name: campaign.name,
              description: campaign.description || ""
            }}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            isLoading={isLoading}
            submitLabel="Update Campaign"
            errors={errors}
          />
        ) : (
          <div className="space-y-6">
            {/* Description */}
            {campaign.description && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-wrap">{campaign.description}</p>
              </div>
            )}

            {/* Campaign Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Created
                </h3>
                <p className="text-gray-900">{formatDate(campaign.created_at)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Last Updated
                </h3>
                <p className="text-gray-900">{formatDate(campaign.updated_at)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bills Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Bills ({campaignBills.length})</h2>
                <button
                  onClick={() => setShowBillsPicker(true)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Items
                </button>
              </div>
            </div>
            <div className="p-6">
              {campaignBills.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No bills added to this campaign</p>
                  <button
                    onClick={() => setShowBillsPicker(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Items
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {campaignBills.map(bill => (
                    <div key={bill.bill_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{bill.bill_number}</div>
                        <div className="text-sm text-gray-600">{bill.title}</div>
                        <div className="text-xs text-gray-500">Status: {bill.status}</div>
                      </div>
                      <button
                        onClick={() => handleRemoveBill(bill.bill_id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Legislators Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Legislators ({campaignLegislators.length})</h2>
                <button
                  onClick={() => setShowLegislatorsPicker(true)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add Items
                </button>
              </div>
            </div>
            <div className="p-6">
              {campaignLegislators.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No legislators added to this campaign</p>
                  <button
                    onClick={() => setShowLegislatorsPicker(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Add Items
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {campaignLegislators.map(person => (
                    <div key={person.people_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-600">
                          {person.chamber} • {person.party} • {person.state}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveLegislator(person.people_id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Order AI Report Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Order AI Report</h2>
            </div>
            <div className="p-6">
              <ReportOrderForm
                campaignBills={campaignBills}
                campaignLegislators={campaignLegislators}
                onSubmit={handleOrderReport}
                isLoading={isLoading}
                errors={reportErrors}
              />
            </div>
          </div>

          {/* Reports Queue and History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Reports ({campaignReports.length})</h2>
            </div>
            <div className="p-6">
              {campaignReports.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reports yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaignReports.map(report => (
                    <ReportRow
                      key={report.report_id}
                      report={report}
                      onView={handleViewReport}
                      onRetry={handleRetryReport}
                      onCancel={handleCancelReport}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Drawers */}
      <TrackedItemsPicker
        isOpen={showBillsPicker || showLegislatorsPicker}
        onClose={() => {
          setShowBillsPicker(false);
          setShowLegislatorsPicker(false);
        }}
        campaignId={campaignId}
        onSuccess={() => {
          // Refresh the campaign data
          window.location.reload();
        }}
      />

      <ReportDetailDrawer
        report={selectedReport}
        isOpen={showReportDetail}
        onClose={() => {
          setShowReportDetail(false);
          setSelectedReport(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Campaign</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete &quot;{campaign.name}&quot;? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isLoading}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
