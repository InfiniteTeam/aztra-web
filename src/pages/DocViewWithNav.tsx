import React, { useState } from 'react'
import { Button, Col, Container, Nav, Row } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown';
import Twemoji from 'react-twemoji'
import { heading } from '../components/MarkdownRenderer';
import { GuideGroupType } from '../types/GuideIndexTypes';
import { Link } from 'react-router-dom';
import { ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons'

interface DocViewWithNavProps {
  pageId: string
  index: GuideGroupType
}

const DocViewWithNav: React.FC<DocViewWithNavProps> = ({ pageId, index }) => {
  const [sidebarHide, setSidebarHide] = useState(true)

  const theme = 'light' as unknown

  const currentPageIndex = index.pages.findIndex(o => o.id === pageId)

  const prevPage = index.pages[currentPageIndex - 1]
  const nextPage = index.pages[currentPageIndex + 1]

  return (
    <Container fluid
      style={{
        backgroundColor: theme === 'dark' ? 'unset' : 'rgb(235, 235, 243)'
      }}
    >
      <Row>
        <Col md={3} xl={2}>
          <div className="scrollbar" style={{
            position: 'sticky',
            top: 57,
            left: 0,
          }}>
            <div className="d-flex align-items-center" style={{
              height: '72px'
            }}>
              <img alt="guide-group-icon" className="rounded-circle" src={index.icon} style={{
                width: 40,
                height: 40
              }} />
              <div className="ml-3 text-dark" style={{
                fontFamily: 'NanumSquare',
                fontSize: '13.5pt',
                fontWeight: 800,
                wordBreak: 'keep-all'
              }}>
                {index.name}
              </div>
              <Button className="ml-auto d-md-none" size="sm" variant="secondary" onClick={() => setSidebarHide(!sidebarHide)}>
                {sidebarHide ? '▼' : '▲'}
              </Button>
            </div>
            <div className={sidebarHide ? "d-none d-md-block" : undefined} style={{
              overflowY: 'scroll',
              height: 'calc(100vh - 57px - 72px)'
            }}>
              <Nav className="shadow-sm d-block" onSelect={() => setSidebarHide(true)} style={{
                backgroundColor: 'rgb(254, 254, 255)',
                borderRadius: 10,
                padding: '5px 0'
              }}>
                {
                  index.pages.map((one) => (
                    <Nav.Item>
                      <Nav.Link as={Link} className="text-dark" to={`/docs/${index.id}/${one.id}`} href={`/docs/${index.id}/${one.id}`} style={{
                        fontWeight: one.id === pageId ? 800 : 'normal'
                      }}>
                        {one.title}
                      </Nav.Link>
                    </Nav.Item>
                  ))
                }
              </Nav>
            </div>
          </div>
        </Col>
        <Col md={9} xl={8}
          style={{
            backgroundColor: theme === "dark" ? "rgb(55, 61, 67)" : "rgb(252, 252, 255)",
            paddingLeft: 30,
            paddingRight: 30
          }}
          className="shadow py-4"
        >
          <Twemoji>
            <ReactMarkdown
              className={`markdown  ${theme === "dark" ? "markdown-dark" : "markdown-light"}`}
              source={index.pages.find(o => o.id === pageId)?.content || '# 404: 페이지를 찾을 수 없습니다!'}
              renderers={{
                heading: heading
              }}
              escapeHtml={false}
            />
          </Twemoji>
          <div className="d-flex mt-5 px-1">
            {
              prevPage && (
                <Button className="mr-auto d-flex px-3" variant="outline-aztra" as={Link} to={`/docs/${index.id}/${prevPage.id}`}>
                  <ArrowBackIcon className="my-auto mr-3 d-none d-sm-block" style={{ transform: 'scale(1.2)' }} />
                  <div className="text-right">
                    <small>
                      이전 페이지
                    </small>
                    <div className="font-weight-bold">
                      {prevPage.title}
                    </div>
                  </div>
                </Button>
              )
            }
            {
              nextPage && (
                <Button className="ml-auto d-flex px-3" variant="aztra" as={Link} to={`/docs/${index.id}/${nextPage.id}`}>
                  <div className="text-left">
                    <small>
                      다음 페이지
                    </small>
                    <div className="font-weight-bold">
                      {nextPage.title}
                    </div>
                  </div>
                  <ArrowForwardIcon className="my-auto ml-3 d-none d-sm-block" style={{ transform: 'scale(1.2)' }} />
                </Button>
              )
            }
          </div>
        </Col>
      </Row>
    </Container >
  )
}

export default DocViewWithNav
