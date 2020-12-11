import React from 'react'
import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { heading } from '../components/MarkdownRenderer';

interface DocViewProps {
  src: any
}

const DocView: React.FC<DocViewProps> = ({ src }) => {
  return (
    <Container
      fluid="sm"
      style={{
        backgroundColor: "rgb(55, 61, 67)",
        paddingLeft: 30,
        paddingRight: 30
      }}
      className="shadow-sm"
    >
      <ReactMarkdown
        className="markdown px-2 py-5"
        source={src}
        renderers={{
          heading: heading
        }}
        escapeHtml={false}
      />
    </Container>
  )
}

export default DocView
