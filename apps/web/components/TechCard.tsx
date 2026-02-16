import { ReactNode } from 'react';

interface TechCardProps {
  title: string;
  icon: string;
  description: string;
  children: ReactNode;
}

export default function TechCard({ title, icon, description, children }: TechCardProps) {
  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white border-bottom-0 pt-4">
        <h2 className="h4 mb-0">
          <span className="me-2">{icon}</span>
          {title}
        </h2>
      </div>
      <div className="card-body p-4">
        <p className="text-muted mb-4">{description}</p>
        {children}
      </div>
    </div>
  );
}
