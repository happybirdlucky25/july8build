"use client";

import Link from "next/link";
import Image from "next/image";

interface LegislatorCardProps {
  people_id: string;
  name: string;
  state: string;
  party: string;
  chamber: string;
  role: string;
  img?: string;
}

export default function LegislatorCard({ people_id, name, state, party, chamber, role, img }: LegislatorCardProps) {
  const getPartyColor = (party: string) => {
    switch (party.toLowerCase()) {
      case "democrat":
        return "bg-blue-100 text-blue-800";
      case "republican":
        return "bg-red-100 text-red-800";
      case "independent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Link href={`/legislator/${people_id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            {img ? (
              <Image
                src={img}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-xl font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-600">{role} - {state}</p>
            <p className="text-sm text-gray-600">{chamber}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPartyColor(party)}`}>
              {party}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
