import React from 'react';
import { ArrowLeft, Star, Check, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Pricing() {
  const { theme } = useTheme();
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        '25 transcripts per day',
        'Basic transcript extraction',
        'Standard support',
        'Community access'
      ],
      limitations: [
        'No bulk processing',
        'No API access',
        'Limited language support'
      ],
      popular: false,
      buttonText: 'Get Started Free',
      buttonStyle: 'secondary'
    },
    {
      name: 'Hobby',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'Perfect for individual creators',
      features: [
        '1000 transcripts per month',
        'Bulk transcripts',
        'API access',
        'Email support',
        'Chat with transcript',
        'All languages supported',
        'Priority processing'
      ],
      limitations: [],
      popular: true,
      buttonText: 'Login to continue',
      buttonStyle: 'primary'
    },
    {
      name: 'Pro',
      price: { monthly: 24.99, yearly: 249.99 },
      description: 'For professionals and small teams',
      features: [
        '3000 transcripts per month',
        'Bulk transcripts',
        'API access',
        'Email and chat support',
        'Chat with transcript',
        'All languages supported',
        'Priority processing',
        'Advanced analytics',
        'Team collaboration'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Login to continue',
      buttonStyle: 'primary'
    },
    {
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'Custom solution for your business',
      features: [
        '+3000 transcripts per month',
        'Bulk transcripts',
        'API access',
        'Customizations',
        'Live support',
        'All languages supported',
        'Priority processing',
        'Advanced analytics',
        'Team collaboration',
        'Custom integrations',
        'SLA guarantee'
      ],
      limitations: [],
      popular: false,
      buttonText: 'Contact Sales',
      buttonStyle: 'secondary'
    }
  ];

  return (
    <div className={`min-h-screen ${
      theme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0f172a] text-white'
    }`}>
      {/* Header */}
      <div className={`border-b ${
        theme === 'light' ? 'border-gray-200' : 'border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => window.history.back()}
            className={`flex items-center gap-2 ${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className={`ml-2 ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              4.6/5 from 5800+ satisfied users
            </span>
          </div>

          {/* Billing Toggle */}
          <div className={`inline-flex rounded-full p-1 ${
            theme === 'light' ? 'bg-gray-100' : 'bg-white/10'
          }`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#ff4571] text-white shadow-sm'
                  : theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-[#ff4571] text-white shadow-sm'
                  : theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'border-2 border-[#ff4571] bg-gradient-to-b from-[#ff4571]/5 to-transparent'
                  : theme === 'light'
                    ? 'border border-gray-200 bg-white'
                    : 'border border-white/10 bg-white/5'
              } backdrop-blur-sm transition-all duration-300 hover:scale-105`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#ff4571] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-semibold mb-2 ${
                  plan.popular ? 'text-[#ff4571]' : ''
                }`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">
                    {typeof plan.price[billingCycle] === 'number' 
                      ? `$${plan.price[billingCycle]}`
                      : plan.price[billingCycle]
                    }
                  </span>
                  {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  )}
                </div>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className={`text-sm ${
                      theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {limitation}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  plan.buttonStyle === 'primary'
                    ? 'bg-[#ff4571] text-white hover:bg-[#ff3561]'
                    : theme === 'light'
                      ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'border border-white/20 text-white hover:bg-white/5'
                }`}
              >
                {plan.buttonText}
              </button>

              {plan.name !== 'Free' && (
                <p className={`text-xs text-center mt-4 ${
                  theme === 'light' ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  * subscriptions are non-refundable
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "What happens if I exceed my transcript limit?",
                answer: "If you exceed your monthly limit, you can either upgrade your plan or wait for the next billing cycle to reset your quota."
              },
              {
                question: "Do you offer refunds?",
                answer: "All subscriptions are non-refundable. However, you can cancel your subscription at any time to prevent future charges."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! Every new user gets 25 free transcripts to try our service. No credit card required."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg p-6 ${
                  theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
                }`}
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className={`${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}