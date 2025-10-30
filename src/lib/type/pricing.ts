interface PackageStyleClasses {
  container: string;
  title: string;
  price: string;
  button: string;
}
export type PackagesType = {
  id: number;
  name: string;
  price: number;
  paymentType: string;
  styleClasses: PackageStyleClasses;
  benefits: string[];
};
