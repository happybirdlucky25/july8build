// /data/mockData.js

export const bills = [
    {
      bill_id: "hr1234-118",
      bill_number: "H.R.1234",
      title: "Clean Energy Advancement Act",
      description: "A bill to promote clean energy development and reduce carbon emissions.",
      status: "Introduced",
      status_date: "2025-06-12",
      change_hash: "abc123xyz",
      session_id: "118th-congress",
      status_desc: "Bill introduced in House",
      committee_id: "hsif",
      committee: "House Committee on Energy and Commerce",
      last_action_date: "2025-06-14",
      last_action: "Referred to the House Committee on Energy and Commerce",
      url: "https://www.congress.gov/bill/118th-congress/house-bill/1234",
      state_link: null,
      tsv: null,
      full_text: "This bill aims to incentivize renewable energy..."
    },
    {
      bill_id: "s567-118",
      bill_number: "S.567",
      title: "Affordable Housing Expansion Act",
      description: "A bill to provide funding for affordable housing projects nationwide.",
      status: "Passed Senate",
      status_date: "2025-05-10",
      change_hash: "def456uvw",
      session_id: "118th-congress",
      status_desc: "Passed Senate, sent to House",
      committee_id: "ssbk",
      committee: "Senate Committee on Banking, Housing, and Urban Affairs",
      last_action_date: "2025-05-15",
      last_action: "Received in the House",
      url: "https://www.congress.gov/bill/118th-congress/senate-bill/567",
      state_link: null,
      tsv: null,
      full_text: "This legislation allocates federal grants..."
    }
  ];
  
  export const bill_summaries = [
    {
      summary_id: "sum-001",
      bill_id: "hr1234-118",
      summary_type: "AI",
      summary_text: "This bill promotes clean energy by funding renewable projects, offering tax credits, and setting carbon reduction targets.",
      summary_data: null,
      confidence_score: 0.94,
      model_version: "gpt-4o-mini",
      generated_by: null,
      is_verified: false,
      language: "en",
      created_at: "2025-06-12T10:00:00Z",
      updated_at: "2025-06-12T10:00:00Z"
    },
    {
      summary_id: "sum-002",
      bill_id: "s567-118",
      summary_type: "AI",
      summary_text: "This bill expands funding for affordable housing through grants to states and municipalities, prioritizing low-income areas.",
      summary_data: null,
      confidence_score: 0.91,
      model_version: "gpt-4o-mini",
      generated_by: null,
      is_verified: false,
      language: "en",
      created_at: "2025-05-10T14:00:00Z",
      updated_at: "2025-05-10T14:00:00Z"
    }
  ];
  
  export const people = [
    {
      people_id: "p001",
      party: "Democrat",
      chamber: "House",
      state: "CA",
      name: "Jane Doe",
      first_name: "Jane",
      middle_name: null,
      last_name: "Doe",
      party_id: "D",
      role_id: "rep",
      role: "Representative",
      district: "12",
      title: "Rep.",
      phone: "202-555-0123",
      website: "https://doe.house.gov",
      contact_form: "https://doe.house.gov/contact",
      rss_url: null,
      twitter_account: "RepJaneDoe",
      facebook_account: "RepJaneDoe",
      youtube_account: null,
      bluesky_account: null,
      twitch_account: null,
      instagram_account: "repjanedoe",
      tiktok_account: null,
      linkedin_account: null,
      discord_account: null,
      img: "/images/legislators/jane-doe.jpg",
      time_in_office: "2021-present",
      district_number: "12",
      photo_credit: "Official U.S. House photo",
      total_rollcalls: 120,
      votes_cast: 118,
      missed_votes: 2,
      participation_rate: 0.98,
      missed_vote_rate: 0.02,
      primary_bills_sponsored: 8,
      bill_passage_rate: 0.75,
      effectiveness_score: 0.68,
      bipartisan_sponsorship_rate: 0.22,
      avg_opposite_party_cosponsors: 3
    },
    {
      people_id: "p002",
      party: "Republican",
      chamber: "Senate",
      state: "TX",
      name: "John Smith",
      first_name: "John",
      middle_name: null,
      last_name: "Smith",
      party_id: "R",
      role_id: "sen",
      role: "Senator",
      district: null,
      title: "Sen.",
      phone: "202-555-0456",
      website: "https://smith.senate.gov",
      contact_form: "https://smith.senate.gov/contact",
      rss_url: null,
      twitter_account: "SenJohnSmith",
      facebook_account: "SenJohnSmith",
      youtube_account: null,
      bluesky_account: null,
      twitch_account: null,
      instagram_account: "senjohnsmith",
      tiktok_account: null,
      linkedin_account: null,
      discord_account: null,
      img: "/images/legislators/john-smith.jpg",
      time_in_office: "2017-present",
      district_number: null,
      photo_credit: "Official U.S. Senate photo",
      total_rollcalls: 90,
      votes_cast: 88,
      missed_votes: 2,
      participation_rate: 0.978,
      missed_vote_rate: 0.022,
      primary_bills_sponsored: 5,
      bill_passage_rate: 0.6,
      effectiveness_score: 0.55,
      bipartisan_sponsorship_rate: 0.3,
      avg_opposite_party_cosponsors: 5
    }
  ];
  
  export const user_tracked_legislation = [
    {
      tracking_id: "tl-001",
      user_id: "u001",
      bill_id: "hr1234-118",
      tracking_type: "general",
      notes: "Watch for committee hearings",
      alert_preferences: { status_change: true, new_documents: true },
      created_at: "2025-07-01T10:00:00Z",
      updated_at: "2025-07-01T10:00:00Z"
    }
  ];
  
  export const user_tracked_legislators = [
    {
      tracking_id: "tr-001",
      user_id: "u001",
      people_id: "p001",
      tracking_type: "general",
      notes: "Interested in clean energy stance",
      alert_preferences: { new_bills: true, votes: true },
      created_at: "2025-07-02T09:00:00Z",
      updated_at: "2025-07-02T09:00:00Z"
    }
  ];
  
  export const user_notes = [
    {
      note_id: "n001",
      user_id: "u001",
      entity_type: "bill",
      entity_id: "hr1234-118",
      title: "Carbon reduction section",
      content: "Need to review section 4 for feasibility",
      tags: ["energy", "environment"],
      is_private: true,
      created_at: "2025-07-03T12:00:00Z",
      updated_at: "2025-07-03T12:00:00Z"
    }
  ];
  
  export const history = [
    {
      history_id: 1,
      bill_id: "hr1234-118",
      date: "2025-06-12",
      chamber: "House",
      sequence: 1,
      action: "Bill introduced in House"
    },
    {
      history_id: 2,
      bill_id: "hr1234-118",
      date: "2025-06-14",
      chamber: "House",
      sequence: 2,
      action: "Referred to House Committee on Energy and Commerce"
    }
  ];
  
  export const documents = [
    {
      document_id: "doc001",
      bill_id: "hr1234-118",
      document_type: "PDF",
      document_size: 250000,
      document_mime: "application/pdf",
      document_desc: "Full bill text",
      url: "/docs/hr1234-full.pdf",
      state_link: null,
      campaign_id: null
    }
  ];
  
  export const campaigns = [
    {
      campaign_id: 1,
      owner_id: "u001",
      name: "Clean Energy Advocacy",
      description: "Campaign to support clean energy legislation and contact representatives about environmental issues.",
      status: "active",
      created_at: "2025-07-01T10:00:00Z",
      updated_at: "2025-07-01T10:00:00Z"
    },
    {
      campaign_id: 2,
      owner_id: "u001",
      name: "Housing Rights Initiative",
      description: "Advocating for affordable housing policies and supporting related legislation.",
      status: "active",
      created_at: "2025-07-02T14:30:00Z",
      updated_at: "2025-07-02T14:30:00Z"
    },
    {
      campaign_id: 3,
      owner_id: "u001",
      name: "Healthcare Access Campaign",
      description: "Working to improve healthcare access and support healthcare-related bills.",
      status: "archived",
      created_at: "2025-06-15T09:00:00Z",
      updated_at: "2025-06-20T16:45:00Z"
    }
  ];

