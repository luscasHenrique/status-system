import React from "react";
import { AuthWrapper } from "../../../../core/auth/screen/AuthWrapper";
// import Banner from 'src/components/Banner';

interface HomeUIProps {}
export const HomeUI: React.FC<HomeUIProps> = ({}) => {
  return (
    <AuthWrapper>
      <div className="w-full grid grid-cols-1 justify-items-center"></div>
    </AuthWrapper>
  );
};
