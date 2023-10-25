"use client";

import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: store[];
}

/* The `export default function StoreSwitcher()` is a React functional component that exports the
`StoreSwitcher` component as the default export of the module. */
export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

/* The `formattedItems` variable is an array that is created by mapping over the `items` array. For
each item in the `items` array, a new object is created with two properties: `label` and `value`.
The `label` property is set to the `name` property of the item, and the `value` property is set to
the `id` property of the item. This creates a new array of objects with the `label` and `value`
properties extracted from the original `items` array. */
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

/* The `currentStore` variable is finding the store object from the `formattedItems` array that has a
`value` property equal to the `storeId` parameter. It uses the `find` method to iterate over the
`formattedItems` array and returns the first store object that satisfies the condition `item.value
=== params.storeId`. This allows us to determine the currently selected store based on the `storeId`
parameter. */
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const [open, setOpen] = useState(false);

/**
 * The function `onStoreSelect` sets the open state to false and navigates to a new route based on the
 * selected store value.
 * @param store - The `store` parameter is an object with two properties: `value` and `label`.
 */
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a Store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..." />
            <CommandEmpty>No Store Found.</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store) => (
                <CommandItem
                key={store.value}
                onSelect={() => onStoreSelect(store)}
                className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4"/>
                  {store.label}
                  <Check 
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.value === store.value 
                    ? "opaciy-100" 
                    : "opacity-0"
                  )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem 
              onSelect={() => {
                setOpen(false)
                storeModal.onOpen()
              }}
              >
                <PlusCircle className="mr-2 h-5 w-5"/>
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
