"use client";

import { useState } from "react";
import { ReportOrderFormData, ReportOrderValidationErrors, CampaignReport } from "@/types/campaign";
import { Bill, Person } from "@/types/mockData";

interface ReportOrderFormProps {
  campaignBills: Bill[];
  campaignLegislators: Person[];
  onSubmit: (data: ReportOrderFormData) => void;
  isLoading?: boolean;
  errors?: ReportOrderValidationErrors;
}

const REPORT_TYPES = [
  { value: 'bill_summary', label: 'Bill Summary' },
  { value: 'fiscal_impact', label: 'Fiscal Impact' },
  { value: 'compliance_flags', label: 'Compliance Flags' },
  { value: 'talking_points', label: 'Talking Points' },
  { value: 'stakeholder_heatmap', label: 'Stakeholder Heatmap' }
] as const;

export default function ReportOrderForm({
  campaignBills,
  campaignLegislators,
  onSubmit,
  isLoading = false,
  errors = {}
}: ReportOrderFormProps) {
  const [formData, setFormData] = useState<ReportOrderFormData>({
    type: 'bill_summary',
    scope: {
      mode: 'all',
      bill_ids: [],
      people_ids: []
    }
  });

  const [validationErrors, setValidationErrors] = useState<ReportOrderValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ReportOrderValidationErrors = {};

    if (!formData.type) {
      newErrors.type = "Report type is required";
    }

    // Validate scope
    if (formData.scope.mode === 'custom') {
      if (formData.scope.bill_ids.length === 0 && formData.scope.people_ids.length === 0) {
        newErrors.scope = "Please select at least one bill or legislator";
      }
    } else if (campaignBills.length === 0 && campaignLegislators.length === 0) {
      newErrors.scope = "No bills or legislators in campaign. Please add items first or choose Custom selection.";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleScopeModeChange = (mode: 'all' | 'custom') => {
    setFormData(prev => ({
      ...prev,
      scope: {
        mode,
        bill_ids: mode === 'all' ? campaignBills.map(b => b.bill_id) : [],
        people_ids: mode === 'all' ? campaignLegislators.map(p => p.people_id) : []
      }
    }));
  };

  const handleCustomSelectionChange = (type: 'bills' | 'legislators', ids: string[]) => {
    setFormData(prev => ({
      ...prev,
      scope: {
        ...prev.scope,
        [type === 'bills' ? 'bill_ids' : 'people_ids']: ids
      }
    }));
  };

  const allErrors = { ...validationErrors, ...errors };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Report Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Report Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as CampaignReport['type'] }))}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            allErrors.type ? "border-red-300" : "border-gray-300"
          }`}
          disabled={isLoading}
        >
          {REPORT_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {allErrors.type && (
          <p className="mt-1 text-sm text-red-600">{allErrors.type}</p>
        )}
      </div>

      {/* Scope Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Scope *
        </label>
        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="radio"
              id="scope-all"
              name="scope"
              value="all"
              checked={formData.scope.mode === 'all'}
              onChange={() => handleScopeModeChange('all')}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="scope-all" className="ml-2 text-sm text-gray-700">
              Include all campaign bills and legislators
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="scope-custom"
              name="scope"
              value="custom"
              checked={formData.scope.mode === 'custom'}
              onChange={() => handleScopeModeChange('custom')}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label htmlFor="scope-custom" className="ml-2 text-sm text-gray-700">
              Custom selection
            </label>
          </div>
        </div>
        {allErrors.scope && (
          <p className="mt-1 text-sm text-red-600">{allErrors.scope}</p>
        )}
      </div>

      {/* Custom Selection */}
      {formData.scope.mode === 'custom' && (
        <div className="space-y-4 p-4 bg-gray-50 rounded-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bills ({formData.scope.bill_ids.length} selected)
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md bg-white">
              {campaignBills.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">No bills in campaign</div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {campaignBills.map(bill => (
                    <div key={bill.bill_id} className="flex items-center p-3">
                      <input
                        type="checkbox"
                        id={`bill-${bill.bill_id}`}
                        checked={formData.scope.bill_ids.includes(bill.bill_id)}
                        onChange={(e) => {
                          const newIds = e.target.checked
                            ? [...formData.scope.bill_ids, bill.bill_id]
                            : formData.scope.bill_ids.filter(id => id !== bill.bill_id);
                          handleCustomSelectionChange('bills', newIds);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`bill-${bill.bill_id}`} className="ml-2 text-sm text-gray-700">
                        {bill.bill_number} - {bill.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legislators ({formData.scope.people_ids.length} selected)
            </label>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md bg-white">
              {campaignLegislators.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">No legislators in campaign</div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {campaignLegislators.map(person => (
                    <div key={person.people_id} className="flex items-center p-3">
                      <input
                        type="checkbox"
                        id={`person-${person.people_id}`}
                        checked={formData.scope.people_ids.includes(person.people_id)}
                        onChange={(e) => {
                          const newIds = e.target.checked
                            ? [...formData.scope.people_ids, person.people_id]
                            : formData.scope.people_ids.filter(id => id !== person.people_id);
                          handleCustomSelectionChange('legislators', newIds);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`person-${person.people_id}`} className="ml-2 text-sm text-gray-700">
                        {person.name} ({person.chamber}, {person.party}, {person.state})
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Ordering Report...
            </div>
          ) : (
            'Order Report'
          )}
        </button>
      </div>
    </form>
  );
}
