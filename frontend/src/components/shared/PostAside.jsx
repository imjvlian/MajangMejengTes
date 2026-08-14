import LatestPosts from "./LatestPosts";
import Categories from "./Categories";
import GoogleAd from "./GoogleAd";
import { ADS } from "@/config/ads";
import PartnerPlaceholder from "./PartnerPlaceholder";

const PostAside = () => {
  return (
    <aside className="sticky top-24 space-y-8">

      <GoogleAd slot={ADS.slots.sidebar} />

      <LatestPosts />

      <Categories />

      <PartnerPlaceholder />

    </aside>
  );
};

export default PostAside;