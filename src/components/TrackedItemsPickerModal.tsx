"use client";

import { useState, useMemo } from "react";
import { Bill, Person } from "@/types/mockData";

interface TrackedItemsPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "bills" | "legislators";
  trackedItems: Bill[] | Person[];
  preselectedIds: string[];
  onConfirm: (ids: string[]) => void;
}

export default function TrackedItemsPickerModal({
  isOpen,
  onClose,
  mode,
  trackedItems,
  preselectedIds,
  onConfirm
}: TrackedItemsPickerModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(preselectedIds);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return trackedItems;
    
    const query = searchQuery.toLowerCase();
    return trackedItems.filter(item => {
      if (mode === "bills") {
        const bill = item as Bill;
        return bill.title.toLowerCase().includes(query) || 
               bill.bill_number.toLowerCase().includes(query);
      } else {
        const person = item as Person;
        return person.name.toLowerCase().includes(query) || 
               person.state.toLowerCase().includes(query) ||
               person.party.toLowerCase().includes(query);
      }
    });
  }, [trackedItems, searchQuery, mode]);

  const handleToggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(selectedIds);
    onClose();
  };

  const handleCancel = () => {
    setSelectedIds(preselectedIds);
    setSearchQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Add {mode === "bills" ? "Bills" : "Legislators"} from Tracked
            </h3>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={`Search ${mode === "bills" ? "bills" : "legislators"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Items List */}
          <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-md">
            {filteredItems.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? "No items match your search" : `No tracked ${mode === "bills" ? "bills" : "legislators"} found`}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const id = mode === "bills" ? (item as Bill).bill_id : (item as Person).people_id;
                  const isSelected = selectedIds.includes(id);
                  const isPreselected = preselectedIds.includes(id);

                  return (
                    <div
                      key={id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer ${
                        isPreselected ? "bg-blue-50" : ""
                      }`}
                      onClick={() => !isPreselected && handleToggleItem(id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          disabled={isPreselected}
                          onChange={() => !isPreselected && handleToggleItem(id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex-1">
                          {mode === "bills" ? (
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {(item as Bill).bill_number} - {(item as Bill).title}
                              </div>
                              <div className="text-sm text-gray-500">
                                Status: {(item as Bill).status}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {(item as Person).name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {(item as Person).chamber} • {(item as Person).party} • {(item as Person).state}
                              </div>
                            </div>
                          )}
                          {isPreselected && (
                            <div className="text-xs text-blue-600 mt-1">
                              Already in campaign
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Selected ({selectedIds.filter(id => !preselectedIds.includes(id)).length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
