import type { PackagesType } from "@/lib/type/pricing";

export const paymentPackages: PackagesType[] = [
  {
    id: 1,
    name: "Basic Package",
    price: 19.99,
    paymentType: "monthly",
    styleClasses: {
      container:
        "transition-all ease-linear duration-150 bg-gray-50 border border-gray-200 hover:shadow-lg p-5 flex flex-col",
      title: "text-gray-800 font-semibold text-xl font-jostFont",
      price:
        "text-gray-900 font-bold text-4xl font-jostFont flex flex-row items-center",
      button:
        "w-full py-3 transition-all duration-150 rounded-md active:scale-95 ease-linear  bg-gray-800 text-white hover:bg-gray-700 ",
    },
    benefits: [
      "Create up to 5 property listings",
      "Add up to 2 agents under your agency",
      "Basic customer support",
      "Standard visibility in search results",
      "Access to property management dashboard",
    ],
  },
  {
    id: 2,
    name: "Standard Package",
    price: 49.99,
    paymentType: "monthly",
    styleClasses: {
      container:
        "transition-all ease-linear duration-150 bg-white border border-blue-300 hover:shadow-lg p-5 flex flex-col",
      title: "text-blue-700 font-semibold text-xl font-jostFont flex flex-col",
      price:
        "text-blue-800 font-bold text-4xl font-jostFont flex flex-row items-center",
      button:
        "w-full py-3 transition-all duration-150 rounded-md active:scale-95 ease-linear bg-blue-600 text-white hover:bg-blue-700",
    },
    benefits: [
      "Create up to 20 property listings",
      "Add up to 5 agents under your agency",
      "Priority support with faster response",
      "Featured placement in search results",
      "Access to analytics and insights",
    ],
  },
  {
    id: 3,
    name: "Platinum Package",
    price: 99.99,
    paymentType: "monthly",
    styleClasses: {
      container:
        "transition-all ease-linear duration-150 bg-gradient-to-b from-yellow-100 to-yellow-300 border border-yellow-400 hover:shadow-lg p-5 flex flex-col",
      title: "text-yellow-800 font-bold text-xl font-jostFont",
      price:
        "text-yellow-900 font-extrabold text-4xl font-jostFont flex flex-row items-center",
      button:
        "w-full py-3 transition-all duration-150 rounded-md active:scale-95 ease-linear bg-yellow-500 text-white hover:bg-yellow-600",
    },
    benefits: [
      "Unlimited property listings",
      "Add unlimited agents under your agency",
      "24/7 premium customer support",
      "Top-tier visibility and promotion on homepage",
      "Advanced analytics and marketing tools",
      "Exclusive access to new platform features",
    ],
  },
];
