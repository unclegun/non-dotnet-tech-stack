import { ReactNode } from 'react';

interface TechCardProps {
  title: string;
  icon: string;
  description: string;
  children: ReactNode;
}

export default function TechCard({ title, icon, description, children }: TechCardProps) {
  return (
    <div className="card">
      <h2>
        {icon} {title}
      </h2>
      <p className="text-muted mb-3">{description}</p>
      {children}
    </div>
  );
}
