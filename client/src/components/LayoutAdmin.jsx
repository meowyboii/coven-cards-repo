import React from "react";
export const Layout = ({ children }) => {
  return (
    <div>
      <main className="min-h-[100vh]"> {children}</main>
    </div>
  );
};