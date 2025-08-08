"use client";

import { useState, useMemo } from "react";
import SearchBar from "@/components/SearchBar";
import LegislatorCard from "@/components/LegislatorCard";
import { people } from "@/data/mockData";

export default function SearchLegislators() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter legislators based on search query
  const filteredLegislators = useMemo(() => {
    if (!searchQuery.trim()) return people;
    
    const query = searchQuery.toLowerCase();
    return people.filter(person => 
      person.name.toLowerCase().includes(query) ||
      person.state.toLowerCase().includes(query) ||
      person.party.toLowerCase().includes(query) ||
      person.chamber.toLowerCase().includes(query) ||
      person.role.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
                  {/* Google AdSense Ad */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
              <ins 
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5431445907349741"
                data-ad-slot="1234567892"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
              <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
            </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Search Legislators</h1>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar
          placeholder="Search legislators by name, state, party, or chamber..."
          onSearch={setSearchQuery}
        />
      </div>

      {/* Results */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {searchQuery.trim() ? (
            <>Results for &quot;{searchQuery}&quot; ({filteredLegislators.length} found)</>
          ) : (
            <>All Legislators ({filteredLegislators.length} total)</>
          )}
        </h2>
      </div>

      {/* Legislators Grid */}
      {filteredLegislators.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-500 text-lg">No legislators found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or browse all available legislators.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLegislators.map((legislator) => (
            <LegislatorCard
              key={legislator.people_id}
              people_id={legislator.people_id}
              name={legislator.name}
              state={legislator.state}
              party={legislator.party}
              chamber={legislator.chamber}
              role={legislator.role}
              img={legislator.img}
            />
          ))}
        </div>
      )}
    </div>
  );
}
