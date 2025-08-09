/**
 * Supabase Data Layer
 * Handles user-specific data: campaigns, tracking, notes
 */

import { supabase } from './supabase';

// Types for database records
export interface UserCampaign {
  id: number;
  user_id: string;
  name: string;
  description?: string;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface UserTrackedBill {
  id: number;
  user_id: string;
  bill_id: string;
  bill_congress?: string;
  bill_type?: string;
  bill_number?: string;
  tracked_at: string;
}

export interface UserTrackedLegislator {
  id: number;
  user_id: string;
  bioguide_id: string;
  tracked_at: string;
}

export interface UserNote {
  id: number;
  user_id: string;
  entity_type: 'bill' | 'legislator';
  entity_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignItem {
  id: number;
  campaign_id: number;
  item_type: 'bill' | 'legislator';
  item_id: string;
  added_at: string;
}

// Campaign Functions
export async function getUserCampaigns(): Promise<UserCampaign[]> {
  const { data, error } = await supabase
    .from('user_campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }

  return data || [];
}

export async function createCampaign(name: string, description?: string): Promise<UserCampaign | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_campaigns')
    .insert({
      user_id: user.id,
      name,
      description,
      status: 'active'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating campaign:', error);
    return null;
  }

  return data;
}

export async function updateCampaign(id: number, updates: Partial<UserCampaign>): Promise<UserCampaign | null> {
  const { data, error } = await supabase
    .from('user_campaigns')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating campaign:', error);
    return null;
  }

  return data;
}

export async function deleteCampaign(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('user_campaigns')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting campaign:', error);
    return false;
  }

  return true;
}

// Bill Tracking Functions
export async function getTrackedBills(): Promise<UserTrackedBill[]> {
  const { data, error } = await supabase
    .from('user_tracked_bills')
    .select('*')
    .order('tracked_at', { ascending: false });

  if (error) {
    console.error('Error fetching tracked bills:', error);
    return [];
  }

  return data || [];
}

export async function trackBill(billId: string, billData?: { congress?: string; type?: string; number?: string }): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  // Check if already tracked
  const { data: existing } = await supabase
    .from('user_tracked_bills')
    .select('id')
    .eq('bill_id', billId)
    .single();

  if (existing) return true; // Already tracked

  const { error } = await supabase
    .from('user_tracked_bills')
    .insert({
      user_id: user.id,
      bill_id: billId,
      bill_congress: billData?.congress,
      bill_type: billData?.type,
      bill_number: billData?.number
    });

  if (error) {
    console.error('Error tracking bill:', error);
    return false;
  }

  return true;
}

export async function untrackBill(billId: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_tracked_bills')
    .delete()
    .eq('bill_id', billId);

  if (error) {
    console.error('Error untracking bill:', error);
    return false;
  }

  return true;
}

// Legislator Tracking Functions
export async function getTrackedLegislators(): Promise<UserTrackedLegislator[]> {
  const { data, error } = await supabase
    .from('user_tracked_legislators')
    .select('*')
    .order('tracked_at', { ascending: false });

  if (error) {
    console.error('Error fetching tracked legislators:', error);
    return [];
  }

  return data || [];
}

export async function trackLegislator(bioguideId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  // Check if already tracked
  const { data: existing } = await supabase
    .from('user_tracked_legislators')
    .select('id')
    .eq('bioguide_id', bioguideId)
    .single();

  if (existing) return true; // Already tracked

  const { error } = await supabase
    .from('user_tracked_legislators')
    .insert({
      user_id: user.id,
      bioguide_id: bioguideId
    });

  if (error) {
    console.error('Error tracking legislator:', error);
    return false;
  }

  return true;
}

export async function untrackLegislator(bioguideId: string): Promise<boolean> {
  const { error } = await supabase
    .from('user_tracked_legislators')
    .delete()
    .eq('bioguide_id', bioguideId);

  if (error) {
    console.error('Error untracking legislator:', error);
    return false;
  }

  return true;
}

// Notes Functions
export async function getUserNotes(entityType?: 'bill' | 'legislator', entityId?: string): Promise<UserNote[]> {
  let query = supabase
    .from('user_notes')
    .select('*')
    .order('created_at', { ascending: false });

  if (entityType) query = query.eq('entity_type', entityType);
  if (entityId) query = query.eq('entity_id', entityId);

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching notes:', error);
    return [];
  }

  return data || [];
}

export async function createNote(
  entityType: 'bill' | 'legislator',
  entityId: string,
  title: string,
  content: string
): Promise<UserNote | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('user_notes')
    .insert({
      user_id: user.id,
      entity_type: entityType,
      entity_id: entityId,
      title,
      content
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating note:', error);
    return null;
  }

  return data;
}

export async function updateNote(id: number, title: string, content: string): Promise<UserNote | null> {
  const { data, error } = await supabase
    .from('user_notes')
    .update({
      title,
      content,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating note:', error);
    return null;
  }

  return data;
}

export async function deleteNote(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('user_notes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting note:', error);
    return false;
  }

  return true;
}

// Campaign Items Functions
export async function getCampaignItems(campaignId: number): Promise<CampaignItem[]> {
  const { data, error } = await supabase
    .from('campaign_items')
    .select('*')
    .eq('campaign_id', campaignId)
    .order('added_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaign items:', error);
    return [];
  }

  return data || [];
}

export async function addItemToCampaign(
  campaignId: number,
  itemType: 'bill' | 'legislator',
  itemId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('campaign_items')
    .insert({
      campaign_id: campaignId,
      item_type: itemType,
      item_id: itemId
    });

  if (error) {
    console.error('Error adding item to campaign:', error);
    return false;
  }

  return true;
}

export async function removeItemFromCampaign(
  campaignId: number,
  itemType: 'bill' | 'legislator',
  itemId: string
): Promise<boolean> {
  const { error } = await supabase
    .from('campaign_items')
    .delete()
    .eq('campaign_id', campaignId)
    .eq('item_type', itemType)
    .eq('item_id', itemId);

  if (error) {
    console.error('Error removing item from campaign:', error);
    return false;
  }

  return true;
}

// Helper function to check if bill is tracked
export async function isBillTracked(billId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_tracked_bills')
    .select('id')
    .eq('bill_id', billId)
    .single();

  return !!data;
}

// Helper function to check if legislator is tracked
export async function isLegislatorTracked(bioguideId: string): Promise<boolean> {
  const { data } = await supabase
    .from('user_tracked_legislators')
    .select('id')
    .eq('bioguide_id', bioguideId)
    .single();

  return !!data;
}
