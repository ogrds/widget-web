import { Widget } from "./components/Widget";
import { SkeletonTheme } from "react-loading-skeleton";
import { RecoilRoot } from "recoil";

import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <RecoilRoot>
      <SkeletonTheme baseColor="#fafafa79" highlightColor="#fafafa">
        <Widget />
      </SkeletonTheme>
    </RecoilRoot>
  );
}

export { App };
