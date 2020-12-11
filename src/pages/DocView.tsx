import React from 'react'
import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { heading } from '../components/MarkdownRenderer';

interface DocViewProps {
  src: any
}

const DocView: React.FC<DocViewProps> = ({ src }) => {
  return (
    <Container fluid="sm" style={{
      backgroundColor: "ghostwhite",
      paddingLeft: 30,
      paddingRight: 30
    }}
      className="shadow-sm">
      <div className="pt-5" />
      <ReactMarkdown
        className="markdown"
        source={src}
        renderers={{
          heading: heading
        }}
        escapeHtml={false}
      />
      <div className="pt-5" />
    </Container>
  )
}

export default DocView
