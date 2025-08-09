/**
 * Congressional Data API
 * This provides congressional data from Supabase database
 */

import { supabase } from './supabase';

// Database types based on the schema
export interface Bill {
  bill_id: string;
  bill_number: string | null;
  title: string | null;
  description: string | null;
  status: string | null;
  status_date: string | null;
  session_id: string | null;
  committee: string | null;
  last_action: string | null;
  last_action_date: string | null;
  url: string | null;
  full_text: string | null;
  committee_id: string | null;
  status_desc: string | null;
  state_link: string | null;
  change_hash: string | null;
}

// Legacy interface for compatibility
export interface CongressBill {
  bill_id: string;
  bill_number: string;
  title: string;
  description: string;
  status: string;
  status_date: string;
  session_id: string;
  committee: string;
  last_action: string;
  last_action_date: string;
  url: string;
  full_text: string;
}

// Database types based on the schema
export interface Person {
  people_id: string;
  party: string | null;
  chamber: string | null;
  state: string | null;
  name: string | null;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  party_id: string | null;
  role_id: string | null;
  role: string | null;
  district: string | null;
  title: string | null;
  phone: string | null;
  website: string | null;
  contact_form: string | null;
  rss_url: string | null;
  twitter_account: string | null;
  facebook_account: string | null;
  youtube_account: string | null;
  bluesky_account: string | null;
  twitch_account: string | null;
  instagram_account: string | null;
  tiktok_account: string | null;
  linkedin_account: string | null;
  discord_account: string | null;
  img: string | null;
  time_in_office: string | null;
  district_number: string | null;
  photo_credit: string | null;
  total_rollcalls: number | null;
  votes_cast: number | null;
  missed_votes: number | null;
  participation_rate: number | null;
  missed_vote_rate: number | null;
  primary_bills_sponsored: number | null;
  bill_passage_rate: number | null;
  effectiveness_score: number | null;
  bipartisan_sponsorship_rate: number | null;
  avg_opposite_party_cosponsors: number | null;
}

// Legacy interface for compatibility
export interface CongressMember {
  people_id: string;
  name: string;
  party: string;
  state: string;
  chamber: string;
  role: string;
  district: string;
  bio_url: string;
  photo_url: string;
}


// Helper function to convert database Bill to legacy CongressBill format
function convertToCongressBill(bill: Bill): CongressBill {
  return {
    bill_id: bill.bill_id,
    bill_number: bill.bill_number || '',
    title: bill.title || '',
    description: bill.description || '',
    status: bill.status || '',
    status_date: bill.status_date || '',
    session_id: bill.session_id || '',
    committee: bill.committee || '',
    last_action: bill.last_action || '',
    last_action_date: bill.last_action_date || '',
    url: bill.url || '',
    full_text: bill.full_text || ''
  };
}

// Helper function to convert database Person to legacy CongressMember format
function convertToCongressMember(person: Person): CongressMember {
  return {
    people_id: person.people_id,
    name: person.name || '',
    party: person.party || '',
    state: person.state || '',
    chamber: person.chamber || '',
    role: person.role || person.title || '',
    district: person.district || person.district_number || '',
    bio_url: person.website || '',
    photo_url: person.img || ''
  };
}

// Search bills function
export async function searchBills(query: string, limit: number = 50): Promise<CongressBill[]> {
  try {
    let supabaseQuery = supabase
      .from('bills')
      .select('*')
      .limit(limit);

    if (query.trim()) {
      // Use text search on title, description, and bill_number
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%,bill_number.ilike.%${query}%,full_text.ilike.%${query}%`);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error('Error searching bills:', error);
      return [];
    }

    return (data || []).map(convertToCongressBill);
  } catch (error) {
    console.error('Error searching bills:', error);
    return [];
  }
}

// Search legislators function
export async function searchLegislators(query: string, limit: number = 50): Promise<CongressMember[]> {
  try {
    let supabaseQuery = supabase
      .from('people')
      .select('*')
      .limit(limit);

    if (query.trim()) {
      // Use text search on name, party, state, chamber, and role
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,party.ilike.%${query}%,state.ilike.%${query}%,chamber.ilike.%${query}%,role.ilike.%${query}%`);
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error('Error searching legislators:', error);
      return [];
    }

    return (data || []).map(convertToCongressMember);
  } catch (error) {
    console.error('Error searching legislators:', error);
    return [];
  }
}

// Fetch recent bills function
export async function fetchRecentBills(limit: number = 20): Promise<CongressBill[]> {
  try {
    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .order('status_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent bills:', error);
      return [];
    }

    return (data || []).map(convertToCongressBill);
  } catch (error) {
    console.error('Error fetching recent bills:', error);
    return [];
  }
}

// Fetch current congress members
export async function fetchCurrentCongress(): Promise<CongressMember[]> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching congress members:', error);
      return [];
    }

    return (data || []).map(convertToCongressMember);
  } catch (error) {
    console.error('Error fetching congress members:', error);
    return [];
  }
}

// Get bill by ID
export async function getBillById(billId: string): Promise<CongressBill | null> {
  try {
    const { data, error } = await supabase
      .from('bills')
      .select('*')
      .eq('bill_id', billId)
      .single();

    if (error) {
      console.error('Error fetching bill by ID:', error);
      return null;
    }

    return data ? convertToCongressBill(data) : null;
  } catch (error) {
    console.error('Error fetching bill by ID:', error);
    return null;
  }
}

// Get legislator by ID
export async function getLegislatorById(peopleId: string): Promise<CongressMember | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('people_id', peopleId)
      .single();

    if (error) {
      console.error('Error fetching legislator by ID:', error);
      return null;
    }

    return data ? convertToCongressMember(data) : null;
  } catch (error) {
    console.error('Error fetching legislator by ID:', error);
    return null;
  }
}
