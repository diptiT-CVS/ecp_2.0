import { Button } from "antd";
import React, { useState } from "react";
import { IoIosCall, IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import FeedbackModal from "../feedbackModal";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <footer
        className="text-primary py-10 mt-6 border-gray-300 border-t bg-white"
        role="contentinfo"
        aria-labelledby="footer-header"
      >
        <div
          className="max-w-[1500px] mx-auto px-4 flex justify-around flex-wrap md:gap-6 gap-10 text-center md:text-left sm:"
          id="footer-header"
        >
          <div>
            <h3 className="text-sm text-primary font-semibold uppercase mb-4">
              Additional Resources
            </h3>
            <div className="flex flex-col gap-2 text-secondary">
              <Link to="/" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
              <Link to="/" aria-label="Terms of Service">
                Terms of Service
              </Link>
              <Link to="/" aria-label="Help Center">
                Help Center
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">
              Contact Information
            </h3>
            <div
              className="flex justify-center md:justify-start items-center gap-2 mb-2"
              aria-label="Email contact"
            >
              <IoMdMail className="w-5 h-5 text-primary" aria-hidden="true" />
              <p className="text-secondary">contact@example.com</p>
            </div>
            <div
              className="flex justify-center md:justify-start items-center gap-2"
              aria-label="Phone contact"
            >
              <IoIosCall className="w-5 h-5 text-primary" aria-hidden="true" />
              <p className="text-secondary">+1 (555) 123-4567</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase mb-4">Feedback</h3>
            <Button
              type="primary"
              className="bg-primary border-none"
              aria-label="Provide feedback"
              onClick={showModal}
            >
              Provide Feedback
            </Button>
          </div>
        </div>
      </footer>
      <FeedbackModal open={isModalOpen} setOpen={setIsModalOpen} />
    </>
  );
};

export default Footer;
