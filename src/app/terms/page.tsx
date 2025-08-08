"use client";

import Link from "next/link";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Google AdSense Ad */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5431445907349741"
          data-ad-slot="1234567899"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-xl text-gray-600">
          Please read these terms carefully before using PoliUX.
        </p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="prose max-w-none">
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Effective Date:</strong> [Insert Date]<br />
              <strong>Entity:</strong> Franklin Graystone LLC (&quot;PoliUX,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;)
            </p>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the PoliUX legislative tracking and analysis platform, 
            including our website, mobile applications, and related services (collectively, the &quot;Services&quot;).
          </p>

          <p className="text-gray-700 mb-8">
            By creating an account or using the Services, you agree to these Terms. If you do not agree, do not use the Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Eligibility</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• You must be at least 18 years old to use the Services.</li>
            <li>• You must have the authority to agree to these Terms if you are using the Services on behalf of an organization.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accounts and Security</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• You are responsible for maintaining the confidentiality of your login credentials.</li>
            <li>• You are responsible for all activity under your account.</li>
            <li>• Notify us immediately of any unauthorized access or security breach.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Features</h2>
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Tier</h3>
              <p className="text-gray-700">Search and view bills and legislators, read summaries, and access public resources.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Paid Tier</h3>
              <p className="text-gray-700">All free features plus campaign creation, tracked bills and legislators, AI-generated reports, stakeholder management, and advanced analytics.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Generated Content</h3>
              <p className="text-gray-700">AI summaries, reports, and analysis are generated automatically from third-party models (e.g., OpenAI, Anthropic). We make no guarantee of accuracy or completeness.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feeds and Data Sources</h3>
              <p className="text-gray-700">Legislative and regulatory data is sourced from third-party providers (e.g., LegiScan, Federal Register, Congress.gov). Availability and accuracy depend on those providers.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Subscriptions and Payments</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• Paid features require an active subscription, billed via Stripe.</li>
            <li>• Prices and features are subject to change with notice.</li>
            <li>• All fees are non-refundable except where required by law.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Acceptable Use</h2>
          <p className="text-gray-700 mb-3">You agree not to:</p>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• Use the Services for unlawful purposes or in violation of applicable laws.</li>
            <li>• Interfere with or disrupt the Services.</li>
            <li>• Reverse engineer, scrape, or extract data without permission.</li>
            <li>• Upload or share malicious code or harmful content.</li>
            <li>• Use AI-generated content as sole factual authority for legal, financial, or policy decisions.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• All content and software in the Services are owned by Franklin Graystone LLC or our licensors.</li>
            <li>• You may not reproduce, distribute, or create derivative works without our written permission.</li>
            <li>• You retain ownership of content you upload, but grant us a license to store, process, and display it for the operation of the Services.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Disclaimers</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• The Services are provided &quot;as is&quot; without warranties of any kind.</li>
            <li>• We do not guarantee that legislative or regulatory information is complete, accurate, or up to date.</li>
            <li>• AI-generated content may contain errors and should be independently verified.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            To the maximum extent permitted by law, Franklin Graystone LLC is not liable for any indirect, incidental, 
            consequential, or punitive damages arising from your use of the Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• You may stop using the Services at any time.</li>
            <li>• We may suspend or terminate your account if you violate these Terms.</li>
            <li>• Upon termination, your right to use the Services ends immediately.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to the Terms</h2>
          <p className="text-gray-700 mb-6">
            We may update these Terms from time to time. Changes will be posted with a revised &quot;Effective Date.&quot; 
            Continued use of the Services means you accept the updated Terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law and Dispute Resolution</h2>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• These Terms are governed by the laws of the State of Illinois, without regard to conflict of laws.</li>
            <li>• Any dispute will be resolved through binding arbitration in Cook County, Illinois, unless otherwise required by law.</li>
          </ul>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <p className="text-gray-700 text-sm">
              If you have any questions about these Terms of Service, please contact us at [Insert Contact Email].
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
