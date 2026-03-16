import React from "react";

const Badge = ({ value }: { value: string }) => {
  return (
    <div className="absolute top-3 left-3 z-10 bg-red-500 rounded-lg px-2 py-0.5 text-white">
      {value}
    </div>
  );
};

export default Badge;
