import { useEffect } from "react";
import { ADS } from "@/config/ads";

const GoogleAd = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (import.meta.env.DEV) {
    return (
      <div className="border rounded-lg h-[280px] flex items-center justify-center bg-slate-100 dark:bg-slate-800">
        Google Ad Placeholder
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={ADS.client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default GoogleAd;