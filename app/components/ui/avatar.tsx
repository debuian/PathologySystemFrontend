import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type { C } from "node_modules/react-router/dist/development/route-data-C12CLHiN.mjs";
import React, { type ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utlis";

const Avatar: React.FC<
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
> = ({ className, ...props }) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
);

Avatar.displayName = "Avatar";

const AvatarImage: React.FC<
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
> = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback: React.FC<
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
> = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    delayMs={600}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-neutral-100 text-sm font-medium text-neutral-500",
      className
    )}
    {...props}
  />
);

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
