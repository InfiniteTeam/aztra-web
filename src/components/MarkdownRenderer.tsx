import React from 'react';

interface headingProps {
  level: number
  children: React.ReactNode
}

export const heading: React.FC<headingProps> = ({ level, children }) => {
  const Heading: React.FC = () => React.createElement(`h${level}`);
  return (
    <>
      <Heading>
        {children}
      </Heading>
      <hr />
    </>
  );
}