export const federal_register_items = [
  {
    document_number: "2025-12345",
    title: "Proposed Rule: Clean Air Act Standards",
    doc_type: "Proposed Rule",
    agencies: ["Environmental Protection Agency"],
    publication_date: "2025-07-15",
    comments_close_on: "2025-09-15",
    html_url: "https://www.federalregister.gov/documents/2025/07/15/2025-12345",
    pdf_url: "https://www.federalregister.gov/documents/2025/07/15/2025-12345.pdf",
    regulations_gov_url: "https://www.regulations.gov/document/EPA-HQ-OAR-2025-0123",
    is_significant: true
  },
  {
    document_number: "2025-12346",
    title: "Notice: Housing and Urban Development Grant Programs",
    doc_type: "Notice",
    agencies: ["Housing and Urban Development Department"],
    publication_date: "2025-07-14",
    comments_close_on: null,
    html_url: "https://www.federalregister.gov/documents/2025/07/14/2025-12346",
    pdf_url: "https://www.federalregister.gov/documents/2025/07/14/2025-12346.pdf",
    regulations_gov_url: null,
    is_significant: false
  }
];
  
export const campaign_bills = [
  {
    campaign_id: 1,
    bill_id: "hr1234-118",
    added_at: "2025-07-01T10:30:00Z"
  },
  {
    campaign_id: 1,
    bill_id: "s567-118",
    added_at: "2025-07-01T11:15:00Z"
  },
  {
    campaign_id: 2,
    bill_id: "hr1234-118",
    added_at: "2025-07-02T14:45:00Z"
  }
];

