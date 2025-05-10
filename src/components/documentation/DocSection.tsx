
import { ReactNode } from "react";

interface DocSectionProps {
  title: string;
  children: ReactNode;
}

const DocSection = ({ title, children }: DocSectionProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
};

export default DocSection;
