"use client";

import Header from "../../components/Header";

const PricingPage = () => {
  const pricingTiers = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for individuals who need simple captions.",
      features: [
        "Upload up to 5 videos",
        "Basic captioning",
        "Limited editing tools",
      ],
    },
    {
      name: "Pro",
      price: "$9.99/month",
      description: "Ideal for content creators and professionals.",
      features: [
        "Unlimited video uploads",
        "AI-powered captions",
        "Advanced editing tools",
        "Export in multiple formats",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for businesses and teams.",
      features: [
        "Unlimited everything",
        "Team collaboration",
        "API access",
        "Dedicated support",
      ],
    },
  ];

  return (
    <>
      <Header />
      <section className="bg-white text-gray-900 py-24 flex items-center justify-center">
        <div className="text-center max-w-5xl px-6">
          <h1 className="text-2xl font-extrabold sm:text-5xl leading-tight bg-gradient-to-r from-[#9AE66E] via-gray-900 to-black bg-clip-text text-transparent">
            Choose Your Plan
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-gray-600 sm:text-lg">
            Select the best plan for your captioning needs. Whether you&apos;re
            an individual or a business, we’ve got you covered.
          </p>

          {/* Pricing Tiers */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className="flex flex-col w-full border-2 border-dashed border-gray-300 p-8 rounded-lg text-center min-h-full"
              >
                <h2 className="text-2xl font-semibold mb-3">{tier.name}</h2>
                <p className="text-xl font-bold text-[#9AE66E]">{tier.price}</p>
                <p className="mt-2 text-gray-600">{tier.description}</p>
                <ul className="mt-6 text-gray-700 text-sm space-y-2 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-gray-900 font-bold">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 px-6 py-3 text-sm font-semibold bg-[#9AE66E] text-gray-900 hover:bg-[#82d358] transition rounded-lg">
                  {tier.price === "Free" ? "Get Started" : "Choose Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingPage;
