import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Images, Info } from "lucide-react";
import { useEffect, useState } from "react";

interface AddAgentFormProp {
  qualityClasses?: string;
}

export default function AddAgentForm({ qualityClasses }: AddAgentFormProp) {
  const [agentImage, setAgentImage] = useState<string>("");

  useEffect(() => {
    return () => {
      if (agentImage) URL.revokeObjectURL(agentImage);
    };
  }, [agentImage]);

  const handleAgentImage = (
    e: React.ChangeEvent<HTMLInputElement> | null
  ): void => {
    if (!e || !e.target) return;

    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileType: string = file.type;
    const validTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validTypes.includes(fileType)) {
      alert("Please give solid image types like: jpg, jpeg, png");
    } else {
      setAgentImage(URL.createObjectURL(file));
      e.target.value = "";
    }
  };
  return (
    <section className={qualityClasses}>
      <div className="container">
        <form
          action="#"
          className="rounded-[10px] p-[30px] bg-white shadow-addAgentForm relative w-full"
        >
          <div className="my-4  flex flex-col items-center justify-center">
            <h3 className="text-2xl leading-[30px] text-darkBlue font-jostFont font-bold capitalize mb-2">
              Profile Logo
            </h3>
            <div className="w-[120px] h-[120px] min-h-[120px] rounded-full border border-slate-200 bg-slate-100  flex items-center justify-center px-4 mb-4  relative active:scale-90 duration-300 ease-linear">
              {agentImage === "" ? (
                <Images className="h-3/5 w-3/5" />
              ) : (
                <img
                  src={agentImage}
                  alt="agent profile"
                  className="absolute inset-0  rounded-full z-10 h-full w-full "
                />
              )}
              <input
                type="file"
                className="absolute inset-0 z-20 cursor-pointer opacity-0"
                onChange={handleAgentImage}
              />
            </div>
          </div>
          {/* basic Information */}
          <div className="mt-2 flex flex-col gap-y-3">
            <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
              Basic Information
            </h3>
            <div className="grid grid-cols-1">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="fullName"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont flex flex-row items-center justify-start gap-x-1"
                >
                  Full Name
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="fill-blue-800 stroke-white" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-blue-800 py-3 px-3 font-jostFont text-sm">
                        <p>Agent full name</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm" />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="designation"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full"
                >
                  Designation
                </Label>
                <Input
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="designation"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="phone"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full"
                >
                  Phone
                </Label>
                <Input
                  type="number"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="phone"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="email"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  Email
                </Label>
                <Input
                  type="email"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="email"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="landline"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont  w-full"
                >
                  Landline
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="landline"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="description"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont "
                >
                  Description
                </Label>
                <Textarea
                  className="bg-sky-50  py-1 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm"
                  rows={5}
                />
              </fieldset>
            </div>
          </div>

          {/* // location */}
          <div className="mt-5 flex flex-col gap-y-3">
            <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
              Location
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="address"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  address
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="address"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="address2"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  address 2
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="address2"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="country"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  country
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="country"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="state"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  state
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="state"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="city"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  city
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="city"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="zipcode"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  zip code
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="zipcode"
                />
              </fieldset>
            </div>
          </div>

          {/* social contacts */}
          <div className="mt-5 flex flex-col gap-y-3">
            <h3 className="text-2xl text-darkBlue font-jostFont font-bold capitalize text-start leading-none">
              Social accounts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="faceboook"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  faceboook
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="faceboook"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="twitter"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  twitter
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="twitter"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="linkedin"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  linkedin
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="linkedin"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="googlePlus"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  google Plus
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="googlePlus"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="instagram"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  instagram
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="instagram"
                />
              </fieldset>
              <fieldset className="flex flex-col gap-y-1 items-start justify-start w-full">
                <Label
                  htmlFor="tumbler"
                  className="text-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  tumbler
                </Label>
                <Input
                  type="text"
                  className="bg-sky-50  py-5 focus-visible:ring-slate-300 text-xs text-slate-500 border-slate-200 rounded-sm w-full"
                  id="tumbler"
                />
              </fieldset>
            </div>

            <div className="grid grid-cols-1 mt-1">
              <fieldset className="flex flex-col gap-y-2 items-start justify-start w-full">
                <Label
                  htmlFor="agreement"
                  className="ext-base leading-tight text-blue-950 capitalize font-jostFont w-full"
                >
                  GDPR Agreement *
                </Label>
                <div className="flex flex-row gap-2 items-center">
                  <Checkbox className="data-[state=checked]:shadow-[0_0_1px_4px_rgba(59,130,246,0.5)] data-[state=checked]:bg-blue-600 data-[state=checked]:border-none border-slate-300 transition-all duration-300 ease-linear" />
                  <p className="leading-none text-xs text-slate-500">
                    I consent to having this website store my submitted
                    information so they can respond to my inquiry.
                  </p>
                </div>
              </fieldset>
            </div>

            <button
              className="text-sm text-white font-j capitalize py-3 px-6 leading-tight rounded-md hover:bg-blue-500 bg-blue-900 transition-colors duration-300 ease-linear self-start mt-2"
              type="submit"
            >
              Submit & preview
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
