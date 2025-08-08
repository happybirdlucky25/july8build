export type Campaign = {
  campaign_id: number;
  owner_id: string;
  name: string;
  description: string | null;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
};

export type CampaignFormData = {
  name: string;
  description: string;
};

export type CampaignValidationErrors = {
  name?: string;
  description?: string;
  general?: string;
};

export type CampaignBill = {
  campaign_id: number;
  bill_id: string;
  added_at: string;
};

export type CampaignLegislator = {
  campaign_id: number;
  people_id: string;
  added_at: string;
};

export type ReportScope = {
  mode: 'all' | 'custom';
  bill_ids: string[];
  people_ids: string[];
};

export type CampaignReport = {
  report_id: string;
  campaign_id: number;
  type: 'bill_summary' | 'fiscal_impact' | 'compliance_flags' | 'talking_points' | 'stakeholder_heatmap';
  scope: ReportScope;
  prompt?: string;
  deadline?: string;
  sensitivity?: 'internal' | 'public';
  status: 'queued' | 'processing' | 'ready' | 'failed';
  created_at: string;
  updated_at: string;
  content?: {
    sections: Array<{
      title: string;
      content: string;
    }>;
  };
};

export type ReportOrderFormData = {
  type: CampaignReport['type'];
  scope: ReportScope;
};

export type ReportOrderValidationErrors = {
  type?: string;
  scope?: string;
  general?: string;
};
