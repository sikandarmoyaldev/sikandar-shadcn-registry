import { type VariantProps } from "class-variance-authority";
import { Heart } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SponsorButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function SponsorButton({ variant = "outline", size = "default" }: SponsorButtonProps) {
    return (
        <Button className={cn(buttonVariants({ size, variant }))}>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            Sponsor
        </Button>
    );
}
