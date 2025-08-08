"use client";

import { useState } from "react";
import Link from "next/link";

export default function Constitution() {
  const [activeSection, setActiveSection] = useState("preamble");

  const sections = [
    { id: "preamble", label: "Preamble", short: "We the People..." },
    { id: "article1", label: "Article I", short: "Legislative Branch" },
    { id: "article2", label: "Article II", short: "Executive Branch" },
    { id: "article3", label: "Article III", short: "Judicial Branch" },
    { id: "article4", label: "Article IV", short: "States & Federalism" },
    { id: "article5", label: "Article V", short: "Amendment Process" },
    { id: "article6", label: "Article VI", short: "Supremacy Clause" },
    { id: "article7", label: "Article VII", short: "Ratification" },
    { id: "amendments", label: "Amendments", short: "Bill of Rights & More" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Google AdSense Ad */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5431445907349741"
          data-ad-slot="1234567898"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">U.S. Constitution</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          The supreme law of the United States of America. Read the complete text of the Constitution and its amendments.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Constitution Sections</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{section.short}</div>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a 
                  href="https://constitution.congress.gov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  Congress.gov Version
                </a>
                <a 
                  href="https://www.archives.gov/founding-docs/constitution" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  National Archives
                </a>
                <Link 
                  href="/info-center"
                  className="block text-sm text-blue-600 hover:text-blue-700"
                >
                  Back to Info Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Preamble */}
            {activeSection === "preamble" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">The Preamble</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <p className="text-lg text-blue-900 font-medium leading-relaxed">
                      We the People of the United States, in Order to form a more perfect Union, establish Justice, 
                      insure domestic Tranquility, provide for the common defence, promote the general Welfare, 
                      and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish 
                      this Constitution for the United States of America.
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Understanding the Preamble</h3>
                  <p className="text-gray-700 mb-4">
                    The Preamble sets forth the goals and purposes of the Constitution. It establishes that the government 
                    derives its power from the people and outlines six key objectives:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">1. Form a More Perfect Union</h4>
                      <p className="text-gray-700 text-sm">Create a stronger, more unified nation than the Articles of Confederation.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">2. Establish Justice</h4>
                      <p className="text-gray-700 text-sm">Create a fair legal system for all citizens.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">3. Insure Domestic Tranquility</h4>
                      <p className="text-gray-700 text-sm">Maintain peace and order within the country.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">4. Provide for Common Defence</h4>
                      <p className="text-gray-700 text-sm">Protect the nation from external threats.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">5. Promote General Welfare</h4>
                      <p className="text-gray-700 text-sm">Support the well-being of all citizens.</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">6. Secure Liberty</h4>
                      <p className="text-gray-700 text-sm">Protect individual freedoms for current and future generations.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article I */}
            {activeSection === "article1" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article I - Legislative Branch</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Section 1</h3>
                    <p className="text-blue-800">
                      All legislative Powers herein granted shall be vested in a Congress of the United States, 
                      which shall consist of a Senate and House of Representatives.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Provisions</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">House of Representatives</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• Members elected every 2 years</li>
                        <li>• Must be 25 years old, 7 years a citizen</li>
                        <li>• Representation based on population</li>
                        <li>• Has power of impeachment</li>
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Senate</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• 2 Senators per state</li>
                        <li>• Must be 30 years old, 9 years a citizen</li>
                        <li>• 6-year terms, staggered elections</li>
                        <li>• Has power to try impeachments</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Congressional Powers</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• Tax and spend for general welfare</li>
                        <li>• Regulate interstate commerce</li>
                        <li>• Declare war and raise armies</li>
                        <li>• Establish post offices and roads</li>
                        <li>• Make all laws &quot;necessary and proper&quot;</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2">How a Bill Becomes Law</h4>
                    <p className="text-yellow-800 text-sm">
                      Article I, Section 7 outlines the process: bills must pass both House and Senate, 
                      then be presented to the President for approval or veto. Congress can override a veto with 2/3 majority.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article II */}
            {activeSection === "article2" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article II - Executive Branch</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Section 1</h3>
                    <p className="text-blue-800">
                      The executive Power shall be vested in a President of the United States of America. 
                      He shall hold his Office during the Term of four Years, and, together with the Vice President, 
                      chosen for the same Term, be elected, as follows...
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Presidential Powers & Duties</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Commander in Chief</h4>
                      <p className="text-gray-700 text-sm">
                        The President is the head of the armed forces and can deploy troops, though only Congress can declare war.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Chief Executive</h4>
                      <p className="text-gray-700 text-sm">
                        Enforces federal laws, appoints federal officials, and manages the executive branch.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Chief Diplomat</h4>
                      <p className="text-gray-700 text-sm">
                        Conducts foreign policy, negotiates treaties (with Senate approval), and appoints ambassadors.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Legislative Leader</h4>
                      <p className="text-gray-700 text-sm">
                        Can veto bills, propose legislation, and call special sessions of Congress.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-2">Presidential Requirements</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Natural-born U.S. citizen</li>
                      <li>• At least 35 years old</li>
                      <li>• Resident of the U.S. for at least 14 years</li>
                      <li>• Maximum of two 4-year terms (22nd Amendment)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Article III */}
            {activeSection === "article3" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article III - Judicial Branch</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Section 1</h3>
                    <p className="text-blue-800">
                      The judicial Power of the United States, shall be vested in one supreme Court, 
                      and in such inferior Courts as the Congress may from time to time ordain and establish.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Federal Court System</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Supreme Court</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• Highest court in the land</li>
                        <li>• 9 justices (set by Congress)</li>
                        <li>• Lifetime appointments</li>
                        <li>• Hears appeals and original cases</li>
                      </ul>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Lower Federal Courts</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• District Courts (trial courts)</li>
                        <li>• Circuit Courts of Appeals</li>
                        <li>• Specialized courts (tax, bankruptcy, etc.)</li>
                        <li>• Created and organized by Congress</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Judicial Powers</h4>
                      <ul className="text-gray-700 text-sm mt-2 space-y-1">
                        <li>• Interpret laws and Constitution</li>
                        <li>• Resolve disputes between states</li>
                        <li>• Try cases involving federal law</li>
                        <li>• Judicial review (established by Marbury v. Madison)</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2">Judicial Independence</h4>
                    <p className="text-yellow-800 text-sm">
                      Federal judges serve for life during &quot;good behavior&quot; and their salaries cannot be reduced, 
                      ensuring independence from political pressure.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article IV */}
            {activeSection === "article4" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article IV - States & Federalism</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Section 1</h3>
                    <p className="text-blue-800">
                      Full Faith and Credit shall be given in each State to the public Acts, Records, 
                      and judicial Proceedings of every other State.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Provisions</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Full Faith and Credit</h4>
                      <p className="text-gray-700 text-sm">
                        States must recognize and respect the laws, records, and court decisions of other states.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Privileges and Immunities</h4>
                      <p className="text-gray-700 text-sm">
                        Citizens of each state are entitled to the same rights as citizens of other states.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Extradition</h4>
                      <p className="text-gray-700 text-sm">
                        States must return fugitives from justice to the state where they committed the crime.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">New States</h4>
                      <p className="text-gray-700 text-sm">
                        Congress has power to admit new states and make rules for territories.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-2">Republican Form of Government</h4>
                    <p className="text-green-800 text-sm">
                      The United States guarantees every state a republican form of government and protection against invasion and domestic violence.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article V */}
            {activeSection === "article5" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article V - Amendment Process</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Amendment Process</h3>
                    <p className="text-blue-800">
                      The Congress, whenever two thirds of both Houses shall deem it necessary, shall propose Amendments to this Constitution, 
                      or, on the Application of the Legislatures of two thirds of the several States, shall call a Convention for proposing Amendments...
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Two Methods to Propose Amendments</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Congressional Method</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• 2/3 vote in both House and Senate</li>
                        <li>• Most common method used</li>
                        <li>• 27 of 27 amendments used this method</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Convention Method</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• 2/3 of state legislatures call convention</li>
                        <li>• Never been used successfully</li>
                        <li>• Close to threshold in recent years</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Two Methods to Ratify</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-3">State Legislatures</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• 3/4 of state legislatures approve</li>
                        <li>• Most common ratification method</li>
                        <li>• 26 of 27 amendments used this method</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-3">State Conventions</h4>
                      <ul className="text-green-800 text-sm space-y-1">
                        <li>• 3/4 of states hold conventions</li>
                        <li>• Used only once (21st Amendment)</li>
                        <li>• Repealed Prohibition</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2">Important Limitations</h4>
                    <p className="text-yellow-800 text-sm">
                      No amendment can deprive a state of equal representation in the Senate without its consent, 
                      and the slave trade could not be prohibited before 1808.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article VI */}
            {activeSection === "article6" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article VI - Supremacy Clause</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Section 2 - Supremacy Clause</h3>
                    <p className="text-blue-800">
                      This Constitution, and the Laws of the United States which shall be made in Pursuance thereof; 
                      and all Treaties made, or which shall be made, under the Authority of the United States, 
                      shall be the supreme Law of the Land...
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Provisions</h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Supremacy of Federal Law</h4>
                      <p className="text-gray-700 text-sm mt-2">
                        The Constitution, federal laws, and treaties are the &quot;supreme Law of the Land&quot; and take precedence over state laws.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Oath of Office</h4>
                      <p className="text-gray-700 text-sm mt-2">
                        All federal and state officials must take an oath to support the Constitution, 
                        but no religious test can be required for public office.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900">Debt Assumption</h4>
                      <p className="text-gray-700 text-sm mt-2">
                        The new federal government assumed all debts and obligations of the previous government under the Articles of Confederation.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2">No Religious Test</h4>
                    <p className="text-yellow-800 text-sm">
                      Article VI explicitly prohibits requiring any religious test as a qualification for holding public office, 
                      ensuring religious freedom in government service.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Article VII */}
            {activeSection === "article7" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Article VII - Ratification</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Ratification Process</h3>
                    <p className="text-blue-800">
                      The Ratification of the Conventions of nine States, shall be sufficient for the Establishment 
                      of this Constitution between the States so ratifying the Same.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Historical Context</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Constitutional Convention</h4>
                      <p className="text-gray-700 text-sm">
                        The Constitution was drafted at the Constitutional Convention in Philadelphia from May to September 1787. 
                        It was signed by 39 of the 55 delegates on September 17, 1787.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Ratification Timeline</h4>
                      <ul className="text-gray-700 text-sm space-y-1">
                        <li>• Delaware: December 7, 1787 (1st)</li>
                        <li>• Pennsylvania: December 12, 1787</li>
                        <li>• New Jersey: December 18, 1787</li>
                        <li>• Georgia: January 2, 1788</li>
                        <li>• Connecticut: January 9, 1788</li>
                        <li>• Massachusetts: February 6, 1788</li>
                        <li>• Maryland: April 28, 1788</li>
                        <li>• South Carolina: May 23, 1788</li>
                        <li>• New Hampshire: June 21, 1788 (9th - threshold met)</li>
                        <li>• Virginia: June 25, 1788</li>
                        <li>• New York: July 26, 1788</li>
                        <li>• North Carolina: November 21, 1789</li>
                        <li>• Rhode Island: May 29, 1790 (last)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Federalist Papers</h4>
                      <p className="text-gray-700 text-sm">
                        To support ratification, Alexander Hamilton, James Madison, and John Jay wrote 85 essays 
                        known as the Federalist Papers, explaining and defending the Constitution.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-2">The Constitution Takes Effect</h4>
                    <p className="text-green-800 text-sm">
                      The Constitution officially took effect on March 4, 1789, when the first Congress convened. 
                      George Washington was inaugurated as the first President on April 30, 1789.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Amendments */}
            {activeSection === "amendments" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Amendments to the Constitution</h2>
                <div className="prose max-w-none">
                  <div className="bg-blue-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Bill of Rights (Amendments 1-10)</h3>
                    <p className="text-blue-800">
                      The first ten amendments were ratified in 1791 and protect fundamental individual rights and liberties.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">The Bill of Rights</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-gray-900">1st Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Freedom of religion, speech, press, assembly, and petition</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-gray-900">2nd Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Right to keep and bear arms</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-gray-900">3rd Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">No quartering of soldiers in private homes</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-semibold text-gray-900">4th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Protection against unreasonable searches and seizures</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-gray-900">5th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Due process, double jeopardy, self-incrimination, eminent domain</p>
                    </div>
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-semibold text-gray-900">6th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Right to speedy trial, jury, counsel, confrontation</p>
                    </div>
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-gray-900">7th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Right to jury trial in civil cases</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-gray-900">8th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">No excessive bail, fines, or cruel and unusual punishment</p>
                    </div>
                    <div className="border-l-4 border-teal-500 pl-4">
                      <h4 className="font-semibold text-gray-900">9th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Rights not enumerated are retained by the people</p>
                    </div>
                    <div className="border-l-4 border-cyan-500 pl-4">
                      <h4 className="font-semibold text-gray-900">10th Amendment</h4>
                      <p className="text-gray-700 text-sm mt-1">Powers not delegated to federal government reserved to states</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Other Notable Amendments</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">13th Amendment (1865)</h4>
                      <p className="text-gray-700 text-sm">Abolished slavery and involuntary servitude</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">14th Amendment (1868)</h4>
                      <p className="text-gray-700 text-sm">Citizenship, due process, equal protection</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">15th Amendment (1870)</h4>
                      <p className="text-gray-700 text-sm">Right to vote regardless of race</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">19th Amendment (1920)</h4>
                      <p className="text-gray-700 text-sm">Women&apos;s right to vote</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">22nd Amendment (1951)</h4>
                      <p className="text-gray-700 text-sm">Two-term limit for President</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">26th Amendment (1971)</h4>
                      <p className="text-gray-700 text-sm">Voting age lowered to 18</p>
                    </div>
                  </div>

                  <div className="mt-8 bg-yellow-50 rounded-lg p-6">
                    <h4 className="font-semibold text-yellow-900 mb-2">Living Document</h4>
                    <p className="text-yellow-800 text-sm">
                      The Constitution has been amended 27 times since its ratification. The amendment process ensures 
                      the document can adapt to changing times while maintaining its fundamental principles.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
