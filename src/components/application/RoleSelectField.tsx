import { Select } from "@/components/ui";
import type { SelectOption } from "@/components/ui";
import type { ApplicationFormController } from "./application-form-types";

type RoleSelectFieldProps = {
  disabled: boolean;
  form: ApplicationFormController;
  options: SelectOption[];
  placeholder: string;
};

export function RoleSelectField({
  disabled,
  form,
  options,
  placeholder,
}: RoleSelectFieldProps) {
  return (
    <Select
      disabled={disabled}
      error={form.formState.errors.roleId?.message}
      id="roleId"
      isRequired
      label="Role"
      options={options}
      placeholder={placeholder}
      {...form.register("roleId")}
    />
  );
}
