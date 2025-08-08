"use client";

import { useState } from "react";
import { CampaignFormData, CampaignValidationErrors } from "@/types/campaign";
import { bills, people, user_tracked_legislation, user_tracked_legislators } from "@/data/mockData";

interface CampaignFormProps {
  initialData?: CampaignFormData;
  onSubmit: (data: CampaignFormData & { selectedBills: string[], selectedLegislators: string[] }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
  errors?: CampaignValidationErrors;
}

export default function CampaignForm({
  initialData = { name: "", description: "" },
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Create Campaign",
  errors = {}
}: CampaignFormProps) {
  const [formData, setFormData] = useState<CampaignFormData>(initialData);
  const [validationErrors, setValidationErrors] = useState<CampaignValidationErrors>({});
  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [selectedLegislators, setSelectedLegislators] = useState<string[]>([]);
  const [billSearch, setBillSearch] = useState("");
  const [legislatorSearch, setLegislatorSearch] = useState("");

  // Get tracked bills and legislators
  const trackedBillIds = user_tracked_legislation.map(t => t.bill_id);
  const trackedLegislatorIds = user_tracked_legislators.map(t => t.people_id);
  
  const trackedBills = bills.filter(bill => trackedBillIds.includes(bill.bill_id));
  const trackedLegislators = people.filter(person => trackedLegislatorIds.includes(person.people_id));

  // Filter bills and legislators based on search
  const filteredBills = trackedBills.filter(bill => 
    bill.title.toLowerCase().includes(billSearch.toLowerCase()) ||
    bill.bill_number.toLowerCase().includes(billSearch.toLowerCase())
  );

  const filteredLegislators = trackedLegislators.filter(legislator =>
    legislator.name.toLowerCase().includes(legislatorSearch.toLowerCase()) ||
    legislator.state.toLowerCase().includes(legislatorSearch.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: CampaignValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Campaign name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Campaign name must be at least 3 characters";
    } else if (formData.name.length > 120) {
      newErrors.name = "Campaign name must be 120 characters or less";
    }

    if (formData.description && formData.description.length > 2000) {
      newErrors.description = "Description must be 2000 characters or less";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        selectedBills,
        selectedLegislators
      });
    }
  };

  const handleInputChange = (field: keyof CampaignFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleBillSelection = (billId: string) => {
    setSelectedBills(prev => 
      prev.includes(billId) 
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  const toggleLegislatorSelection = (legislatorId: string) => {
    setSelectedLegislators(prev => 
      prev.includes(legislatorId) 
        ? prev.filter(id => id !== legislatorId)
        : [...prev, legislatorId]
    );
  };

  const allErrors = { ...validationErrors, ...errors };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Campaign Info */}
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Campaign Information
        </h3>
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Campaign Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              allErrors.name ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter campaign name"
            disabled={isLoading}
          />
          {allErrors.name && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {allErrors.name}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              allErrors.description ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter campaign description (optional)"
            disabled={isLoading}
          />
          {allErrors.description && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {allErrors.description}
            </p>
          )}
          <p className="mt-1 text-sm text-gray-500">
            {formData.description.length}/2000 characters
          </p>
        </div>
      </div>

      {/* Tracked Bills Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Tracked Bills (Optional)
        </h3>
        
        {trackedBills.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm text-gray-600 mb-2">You&apos;re not tracking any bills yet.</p>
            <a href="/tracked" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Go to Tracked Items →
            </a>
          </div>
        ) : (
          <>
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search tracked bills..."
                value={billSearch}
                onChange={(e) => setBillSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Bills List */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
              {filteredBills.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No bills match your search.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredBills.map((bill) => (
                    <label key={bill.bill_id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBills.includes(bill.bill_id)}
                        onChange={() => toggleBillSelection(bill.bill_id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={isLoading}
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{bill.bill_number}</div>
                        <div className="text-sm text-gray-500">{bill.title}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {selectedBills.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedBills.length} bill{selectedBills.length !== 1 ? 's' : ''} selected
              </div>
            )}
          </>
        )}
      </div>

      {/* Tracked Legislators Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
          Tracked Legislators (Optional)
        </h3>
        
        {trackedLegislators.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-sm text-gray-600 mb-2">You&apos;re not tracking any legislators yet.</p>
            <a href="/tracked" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Go to Tracked Items →
            </a>
          </div>
        ) : (
          <>
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search tracked legislators..."
                value={legislatorSearch}
                onChange={(e) => setLegislatorSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              />
            </div>

            {/* Legislators List */}
            <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
              {filteredLegislators.length === 0 ? (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No legislators match your search.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredLegislators.map((legislator) => (
                    <label key={legislator.people_id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLegislators.includes(legislator.people_id)}
                        onChange={() => toggleLegislatorSelection(legislator.people_id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={isLoading}
                      />
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">{legislator.name}</div>
                        <div className="text-sm text-gray-500">{legislator.role} • {legislator.state} • {legislator.party}</div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            
            {selectedLegislators.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedLegislators.length} legislator{selectedLegislators.length !== 1 ? 's' : ''} selected
              </div>
            )}
          </>
        )}
      </div>

      {/* General Error */}
      {allErrors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600" role="alert">
            {allErrors.general}
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Campaign...
            </div>
          ) : (
            submitLabel
          )}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
