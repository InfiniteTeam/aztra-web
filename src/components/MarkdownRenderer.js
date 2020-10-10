import React from 'react';

export default function heading(props) {
  const Heading = `h${props.level}`;
  return (
    <>
      <Heading>
        {props.children}
      </Heading>
      <hr />
    </>
  );
}