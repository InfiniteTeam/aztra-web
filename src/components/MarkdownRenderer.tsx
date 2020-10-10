import React from 'react';

interface headingProps {
  level: number
  children: React.ReactNode
}

export default function heading(props: headingProps) {
  const Heading: React.FC = () => React.createElement(`h${props.level}`);
  return (
    <>
      <Heading>
        {props.children}
      </Heading>
      <hr />
    </>
  );
}