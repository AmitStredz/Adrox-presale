import React from "react";
import { Helmet } from "react-helmet";

function PrivacyPolicy(props) {
  return (
    <div className="p-5 sm:p-20 bg-gradient-to-br from-[#3D2184] via-[#261046] to-[#3D2184] text-[white]">
        <Helmet>
            <title>Adrox - Privacy Policy</title>
        </Helmet>
      <div className="container flex flex-col gap-14 font-mono">
        {/* Header */}
        <div className="header">
          <h1 className="text-4xl font-serif font-bold">Privacy Policy</h1>
          <h2 className="text-2xl font-seri font-semibold text-slate-300">Adrox Market</h2>
          <p className="text-sm text-slate-400">Privacy Policy for adroxmarket.com</p>
        </div>

        {/* Contents */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">1. Introduction</span>
            <p className="text-slate-300">
              Welcome to Adrox Market. We appreciate your presence on our
              platform and are committed to safeguarding and respecting your
              privacy. This Privacy Policy outlines how we collect, use,
              disclose, and protect your information. By using Adrox Market, you
              consent to the practices described in this policy.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              2. Information We Collect
            </span>
            <p className="text-slate-300">
              We collect and process various types of information, including:
            </p>
            <ul className="text-slate-300">
              <li>
                - Personal data that you voluntarily provide to us, such as your
                name, email address, and transaction details.
              </li>
              <li>
                - Automatically collected information through cookies and
                similar technologies, including IP addresses, browser types, and
                browsing behavior on our site.
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              3. Use of Information
            </span>
            <p className="text-slate-300">
              - Automatically collected information through cookies and similar
              technologies, including IP addresses, browser types, and browsing
              behavior on our site.
            </p>
            <ul className="text-slate-300">
              <li>
                - To provide and improve our services, including facilitating
                transactions and providing customer support.
              </li>
              <li>
                - To communicate with you, including sending important updates,
                newsletters, and marketing communications that may be of
                interest to you.
              </li>
              <li>
                - To ensure the security of our platform, prevent fraud, and
                enforce our policies.
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              4. Sharing of Information
            </span>
            <p className="text-slate-300">
              We do not sell or rent your personal data to third parties.
              However, we may share your information with trusted service
              providers who assist us in operating our website, conducting our
              business, or servicing you, provided they agree to keep your
              information confidential.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">5. Security Measures</span>
            <p className="text-slate-300">
              We have implemented technical and organizational measures to
              protect your personal information against accidental loss,
              unauthorized access, use, alteration, or disclosure. However, no
              method of transmission over the Internet or electronic storage is
              completely secure, so we cannot guarantee absolute security.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">6. Your Rights</span>
            <p className="text-slate-300">
              You have certain rights regarding your personal data under
              applicable data protection laws, including the right to access,
              correct, or delete your information. You may also have the right
              to object to or restrict certain types of processing.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              7. Changes to This Policy
            </span>
            <p className="text-slate-300">
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We will notify you of any
              material changes by posting the updated policy on our website and
              updating the "Last Updated" date at the top of the policy.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">8. Contact Us </span>
            <p className="text-slate-300">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at support@Adroxmarket.com.
            </p>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
