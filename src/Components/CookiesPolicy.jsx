import React from "react";
import { Helmet } from "react-helmet";

function CookiesPolicy(props) {
  return (
    <div className="p-20 bg-gradient-to-br from-[#3D2184] via-[#261046] to-[#3D2184] text-[white]">
      <Helmet>
        <title>Adrox - Cookies Policy</title>
      </Helmet>
      <div className="container flex flex-col gap-14 font-mono">
        {/* Header */}
        <div className="header">
          <h1 className="text-4xl font-serif font-bold">Cookies Policy</h1>
          <h2 className="text-2xl font-seri font-semibold text-slate-300">adroxmarket.com</h2>
          <p className="text-sm text-slate-400">
            Step into a faster era of mobile crypto mining with Adrox.{" "}
          </p>
          <p className="text-sm text-slate-400">Cookies Policy for adroxmarket.com</p>
        </div>

        {/* Contents */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col">
            <span className="text-xl font-semibold">1. Introduction</span>
            <p className="text-slate-300">
              Adroxmarket.com ("we", "our", or "us") uses cookies to enhance
              your experience on our website. This Cookie Policy explains how
              and why we use cookies.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">2. What Are Cookies?</span>
            <p className="text-slate-300">
              Cookies are small data files stored on your device that help us
              improve our site and your experience.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">3. Use of Cookies </span>
            <p>We use cookies for the following purposes:</p>
            <ul className="text-slate-300">
              <li>
                - Enhancing User Experience: Cookies allow us to remember your
                preferences and settings, providing you with a more personalized
                experience.
              </li>
              <li>
                - Analytics and Performance: We utilize cookies to collect
                information about how visitors interact with our website. This
                helps us analyze traffic patterns and improve our website in
                order to tailor it to customer needs.
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">4. Your Choices</span>
            <p className="text-slate-300">
              You have the option to accept or decline cookies. Most web
              browsers automatically accept cookies, but you can usually modify
              your browser setting to decline cookies if you prefer. However,
              this may prevent you from taking full advantage of the website.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">
              5. Changes to This Policy{" "}
            </span>
            <p className="text-slate-300">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices and legal requirements. We encourage you
              to review this policy periodically for any updates.
            </p>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-semibold">6. Contact Us </span>
            <p className="text-slate-300">
              If you have any questions about this Cookie Policy or our use of
              cookies, please contact us at Support@adroxmarket.com.
            </p>
          </div>

          <p className="text-slate-300">
          By continuing to use our website, you consent to the use of cookies
            as described in this policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CookiesPolicy;
