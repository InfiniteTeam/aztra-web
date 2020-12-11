import React from 'react';

interface headingProps {
  level: number
  children: React.ReactNode
}

export const heading: React.FC<headingProps> = ({ level, children }) => {
  return (
    <div className="pt-3">
      {
        React.createElement(`h${level}`, null, children)
      }
      <hr />
    </div>
  );
}