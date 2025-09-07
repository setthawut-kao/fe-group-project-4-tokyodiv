import { Typography } from "@/components/ui/typography";

export const CheckOutPage = () => {
  return (
    <div className="py-10">
      <Typography as="h1" className="text-3xl font-bold">
        Checkout
      </Typography>
      <div className="mt-8 border-2 border-dashed border-slate-300 rounded-lg h-96 flex items-center justify-center">
        <p className="text-slate-500">
          Checkout form and order summary will be here...
        </p>
      </div>
    </div>
  );
};
