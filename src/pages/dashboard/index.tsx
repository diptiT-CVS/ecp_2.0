import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { assistantCards } from "./constant";
import Copyright from "../../components/copyright";
import Footer from "../../components/footer";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      role="main"
      aria-label="Dashboard page"
    >
      <header
        className="bg-primary text-white py-4 px-5 flex items-center gap-4"
        role="banner"
      >
        <div
          className="size-8 rounded-full border-white border-2"
          aria-hidden="true"
        />
        <div>
          <h1 className="text-[18px] font-bold" id="dashboard-header">
            O11y (Observability) Hub
          </h1>
          <p className="text-[14px]">
            Your gateway to monitoring, insights, and support.
          </p>
        </div>
      </header>
      <div
        className="flex-1 flex items-center justify-center mx-auto max-w-[1500px]"
        aria-labelledby="dashboard-header"
      >
        <main
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-6 px-5 md:py-20 sm:py-10 py-6"
          role="region"
          aria-label="Assistant cards"
        >
          {assistantCards.map((card, index) => (
            <Card
              key={index}
              className="bg-white shadow-md md:px-6 px-4 md:!py-6 !py-4 text-center border-red-200 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/chatbot/${card.redirect}`)}
              role="button"
              tabIndex={0}
              aria-label={`${card.title}: ${card.description}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/chatbot/${card.redirect}`);
                }
              }}
            >
              <div className="text-primary mb-4" aria-hidden="true">
                {card.icon}
              </div>
              <h2 className="md:text-[18px] text-base font-semibold text-primary mb-2">
                {card.title}
              </h2>
              <p className="text-secondary-60 md:text-[16px] text-sm leading-6">{card.description}</p>
            </Card>
          ))}
        </main>
      </div>
      <Footer />
      <Copyright />
    </div>
  );
};

export default Dashboard;
