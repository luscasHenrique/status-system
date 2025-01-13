// src/components/CenteredContent.tsx
import React from 'react';

interface MainStyleProps {
  children: React.ReactNode;
  className?: string; // Prop opcional para adicionar classes customizadas, se necessário
}

export const MainStyle: React.FC<MainStyleProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center flex-grow mx-auto w-full overflow-hidden z-0 ${className}`}
    >
      {children}
    </div>
  );
};
