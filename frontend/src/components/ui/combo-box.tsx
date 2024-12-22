"use client";

import * as React from "react";
import { ComponentProps } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UseFormRegisterReturn } from "react-hook-form";
import { Maybe } from "@/lib/type/utils.ts";
import LoadingComboBox from "@/components/ui/loading-combo-box.tsx";

export interface ValueLabel {
  value: string;
  label: string;
}

interface Props extends ComponentProps<typeof Popover> {
  values: Maybe<ValueLabel[]>;
  register?: UseFormRegisterReturn;
  placeholder?: string;
}
export function Combobox({ values, register, placeholder, ...props }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  if (!values) {
    return <LoadingComboBox />;
  }

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value ? values.find((v) => v.value === value)?.label : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className="h-9"
            {...register}
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {values.map((v) => (
                <CommandItem
                  key={v.value}
                  value={v.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}>
                  {v.label}
                  <Check className={cn("ml-auto", value === v.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
