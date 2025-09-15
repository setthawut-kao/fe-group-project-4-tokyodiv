import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import { Animation } from "@/components/shared/Animation";
import successAnimationData from "@/assets/animations/success_animation.json";

export const OrderSuccessPage = () => {
  return (
    <section className="flex flex-col gap-3 lg:gap-10 my-10 lg:my-20 items-center">
      <Animation
        animationData={successAnimationData}
        className="w-48 h-48"
        loop={true}
      />

      <div className="space-y-3">
        <Typography as="h2" className="text-center">
          Thank you for shopping with us!
        </Typography>
        <Typography as="small">
          You can return to the homepage to keep shopping or view the details of
          your order
        </Typography>
      </div>

      <div className="flex flex-col w-full lg:max-w-xs gap-3">
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="neutral">
          <Link to="/orders">View Order History</Link>
        </Button>
      </div>
    </section>
  );
};