export const campaign_legislators = [
  {
    campaign_id: 1,
    people_id: "p001",
    added_at: "2025-07-01T10:45:00Z"
  },
  {
    campaign_id: 1,
    people_id: "p002",
    added_at: "2025-07-01T11:00:00Z"
  },
  {
    campaign_id: 2,
    people_id: "p001",
    added_at: "2025-07-02T15:00:00Z"
  }
];

export const campaign_reports = [
  {
    report_id: "r001",
    campaign_id: 1,
    type: "bill_summary",
    scope: {
      mode: "all",
      bill_ids: ["hr1234-118", "s567-118"],
      people_ids: ["p001", "p002"]
    },
    prompt: "Provide a comprehensive summary of the key provisions and potential impacts",
    deadline: "2025-07-10T17:00:00Z",
    sensitivity: "public",
    status: "ready",
    created_at: "2025-07-01T12:00:00Z",
    updated_at: "2025-07-01T12:03:00Z",
    content: {
      sections: [
        {
          title: "Executive Summary",
          content: "This report analyzes two key pieces of legislation: the Clean Energy Advancement Act (H.R.1234) and the Affordable Housing Expansion Act (S.567). Both bills represent significant policy initiatives in their respective domains."
        },
        {
          title: "Key Provisions",
          content: "The Clean Energy Advancement Act focuses on renewable energy incentives and carbon reduction targets. The Affordable Housing Expansion Act provides federal funding for housing projects in low-income areas."
        },
        {
          title: "Potential Impacts",
          content: "These bills could significantly impact energy policy and housing accessibility across the nation, with particular benefits for underserved communities."
        }
      ]
    }
  },
  {
    report_id: "r002",
    campaign_id: 1,
    type: "fiscal_impact",
    scope: {
      mode: "selected",
      bill_ids: ["hr1234-118"],
      people_ids: ["p001"]
    },
    prompt: "Analyze the fiscal implications and budget impact",
    deadline: null,
    sensitivity: "internal",
    status: "processing",
    created_at: "2025-07-01T14:00:00Z",
    updated_at: "2025-07-01T14:01:00Z"
  },
  {
    report_id: "r003",
    campaign_id: 2,
    type: "talking_points",
    scope: {
      mode: "custom",
      bill_ids: ["hr1234-118"],
      people_ids: []
    },
    prompt: "Generate talking points for advocacy efforts",
    deadline: "2025-07-15T17:00:00Z",
    sensitivity: "public",
    status: "queued",
    created_at: "2025-07-02T16:00:00Z",
    updated_at: "2025-07-02T16:00:00Z"
  }
];
  
