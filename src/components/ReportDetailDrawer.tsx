"use client";

import { CampaignReport } from "@/types/campaign";
import { bills, people } from "@/data/mockData";

interface ReportDetailDrawerProps {
  report: CampaignReport | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportDetailDrawer({ report, isOpen, onClose }: ReportDetailDrawerProps) {
  if (!report || !isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportTypeLabel = (type: CampaignReport['type']) => {
    const typeLabels = {
      bill_summary: 'Bill Summary',
      fiscal_impact: 'Fiscal Impact',
      compliance_flags: 'Compliance Flags',
      talking_points: 'Talking Points',
      stakeholder_heatmap: 'Stakeholder Heatmap'
    };
    return typeLabels[type];
  };

  const getIncludedBills = () => {
    return bills.filter(bill => report.scope.bill_ids.includes(bill.bill_id));
  };

  const getIncludedLegislators = () => {
    return people.filter(person => report.scope.people_ids.includes(person.people_id));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
      <div className="relative bg-white shadow-xl rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {getReportTypeLabel(report.type)}
            </h2>
            <p className="text-sm text-gray-500">
              Generated {formatDate(report.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Report Metadata */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Report Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 text-gray-900">{getReportTypeLabel(report.type)}</span>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <span className="ml-2 text-gray-900 capitalize">{report.status}</span>
              </div>
            </div>
          </div>

          {/* Included Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Included Items</h3>
            
            {/* Bills */}
            {getIncludedBills().length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Bills ({getIncludedBills().length})</h4>
                <div className="space-y-2">
                  {getIncludedBills().map(bill => (
                    <div key={bill.bill_id} className="p-3 bg-white border border-gray-200 rounded-md">
                      <div className="text-sm font-medium text-gray-900">{bill.bill_number}</div>
                      <div className="text-sm text-gray-600">{bill.title}</div>
                      <div className="text-xs text-gray-500">Status: {bill.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legislators */}
            {getIncludedLegislators().length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Legislators ({getIncludedLegislators().length})</h4>
                <div className="space-y-2">
                  {getIncludedLegislators().map(person => (
                    <div key={person.people_id} className="p-3 bg-white border border-gray-200 rounded-md">
                      <div className="text-sm font-medium text-gray-900">{person.name}</div>
                      <div className="text-sm text-gray-600">
                        {person.chamber} • {person.party} • {person.state}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Report Content */}
          {report.content && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Report Content</h3>
              <div className="space-y-6">
                {report.content.sections.map((section, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="text-md font-medium text-gray-900 mb-2">{section.title}</h4>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder for reports without content */}
          {!report.content && report.status === 'ready' && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">Report content will be generated here</p>
            </div>
          )}

          {/* Status-specific messages */}
          {report.status === 'queued' && (
            <div className="text-center py-8">
              <div className="text-yellow-400 mb-4">
                <svg className="mx-auto h-12 w-12 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500">Report is queued for processing</p>
            </div>
          )}

          {report.status === 'processing' && (
            <div className="text-center py-8">
              <div className="text-blue-400 mb-4">
                <svg className="mx-auto h-12 w-12 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-gray-500">Report is being generated...</p>
            </div>
          )}

          {report.status === 'failed' && (
            <div className="text-center py-8">
              <div className="text-red-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-gray-500">Report generation failed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
