"use client";

import Link from "next/link";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Google AdSense Ad */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5431445907349741"
          data-ad-slot="1234567900"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </div>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-xl text-gray-600">
          How we collect, use, and protect your information.
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
            This Privacy Policy explains how PoliUX collects, uses, discloses, and safeguards your information when you use our 
            legislative tracking and analysis platform, including our website, mobile applications, and related services 
            (collectively, the &quot;Services&quot;).
          </p>

          <p className="text-gray-700 mb-8">
            By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-3">a. Information You Provide</h3>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, password, subscription status, payment details (processed via Stripe).</li>
            <li><strong>Profile Details:</strong> Optional demographic or organizational info you choose to share.</li>
            <li><strong>Campaign Data:</strong> Bills, legislators, stakeholders, documents, and notes you track or upload.</li>
            <li><strong>Communications:</strong> Emails, messages, or support requests sent to us.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">b. Information Collected Automatically</h3>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li><strong>Usage Data:</strong> Pages viewed, searches performed, features used, and actions taken.</li>
            <li><strong>Device Data:</strong> IP address, browser type, operating system, and device identifiers.</li>
            <li><strong>Cookies & Similar Technologies:</strong> Session cookies, analytics cookies, and functional cookies.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3">c. Third-Party Data</h3>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>Legislative, regulatory, and news data from third-party APIs (e.g., LegiScan, Federal Register, Congress.gov).</li>
            <li>Payment data from Stripe (we do not store your full payment details).</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-3">We use your information to:</p>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• Provide, maintain, and improve the Services.</li>
            <li>• Authenticate your identity and secure your account.</li>
            <li>• Process payments and manage subscriptions.</li>
            <li>• Store and manage your tracked items, campaigns, and documents.</li>
            <li>• Generate AI-based reports and analysis you request.</li>
            <li>• Personalize content, feeds, and recommendations.</li>
            <li>• Send notifications, updates, and service-related communications.</li>
            <li>• Monitor usage, prevent fraud, and ensure legal compliance.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
          <p className="text-gray-700 mb-3">We do not sell your personal information. We may share your information:</p>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li><strong>With Service Providers:</strong> Including Supabase (hosting, authentication), Stripe (payments), OpenAI/Claude (AI report generation), and email/SMS providers.</li>
            <li><strong>With Your Consent:</strong> When you choose to share campaign data or reports with others.</li>
            <li><strong>For Legal Reasons:</strong> If required by law, subpoena, or legal process, or to protect our rights, safety, or users.</li>
            <li><strong>In a Business Transfer:</strong> If we merge, sell, or transfer assets, your data may be included.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Retention</h2>
          <p className="text-gray-700 mb-6">
            We keep your personal information as long as your account is active or as needed for the purposes described in this policy. 
            You can request deletion at any time (see Section 8).
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Security</h2>
          <p className="text-gray-700 mb-6">
            We use encryption, access controls, and other safeguards to protect your information. No method of transmission or storage 
            is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700 mb-3">Depending on your location, you may have the right to:</p>
          <ul className="text-gray-700 mb-6 space-y-2">
            <li>• Access, update, or delete your personal information.</li>
            <li>• Request a copy of your data in a portable format.</li>
            <li>• Withdraw consent to certain processing.</li>
            <li>• Opt out of marketing communications.</li>
          </ul>
          <p className="text-gray-700 mb-6">
            To exercise these rights, contact us at [Insert Contact Email].
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700 mb-6">
            We use cookies to operate the Services, remember preferences, analyze usage, and improve performance. 
            You can control cookies through your browser settings.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
          <p className="text-gray-700 mb-6">
            PoliUX is not intended for children under 13. We do not knowingly collect data from children under 13.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
          <p className="text-gray-700 mb-6">
            If you access the Services from outside the United States, your data may be transferred to and processed in the United States.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
          <p className="text-gray-700 mb-6">
            We may update this Privacy Policy from time to time. Changes will be posted with a revised &quot;Effective Date.&quot; 
            Your continued use of the Services means you accept the changes.
          </p>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
            <p className="text-gray-700 text-sm">
              If you have any questions about this Privacy Policy, please contact us at [Insert Contact Email].
            </p>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <Link 
              href="/terms"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
