import { Input } from "@/components/ui";
import type { ApplicationFormController } from "./application-form-types";

type PersonalInfoFieldsProps = {
  form: ApplicationFormController;
};

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  return (
    <>
      <Input
        autoComplete="name"
        error={form.formState.errors.fullName?.message}
        id="fullName"
        label="Full name"
        placeholder="Jane Doe"
        {...form.register("fullName")}
      />
      <Input
        autoComplete="email"
        error={form.formState.errors.email?.message}
        id="email"
        label="Email address"
        placeholder="jane@example.com"
        type="email"
        {...form.register("email")}
      />
      <Input
        autoComplete="tel"
        error={form.formState.errors.phone?.message}
        id="phone"
        label="Phone number"
        placeholder="+234 800 000 0000"
        type="tel"
        {...form.register("phone")}
      />
      <Input
        autoComplete="address-level2"
        error={form.formState.errors.location?.message}
        id="location"
        label="Location"
        placeholder="Lagos, Nigeria"
        {...form.register("location")}
      />
    </>
  );
}
