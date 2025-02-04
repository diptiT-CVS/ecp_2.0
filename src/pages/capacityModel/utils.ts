export const getStatusStyles = (status: string) => {
  switch (status) {
    case "green":
      return {
        textColor: "text-[#52c41a]",
        borderColor: "border-[#52c41a]",
        bgColor: "bg-[#f8fff3]",
      };
    case "yellow":
      return {
        textColor: "text-[#E9A420]",
        borderColor: "border-[#E9A420]",
        bgColor: "bg-[#FFF0D4]",
      };
    case "red":
      return {
        textColor: "text-[#cf2d2d]",
        borderColor: "border-[#cf2d2d]",
        bgColor: "bg-[#fff1f0]",
      };
    case "white":
      return {
        textColor: "text-[#10101091]",
        borderColor: "border-[#10101091]",
        bgColor: "bg-transparent",
      };
    default:
      return {
        textColor: "text-black",
        borderColor: "border-black",
        bgColor: "bg-white",
      };
  }
};
