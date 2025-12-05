interface NavbarPagesType {
  name: string;
  url: string;
}
export const navbarPages: NavbarPagesType[] = [
  { name: "Home", url: "/" },
  { name: "Properties", url: "/property/getAll" },
  { name: "Agents", url: "/agents" },
  { name: "Agencies", url: "/agencies" },
  { name: "Blogs", url: "/blogs" },
  { name: "Pricing", url: "/pricing" },
  { name: "Contact Us", url: "/contact-us" },
  { name: "FAQ", url: "/Faqs" },
  { name: "About Us", url: "/about-us" },
];
