import React from 'react'
import { Button, Card, Col, OverlayTrigger, Popover, Row, Table } from 'react-bootstrap'
import { faExclamationTriangle, faTrophy } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface WarnsProps {
  guildId: string
}

export default class Warns extends React.Component<WarnsProps> {
  render() {
    return (
      <>
        <Row className="dashboard-section">
          <h3>경고 관리</h3>
        </Row>
        <Row>
          <Col className="pb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">전체 경고 목록</h4>
              <div>
                <Button variant="aztra" className="shadow" size="sm">모두 보기</Button>
              </div>
            </div>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                버그로 도배
              </Card.Body>
            </Card>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                심한 욕설... 은 아니고 심한 오류 메시지를 뱉음
              </Card.Body>
            </Card>
          </Col>

          <Col className="pb-5" xs={12} lg={6}>
            <div className="d-flex justify-content-between">
              <h4 className="mb-3">멤버 경고 순위</h4>
              <div>
                <Button variant="aztra" className="shadow" size="sm">더보기</Button>
              </div>
            </div>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="gold" />
                1위 - Aztra
              </Card.Body>
            </Card>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="silver" />
                2위 - ArpaAP
              </Card.Body>
            </Card>
            <Card bg="dark" className="mb-2 shadow-sm shadow">
              <Card.Body className="py-2">
                <FontAwesomeIcon icon={faTrophy} className="mr-2" color="chocolate" />
                3위 - Dacon
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex">
              <h4 className="mb-3">자동 작업 수행</h4>
              <div>
                <OverlayTrigger
                  trigger="hover"
                  overlay={
                    <Popover id="auto-task-process-popover">
                      <Popover.Title>
                        자동 작업 수행
                    </Popover.Title>
                      <Popover.Content>
                        일정 횟수 이상의 경고를 받거나 해제되었을 때 자동으로 수행할 작업을 정할 수 있습니다.
                    </Popover.Content>
                    </Popover>
                  } delay={{
                    show: 200,
                    hide: 150
                  }}>
                  <FontAwesomeIcon className="cursor-pointer ml-3" icon={faQuestionCircle} size="lg" color="grey" />
                </OverlayTrigger>
              </div>
            </div>
            <Table className="m-2" variant="dark" hover>
              <thead>
                <tr>
                  <th>경고 수</th>
                  <th>수행할 작업</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>4회</td>
                  <td>해당 멤버 추방</td>
                </tr>
                <tr>
                  <td>7회</td>
                  <td>해당 멤버 차단</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </>
    )
  }
}