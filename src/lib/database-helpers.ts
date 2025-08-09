/**
 * Database helper functions for additional queries
 */

import { supabase } from './supabase';

// User tracking functions
export async function trackBill(userId: string, billId: string, trackingType: string = 'general', notes?: string) {
  const { data, error } = await supabase
    .from('user_tracked_legislation')
    .insert({
      user_id: userId,
      bill_id: billId,
      tracking_type: trackingType,
      notes: notes
    });

  if (error) {
    console.error('Error tracking bill:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function untrackBill(userId: string, billId: string) {
  const { error } = await supabase
    .from('user_tracked_legislation')
    .delete()
    .eq('user_id', userId)
    .eq('bill_id', billId);

  if (error) {
    console.error('Error untracking bill:', error);
    return { success: false, error };
  }

  return { success: true };
}

export async function trackLegislator(userId: string, peopleId: string, trackingType: string = 'general', notes?: string) {
  const { data, error } = await supabase
    .from('user_tracked_legislators')
    .insert({
      user_id: userId,
      people_id: peopleId,
      tracking_type: trackingType,
      notes: notes
    });

  if (error) {
    console.error('Error tracking legislator:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function untrackLegislator(userId: string, peopleId: string) {
  const { error } = await supabase
    .from('user_tracked_legislators')
    .delete()
    .eq('user_id', userId)
    .eq('people_id', peopleId);

  if (error) {
    console.error('Error untracking legislator:', error);
    return { success: false, error };
  }

  return { success: true };
}

// Get user's tracked items
export async function getUserTrackedBills(userId: string) {
  const { data, error } = await supabase
    .from('user_tracked_legislation')
    .select(`
      *,
      bills (*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching tracked bills:', error);
    return [];
  }

  return data || [];
}

export async function getUserTrackedLegislators(userId: string) {
  const { data, error } = await supabase
    .from('user_tracked_legislators')
    .select(`
      *,
      people (*)
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching tracked legislators:', error);
    return [];
  }

  return data || [];
}

// Notes functions
export async function createNote(userId: string, entityType: string, entityId: string, title: string, content: string, tags?: string[]) {
  const { data, error } = await supabase
    .from('user_notes')
    .insert({
      user_id: userId,
      entity_type: entityType,
      entity_id: entityId,
      title: title,
      content: content,
      tags: tags
    });

  if (error) {
    console.error('Error creating note:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function getUserNotes(userId: string, entityType?: string, entityId?: string) {
  let query = supabase
    .from('user_notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (entityType) {
    query = query.eq('entity_type', entityType);
  }

  if (entityId) {
    query = query.eq('entity_id', entityId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching notes:', error);
    return [];
  }

  return data || [];
}

// Bill sponsors
export async function getBillSponsors(billId: string) {
  const { data, error } = await supabase
    .from('sponsors')
    .select(`
      *,
      people (*)
    `)
    .eq('bill_id', billId)
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching bill sponsors:', error);
    return [];
  }

  return data || [];
}

// Bill history
export async function getBillHistory(billId: string) {
  const { data, error } = await supabase
    .from('history')
    .select('*')
    .eq('bill_id', billId)
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching bill history:', error);
    return [];
  }

  return data || [];
}

// Check if user is tracking an item
export async function isTrackingBill(userId: string, billId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_tracked_legislation')
    .select('tracking_id')
    .eq('user_id', userId)
    .eq('bill_id', billId)
    .single();

  return !error && data !== null;
}

export async function isTrackingLegislator(userId: string, peopleId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_tracked_legislators')
    .select('tracking_id')
    .eq('user_id', userId)
    .eq('people_id', peopleId)
    .single();

  return !error && data !== null;
}

// User profile functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data;
}

export async function createUserProfile(userId: string, username: string, displayName?: string) {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      username: username,
      display_name: displayName
    });

  if (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }

  return { success: true, data };
}

export async function updateUserProfile(userId: string, updates: Partial<{
  display_name: string;
  avatar_url: string;
  organization: string;
}>) {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }

  return { success: true, data };
}