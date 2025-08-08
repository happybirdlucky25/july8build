"use client";

import { useState } from "react";
import Link from "next/link";

export default function InfoCenter() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", label: "Civic Education", icon: "📚" },
    { id: "voting", label: "Register to Vote", icon: "🗳️" },
    { id: "action", label: "Take Action", icon: "✊" },
    { id: "resources", label: "Resources", icon: "🛠️" },
    { id: "constitution", label: "Constitution", icon: "📜" },
    { id: "federal-register", label: "Federal Register", icon: "📋" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Google AdSense Ad */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5431445907349741"
          data-ad-slot="1234567897"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Info Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your comprehensive resource for civic education, voting information, and government transparency.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sections</h2>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-8">
            {/* Civic Education Overview */}
            {activeSection === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Civic Education Overview</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Understanding how government works is the foundation of effective civic engagement. 
                    Here&apos;s what you need to know about the U.S. legislative process and your role in democracy.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How a Bill Becomes Law</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-2">1. Introduction</h4>
                      <p className="text-blue-800 text-sm">A bill is introduced in either the House or Senate by a member of Congress.</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-900 mb-2">2. Committee Review</h4>
                      <p className="text-green-800 text-sm">The bill is assigned to a committee for detailed study and potential amendments.</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-6">
                      <h4 className="font-semibold text-yellow-900 mb-2">3. Floor Vote</h4>
                      <p className="text-yellow-800 text-sm">The full chamber debates and votes on the bill.</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-6">
                      <h4 className="font-semibold text-purple-900 mb-2">4. Conference & Final Vote</h4>
                      <p className="text-purple-800 text-sm">Both chambers must pass identical versions before sending to the President.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Role in Democracy</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      <span><strong>Stay Informed:</strong> Track legislation that affects your community and interests</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      <span><strong>Contact Representatives:</strong> Share your views on important issues</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      <span><strong>Vote:</strong> Participate in elections at all levels of government</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-3">•</span>
                      <span><strong>Engage Locally:</strong> Attend town halls, join advocacy groups, and volunteer</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Register to Vote */}
            {activeSection === "voting" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Register to Vote</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Voting is your fundamental right and responsibility as a citizen. 
                    Here&apos;s how to register and participate in elections.
                  </p>

                  <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Quick Registration Links</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <a 
                        href="https://vote.gov" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Vote.gov (Federal)
                      </a>
                      <a 
                        href="https://www.usa.gov/voter-registration" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        USA.gov Guide
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Voting Requirements</h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Federal Elections</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• U.S. citizen</li>
                        <li>• 18 years old by Election Day</li>
                        <li>• Resident of your voting district</li>
                        <li>• Not convicted of a felony (varies by state)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">State & Local Elections</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Requirements vary by state</li>
                        <li>• Check your state&apos;s election website</li>
                        <li>• Some states allow same-day registration</li>
                        <li>• Early voting available in most states</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Important Dates</h3>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <p className="text-yellow-800 mb-4">
                      <strong>Note:</strong> Registration deadlines vary by state. Check your state&apos;s requirements well in advance of elections.
                    </p>
                    <p className="text-yellow-800 text-sm">
                      Most states require registration 15-30 days before an election, but some allow same-day registration.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Take Action */}
            {activeSection === "action" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Take Action</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Democracy is not a spectator sport. Here are practical ways to make your voice heard and influence policy.
                  </p>

                  <div className="space-y-8">
                    <div className="border-l-4 border-blue-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Contact Your Representatives</h3>
                      <p className="text-gray-700 mb-4">
                        Direct communication with elected officials is one of the most effective ways to influence policy.
                      </p>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Phone Calls</h4>
                          <p className="text-blue-800 text-sm">Call their office and speak with staff or leave a message.</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Emails & Letters</h4>
                          <p className="text-green-800 text-sm">Write personalized messages about specific issues.</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-900 mb-2">Social Media</h4>
                          <p className="text-purple-800 text-sm">Engage with representatives on platforms like Twitter.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Attend Town Halls & Events</h3>
                      <p className="text-gray-700 mb-4">
                        Face-to-face interaction shows strong engagement and can have lasting impact.
                      </p>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Check your representative&apos;s website for upcoming events</li>
                        <li>• Prepare thoughtful questions in advance</li>
                        <li>• Be respectful and concise when speaking</li>
                        <li>• Follow up with thank you notes</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Join Advocacy Organizations</h3>
                      <p className="text-gray-700 mb-4">
                        Collective action amplifies individual voices and provides resources for effective advocacy.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">National Organizations</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• ACLU (Civil liberties)</li>
                            <li>• Sierra Club (Environment)</li>
                            <li>• NRA (Gun rights)</li>
                            <li>• Planned Parenthood (Healthcare)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Local Groups</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            <li>• Chamber of Commerce</li>
                            <li>• Community associations</li>
                            <li>• Issue-specific coalitions</li>
                            <li>• Political party organizations</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-l-4 border-orange-500 pl-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Testify at Hearings</h3>
                      <p className="text-gray-700 mb-4">
                        Public testimony provides direct input to policymakers and creates public record of your position.
                      </p>
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-900 mb-2">Tips for Effective Testimony</h4>
                        <ul className="text-orange-800 text-sm space-y-1">
                          <li>• Keep it concise (2-3 minutes)</li>
                          <li>• Focus on personal impact and local relevance</li>
                          <li>• Provide specific examples</li>
                          <li>• Practice your delivery</li>
                          <li>• Submit written testimony if you can&apos;t attend</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resources */}
            {activeSection === "resources" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Toolbox & Resources</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Essential tools and resources to help you become a more effective civic advocate.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Government Resources</h3>
                      <div className="space-y-3">
                        <a 
                          href="https://www.congress.gov" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-blue-600">Congress.gov</div>
                          <div className="text-sm text-gray-600">Official source for federal legislation</div>
                        </a>
                        <a 
                          href="https://www.federalregister.gov" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-blue-600">Federal Register</div>
                          <div className="text-sm text-gray-600">Daily journal of government activities</div>
                        </a>
                        <a 
                          href="https://www.usa.gov" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-blue-600">USA.gov</div>
                          <div className="text-sm text-gray-600">Official government information portal</div>
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Advocacy Tools</h3>
                      <div className="space-y-3">
                        <a 
                          href="https://www.change.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-green-600">Change.org</div>
                          <div className="text-sm text-gray-600">Create and sign petitions</div>
                        </a>
                        <a 
                          href="https://www.govtrack.us" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-green-600">GovTrack.us</div>
                          <div className="text-sm text-gray-600">Track Congress and legislation</div>
                        </a>
                        <a 
                          href="https://www.opensecrets.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="font-semibold text-green-600">OpenSecrets</div>
                          <div className="text-sm text-gray-600">Campaign finance and lobbying data</div>
                        </a>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4 mt-8">Downloadable Templates</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Letter Template</h4>
                      <p className="text-blue-800 text-sm mb-3">Professional letter format for contacting representatives</p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Download PDF →
                      </button>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">Testimony Guide</h4>
                      <p className="text-green-800 text-sm mb-3">Step-by-step guide for preparing public testimony</p>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Download PDF →
                      </button>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-900 mb-2">Meeting Checklist</h4>
                      <p className="text-purple-800 text-sm mb-3">Preparation checklist for meetings with officials</p>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        Download PDF →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Constitution */}
            {activeSection === "constitution" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">U.S. Constitution</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    The foundation of American democracy. Read the full text of the U.S. Constitution and understand your rights.
                  </p>

                  <div className="bg-blue-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Quick Access</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Link 
                        href="/constitution"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        Read Full Constitution
                      </Link>
                      <a 
                        href="https://constitution.congress.gov" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Congress.gov Version
                      </a>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Constitutional Concepts</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Separation of Powers</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        The Constitution divides government into three branches: Legislative (Congress), Executive (President), and Judicial (Courts).
                      </p>
                      <p className="text-gray-600 text-xs">
                        Each branch has specific powers and can check the others to prevent abuse of power.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Bill of Rights</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        The first ten amendments protect fundamental rights like free speech, religion, and due process.
                      </p>
                      <p className="text-gray-600 text-xs">
                        These rights apply to all Americans and limit government power over individuals.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Federalism</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        Power is shared between the federal government and state governments.
                      </p>
                      <p className="text-gray-600 text-xs">
                        States have authority over local matters while the federal government handles national issues.
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Popular Sovereignty</h4>
                      <p className="text-gray-700 text-sm mb-3">
                        The government derives its power from the consent of the governed - the people.
                      </p>
                      <p className="text-gray-600 text-xs">
                        This principle is reflected in elections and the right to petition government.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Federal Register Feed */}
            {activeSection === "federal-register" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Federal Register Feed</h2>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 mb-6">
                    Stay updated with the latest federal regulations, notices, and executive orders published in the Federal Register.
                  </p>

                  {/* Placeholder for future Federal Register feed */}
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Federal Register Feed Coming Soon</h3>
                    <p className="text-gray-600 mb-4">
                      We&apos;re working on integrating a live feed from the Federal Register to keep you updated on the latest government activities.
                    </p>
                    <a 
                      href="https://www.federalregister.gov" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Visit Federal Register
                    </a>
                  </div>

                  <div className="mt-8 bg-blue-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">What is the Federal Register?</h3>
                    <p className="text-blue-800 text-sm mb-4">
                      The Federal Register is the official daily publication for rules, proposed rules, and notices of federal agencies and organizations, 
                      as well as executive orders and other presidential documents.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Types of Documents</h4>
                        <ul className="text-blue-800 space-y-1">
                          <li>• Proposed and final rules</li>
                          <li>• Presidential proclamations</li>
                          <li>• Executive orders</li>
                          <li>• Agency notices</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Why It Matters</h4>
                        <ul className="text-blue-800 space-y-1">
                          <li>• Public comment opportunities</li>
                          <li>• Regulatory changes</li>
                          <li>• Policy implementation</li>
                          <li>• Government transparency</li>
                        </ul>
                      </div>
                    </div>
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
