import { Button } from "antd";
import React, { ReactNode } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

// Define the props for the Header component
interface HeaderProps {
  title: string;
  showFilter?: ReactNode; // Optional, can be any React node
  backButton?: boolean;
  backLink?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showFilter,
  backButton = false,
  backLink,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // Check if backLink is a string (URL) or not
    if (backLink) {
      navigate(backLink); // Navigate to the provided URL
    } else {
      navigate(-1); // Go back to the previous page in the history stack
    }
  };

  return (
    <div className="px-5 py-4 border-b border-black border-opacity-10 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        {backButton && (
          <Button
            className="!px-2"
            type="primary"
            ghost
            onClick={handleBackClick}
          >
            <GoArrowLeft className="text-[18px]" />
          </Button>
        )}
        <p className="text-[#666CFF] font-semibold uppercase">{title}</p>
      </div>
      {showFilter && showFilter}
    </div>
  );
};

export default Header;
