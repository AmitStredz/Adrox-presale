import React from "react";
import { Helmet } from "react-helmet";

function TermsOfUse(props) {
  return (
    <div className="p-5 sm:p-20 bg-gradient-to-br from-[#3D2184] via-[#261046] to-[#3D2184] text-[white]">
      <Helmet>
        <title>Adrox - Terms of Use</title>
      </Helmet>
      <div className="container flex flex-col gap-14 font-mono">
        {/* Header */}
        <div className="header">
          <h1 className="text-4xl font-serif font-bold">Terms of Use</h1>
          {/* <h2 className="text-2xl font-seri font-semibold">Adrox Market</h2> */}
          <p className="text-sm text-slate-400">Terms of use for adroxmarket.com</p>
        </div>

        {/* Contents */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Introduction</span>
            <p className="text-slate-300">
              Welcome to Adroxmarket.com. These Terms of Use ("Terms") govern
              your use of our website and services. By accessing or using Adrox
              Market, you agree to be bound by these Terms, constituting a legal
              agreement between you and Adrox Technologies LTD.
            </p>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              1. Description of Service
            </span>
            <p className="text-slate-300">
              Adrox Market provides a digital platform for the presale of Adrox
              (ADX) coins. Our services enable users to participate in the
              presale, subject to achieving our presale goals.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">2. Disclaimer</span>
            <p className="text-slate-300">
              The content on Adroxmarket.com is for general informational
              purposes only and does not constitute financial, investment,
              legal, or professional advice. All information regarding the ADX
              coin presale is subject to change. Adrox Market operates under
              Adrox Technologies LTD.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              3. Risk Acknowledgement
            </span>
            <p className="text-slate-300">
              Investing in cryptocurrencies carries high risk. You acknowledge
              the volatile nature of ADX coins and that the success of the
              project depends on the presale's outcome. Adrox Market does not
              guarantee specific results or the project's successful launch.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              4. Eligibility and Participation
            </span>
            <p className="text-slate-300">
              To participate in the presale, you must meet eligibility criteria,
              including age and compliance with local laws. You are responsible
              for ensuring legal participation in the presale in your
              jurisdiction.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              5. Limitation of Liability
            </span>
            <p className="text-slate-300">
              Adrox Market, its affiliates, and officers are not liable for any
              losses or damages arising from your use of the website or
              participation in the presale. You agree to indemnify Adrox Market
              against any claims, losses, or expenses resulting from your breach
              of these Terms.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
            
              6. Intellectual Property
            </span>
            <p className="text-slate-300">
              All content on Adroxmarket.com, including text, graphics, logos,
              and images, is the property of Adrox Market or its licensors and
              is protected by copyright and intellectual property laws.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              7. Changes to the Terms
            </span>
            <p className="text-slate-300">
              Adrox Market reserves the right to update these Terms at any time.
              We will notify you of significant changes, and your continued use
              of the website constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold"> 8. Governing Law </span>
            <p className="text-slate-300">
              These Terms are governed by the laws of [Jurisdiction], excluding
              its conflict of law provisions.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">9. Contact Us </span>
            <p className="text-slate-300">
              If you have questions about these Terms, please contact us at
              Support@adroxmarket.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfUse;
