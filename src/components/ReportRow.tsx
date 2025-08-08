"use client";

import { CampaignReport } from "@/types/campaign";

interface ReportRowProps {
  report: CampaignReport;
  onView: (report: CampaignReport) => void;
  onRetry: (reportId: string) => void;
  onCancel: (reportId: string) => void;
}

export default function ReportRow({ report, onView, onRetry, onCancel }: ReportRowProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: CampaignReport['status']) => {
    const statusConfig = {
      queued: { color: 'bg-yellow-100 text-yellow-800', label: 'Queued' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'Processing' },
      ready: { color: 'bg-green-100 text-green-800', label: 'Ready' },
      failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
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

  const getScopeSummary = (report: CampaignReport) => {
    const { scope } = report;
    const billCount = scope.bill_ids.length;
    const legislatorCount = scope.people_ids.length;
    
    if (scope.mode === 'all') {
      return 'All campaign items';
    } else {
      const parts = [];
      if (billCount > 0) parts.push(`${billCount} bill${billCount !== 1 ? 's' : ''}`);
      if (legislatorCount > 0) parts.push(`${legislatorCount} legislator${legislatorCount !== 1 ? 's' : ''}`);
      return parts.join(', ') || 'No items selected';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-900">
              {getReportTypeLabel(report.type)}
            </h4>
            {getStatusBadge(report.status)}
          </div>

          {/* Scope Summary */}
          <p className="text-sm text-gray-600 mb-2">
            {getScopeSummary(report)}
          </p>

          {/* Created Time */}
          <p className="text-xs text-gray-500">
            Created {formatDate(report.created_at)}
          </p>
        </div>

        {/* Actions */}
        <div className="ml-4 flex flex-col gap-2">
          {report.status === 'ready' && (
            <button
              onClick={() => onView(report)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View
            </button>
          )}
          
          {report.status === 'failed' && (
            <button
              onClick={() => onRetry(report.report_id)}
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              Retry
            </button>
          )}
          
          {(report.status === 'queued' || report.status === 'processing') && (
            <button
              onClick={() => onCancel(report.report_id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
