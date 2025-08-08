"use client";

import { useState, useEffect, useCallback } from "react";
import { bills, people } from "@/data/mockData";
import { listTrackedBillsNotInCampaign, listTrackedLegislatorsNotInCampaign, linkBillToCampaign, linkLegislatorToCampaign } from "@/utils/campaignUtils";

interface TrackedItemsPickerProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: number;
  onSuccess?: () => void;
}

export default function TrackedItemsPicker({
  isOpen,
  onClose,
  campaignId,
  onSuccess
}: TrackedItemsPickerProps) {
  const [activeTab, setActiveTab] = useState<"bills" | "legislators">("bills");
  const [selectedBillIds, setSelectedBillIds] = useState<string[]>([]);
  const [selectedPeopleIds, setSelectedPeopleIds] = useState<string[]>([]);
  const [billSearch, setBillSearch] = useState("");
  const [legislatorSearch, setLegislatorSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableBillIds, setAvailableBillIds] = useState<string[]>([]);
  const [availablePeopleIds, setAvailablePeopleIds] = useState<string[]>([]);

  const loadAvailableItems = useCallback(() => {
    const availableBills = listTrackedBillsNotInCampaign(campaignId);
    const availableLegislators = listTrackedLegislatorsNotInCampaign(campaignId);
    
    setAvailableBillIds(availableBills);
    setAvailablePeopleIds(availableLegislators);
  }, [campaignId]);

  useEffect(() => {
    if (isOpen) {
      loadAvailableItems();
    }
  }, [isOpen, loadAvailableItems]);

  const availableBills = bills.filter(bill => availableBillIds.includes(bill.bill_id));
  const availableLegislators = people.filter(person => availablePeopleIds.includes(person.people_id));

  const filteredBills = availableBills.filter(bill =>
    bill.title.toLowerCase().includes(billSearch.toLowerCase()) ||
    bill.bill_number.toLowerCase().includes(billSearch.toLowerCase())
  );

  const filteredLegislators = availableLegislators.filter(legislator =>
    legislator.name.toLowerCase().includes(legislatorSearch.toLowerCase()) ||
    legislator.state.toLowerCase().includes(legislatorSearch.toLowerCase())
  );

  const handleBillToggle = (billId: string) => {
    setSelectedBillIds(prev => 
      prev.includes(billId) 
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  const handleLegislatorToggle = (peopleId: string) => {
    setSelectedPeopleIds(prev => 
      prev.includes(peopleId) 
        ? prev.filter(id => id !== peopleId)
        : [...prev, peopleId]
    );
  };

  const handleSelectAllBills = () => {
    if (selectedBillIds.length === filteredBills.length) {
      setSelectedBillIds([]);
    } else {
      setSelectedBillIds(filteredBills.map(bill => bill.bill_id));
    }
  };

  const handleSelectAllLegislators = () => {
    if (selectedPeopleIds.length === filteredLegislators.length) {
      setSelectedPeopleIds([]);
    } else {
      setSelectedPeopleIds(filteredLegislators.map(legislator => legislator.people_id));
    }
  };

  const handleSubmit = async () => {
    if (selectedBillIds.length === 0 && selectedPeopleIds.length === 0) {
      return;
    }

    setIsLoading(true);

    try {
      if (selectedBillIds.length > 0) {
        linkBillToCampaign(campaignId, selectedBillIds);
      }
      
      if (selectedPeopleIds.length > 0) {
        linkLegislatorToCampaign(campaignId, selectedPeopleIds);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to add items to campaign:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedBillIds([]);
    setSelectedPeopleIds([]);
    setBillSearch("");
    setLegislatorSearch("");
    setActiveTab("bills");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Add Tracked Items to Campaign
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Select bills and legislators from your tracked items to add to this campaign
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab("bills")}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === "bills"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Bills ({availableBills.length})
            </button>
            <button
              onClick={() => setActiveTab("legislators")}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                activeTab === "legislators"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Legislators ({availableLegislators.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-96">
          {activeTab === "bills" && (
            <div className="p-6">
              {availableBills.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-gray-500 mb-4">No tracked bills available to add</p>
                  <a
                    href="/tracked"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Go to Tracked Items →
                  </a>
                </div>
              ) : (
                <>
                  {/* Search and Select All */}
                  <div className="mb-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Search bills..."
                      value={billSearch}
                      onChange={(e) => setBillSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {filteredBills.length > 0 && (
                      <button
                        onClick={handleSelectAllBills}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {selectedBillIds.length === filteredBills.length ? "Deselect all" : "Select all"}
                      </button>
                    )}
                  </div>

                  {/* Bills List */}
                  <div className="space-y-2">
                    {filteredBills.map((bill) => (
                      <label
                        key={bill.bill_id}
                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBillIds.includes(bill.bill_id)}
                          onChange={() => handleBillToggle(bill.bill_id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-gray-900">{bill.bill_number}</div>
                          <div className="text-sm text-gray-500">{bill.title}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "legislators" && (
            <div className="p-6">
              {availableLegislators.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-500 mb-4">No tracked legislators available to add</p>
                  <a
                    href="/tracked"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Go to Tracked Items →
                  </a>
                </div>
              ) : (
                <>
                  {/* Search and Select All */}
                  <div className="mb-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Search legislators..."
                      value={legislatorSearch}
                      onChange={(e) => setLegislatorSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {filteredLegislators.length > 0 && (
                      <button
                        onClick={handleSelectAllLegislators}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {selectedPeopleIds.length === filteredLegislators.length ? "Deselect all" : "Select all"}
                      </button>
                    )}
                  </div>

                  {/* Legislators List */}
                  <div className="space-y-2">
                    {filteredLegislators.map((legislator) => (
                      <label
                        key={legislator.people_id}
                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPeopleIds.includes(legislator.people_id)}
                          onChange={() => handleLegislatorToggle(legislator.people_id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex-1">
                          <div className="text-sm font-medium text-gray-900">{legislator.name}</div>
                          <div className="text-sm text-gray-500">{legislator.role} • {legislator.state} • {legislator.party}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedBillIds.length + selectedPeopleIds.length} item{(selectedBillIds.length + selectedPeopleIds.length) !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={(selectedBillIds.length + selectedPeopleIds.length) === 0 || isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add to Campaign"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
