import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SignUpType = {
  btnClasses: string;
  btnTitle: string;
};

export default function SignUp({ btnClasses, btnTitle }: SignUpType) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className={`${btnClasses}`} variant="link">
            {btnTitle}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[698px] pb-8">
          <DialogHeader className="flex flex-col items-center justify-center">
            <img
              src="/img/logo.svg"
              className="h-[90px] w-[90px]"
              alt="signup logo "
            />
            <h3 className="text-darkBlue text-2xl font-jostFont font-bold capitalize">
              Create account on resido
            </h3>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
            <div className="flex flex-col gap gap-y-2">
              <div>
                <Label
                  htmlFor="fullname"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Full Name
                </Label>
                <Input
                  id="fullname"
                  name="fullName"
                  className="text-darkBlue  bg-sky-50 py-6 box-border mt-1 focus-visible:ring-0 md:text-lg"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <Label
                  htmlFor="username"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  className="text-darkBlue  bg-sky-50 py-6 box-border mt-1 focus-visible:ring-0 md:text-lg"
                  placeholder="Username"
                />
              </div>
              <div>
                <Label
                  htmlFor="phone"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="number"
                  name="phone"
                  className="text-darkBlue  bg-sky-50 py-6 box-border mt-1 focus-visible:ring-0 md:text-lg"
                  placeholder="123-425-55"
                />
              </div>
            </div>
            <div className="flex flex-col gap gap-y-2">
              <div>
                <Label
                  htmlFor="email"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  className="text-darkBlue  bg-sky-50 py-6 box-border mt-1 focus-visible:ring-0 md:text-lg"
                  placeholder="MyEmail@gmail.com"
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className="text-darkBlue  bg-sky-50 py-6 box-border mt-1 focus-visible:ring-0 md:text-lg"
                  placeholder="Password"
                />
              </div>

              <div>
                <Label
                  htmlFor="member"
                  className="font-bold text-lg font-jostFont text-darkBlue "
                >
                  Signup As
                </Label>

                <Select>
                  <SelectTrigger className="w-full bg-sky-50 py-6  text-darkBlue   box-border mt-1 focus-visible:ring-0 md:text-lg">
                    <SelectValue placeholder="As a Customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>As an Customer</SelectLabel>
                      <SelectItem value="agent">As an Agent</SelectItem>
                      <SelectItem value="agency">As an Agency</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-row  mt-4">
            <Button
              className="bg-blue-900 w-full py-6 hover:bg-sky-700 text-lg  font-semibold font-jostFont focus-visible:ring-0"
              type="submit"
            >
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
