import { campaigns, user_tracked_legislation, user_tracked_legislators } from "@/data/mockData";

// Mock data storage (in real app, this would be Supabase)
let campaignBills: Array<{ campaign_id: number; bill_id: string; added_at: string }> = [];
let campaignLegislators: Array<{ campaign_id: number; people_id: string; added_at: string }> = [];

// Initialize from localStorage if available
if (typeof window !== 'undefined') {
  const storedCampaignBills = localStorage.getItem('poliux_campaign_bills');
  const storedCampaignLegislators = localStorage.getItem('poliux_campaign_legislators');
  
  if (storedCampaignBills) {
    campaignBills = JSON.parse(storedCampaignBills);
  }
  if (storedCampaignLegislators) {
    campaignLegislators = JSON.parse(storedCampaignLegislators);
  }
}

export function listUserCampaigns() {
  // Get campaigns from localStorage or mock data
  const storedCampaigns = localStorage.getItem('poliux_campaigns');
  const userCampaigns = storedCampaigns ? JSON.parse(storedCampaigns) : [];
  
  // Combine with mock data campaigns
  return [...campaigns, ...userCampaigns].filter(campaign => campaign.owner_id === "u001");
}

export function linkBillToCampaign(campaignId: number, billIds: string[]) {
  const newLinks = billIds.map(billId => ({
    campaign_id: campaignId,
    bill_id: billId,
    added_at: new Date().toISOString()
  }));

  // Remove duplicates
  const existingBillIds = campaignBills
    .filter(cb => cb.campaign_id === campaignId)
    .map(cb => cb.bill_id);
  
  const uniqueNewLinks = newLinks.filter(link => !existingBillIds.includes(link.bill_id));
  
  campaignBills = [...campaignBills, ...uniqueNewLinks];
  
  // Update localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('poliux_campaign_bills', JSON.stringify(campaignBills));
  }
  
  return uniqueNewLinks;
}

export function linkLegislatorToCampaign(campaignId: number, peopleIds: string[]) {
  const newLinks = peopleIds.map(peopleId => ({
    campaign_id: campaignId,
    people_id: peopleId,
    added_at: new Date().toISOString()
  }));

  // Remove duplicates
  const existingPeopleIds = campaignLegislators
    .filter(cl => cl.campaign_id === campaignId)
    .map(cl => cl.people_id);
  
  const uniqueNewLinks = newLinks.filter(link => !existingPeopleIds.includes(link.people_id));
  
  campaignLegislators = [...campaignLegislators, ...uniqueNewLinks];
  
  // Update localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('poliux_campaign_legislators', JSON.stringify(campaignLegislators));
  }
  
  return uniqueNewLinks;
}

export function listTrackedBillsNotInCampaign(campaignId: number) {
  const trackedBillIds = user_tracked_legislation.map(t => t.bill_id);
  const linkedBillIds = campaignBills
    .filter(cb => cb.campaign_id === campaignId)
    .map(cb => cb.bill_id);
  
  return trackedBillIds.filter(billId => !linkedBillIds.includes(billId));
}

export function listTrackedLegislatorsNotInCampaign(campaignId: number) {
  const trackedPeopleIds = user_tracked_legislators.map(t => t.people_id);
  const linkedPeopleIds = campaignLegislators
    .filter(cl => cl.campaign_id === campaignId)
    .map(cl => cl.people_id);
  
  return trackedPeopleIds.filter(peopleId => !linkedPeopleIds.includes(peopleId));
}

export function getCampaignBills(campaignId: number) {
  return campaignBills.filter(cb => cb.campaign_id === campaignId);
}

export function getCampaignLegislators(campaignId: number) {
  return campaignLegislators.filter(cl => cl.campaign_id === campaignId);
}

export function isBillInCampaign(billId: string, campaignId: number) {
  return campaignBills.some(cb => cb.campaign_id === campaignId && cb.bill_id === billId);
}

export function isLegislatorInCampaign(peopleId: string, campaignId: number) {
  return campaignLegislators.some(cl => cl.campaign_id === campaignId && cl.people_id === peopleId);
}

export function getCampaignsForBill(billId: string) {
  const campaignIds = campaignBills
    .filter(cb => cb.bill_id === billId)
    .map(cb => cb.campaign_id);
  
  return listUserCampaigns().filter(campaign => campaignIds.includes(campaign.campaign_id));
}

export function getCampaignsForLegislator(peopleId: string) {
  const campaignIds = campaignLegislators
    .filter(cl => cl.people_id === peopleId)
    .map(cl => cl.campaign_id);
  
  return listUserCampaigns().filter(campaign => campaignIds.includes(campaign.campaign_id));
}
