import type { AdminTariffField } from "@/app/data/admin";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { errorClasses, inputClasses, textClasses } from "@/lib/config";

////////////////////////////////////// CLASSES ///////////////////////////

// ----------------------- Component --------------------l
interface RenderFieldTye {
  fieldConfig: AdminTariffField;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
}
export default function RenderField({ control, fieldConfig }: RenderFieldTye) {
  // ----------------------- Render --------------------
  return (
    <FormField
      control={control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={textClasses}>{fieldConfig.label}</FormLabel>
          <FormControl>
            {fieldConfig.type === "input" ? (
              <Input
                {...field}
                placeholder={fieldConfig.placeholder}
                className={inputClasses}
              />
            ) : (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={`{inputClasses} focus:ring-0`}>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  {fieldConfig.options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className={textClasses}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormMessage className={errorClasses} />
        </FormItem>
      )}
    />
  );
}
