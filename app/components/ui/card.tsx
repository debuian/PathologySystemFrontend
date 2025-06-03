import React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utlis";

const Card: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
};

const CardHeader: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div className={cn("text-sm text-muted-foreground", className)} {...props} />
);
CardDescription.displayName = "CardDescription";
const CardContent: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => <div className={cn("p-6 pt-0", className)} {...props} />;

CardContent.displayName = "CardContent";

const CardFooter: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
