import React from 'react'
import { Container } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import { heading } from '../components/MarkdownRenderer';

interface DocViewProps {
  src: any
}

const DocView: React.FC<DocViewProps> = ({ src }) => {
  const theme = 'light' as unknown


  return (
    <Container fluid
      style={{
        backgroundColor: theme === 'dark' ? 'unset' : 'rgb(235, 235, 245)'
      }}
    >
      <Container fluid="sm" style={{
        backgroundColor: theme === "dark" ? "rgb(55, 61, 67)" : "rgb(252, 252, 255)",
        paddingLeft: 30,
        paddingRight: 30
      }}
        className="shadow"
      >
        <ReactMarkdown
          className={`markdown px-2 py-5 ${theme === "dark" ? "markdown-dark" : "markdown-light"}`}
          source={src}
          renderers={{
            heading: heading
          }}
          escapeHtml={false}
        />
      </Container>
    </Container >
  )
}

export default DocView
