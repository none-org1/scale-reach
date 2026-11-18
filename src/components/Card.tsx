import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 ${
        hover ? "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}