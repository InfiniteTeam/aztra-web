import React from 'react'
import { Button, Col, OverlayTrigger, Popover, Row } from 'react-bootstrap'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faFileExcel, faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Line } from 'react-chartjs-2'

export interface StatisticsProps {
  guildId: string
}

export default class Statistics extends React.Component<StatisticsProps> {

  memberCountChartRef: React.RefObject<Line> = React.createRef()

  chartDownload = (ref: React.RefObject<Line>) => {
    let url = ref.current?.chartInstance.toBase64Image()

    const link = document.createElement('a')
    console.log(url)
    link.href = url
    link.download = "chart.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  render() {
    const isXs = window.innerWidth < 768
    
    const CHART_OPTIONS = {
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          gridLines: {
            color: "#4a4a4a",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: isXs ? 8 : 20,
            fontColor: "lightgrey",
            fontSize: 12,
            fontFamily: 'NanumSquare',
            padding: 10
          },
        }],
        yAxes: [{
          gridLines: {
            color: "#4a4a4a"
          },
          ticks: {
            fontColor: "lightgrey",
            fontFamily: 'NanumSquare',
            fontSize: 14
          },
        }],
      }
    }

    return (
      <>
        <Row className="dashboard-section">
          <h3>서버 통계</h3>
        </Row>
        <Row>
          <Col xl={6}>
            <div className="d-flex">
              <h4 className="mb-3">멤버수 통계</h4>
              <div>
                <OverlayTrigger
                  trigger="hover"
                  overlay={
                    <Popover id="auto-task-process-popover">
                      <Popover.Title>
                        멤버수 통계
                    </Popover.Title>
                      <Popover.Content>
                        최근 한달간의 멤버수 변화를 보여줍니다.
                    </Popover.Content>
                    </Popover>
                  } delay={{
                    show: 200,
                    hide: 150
                  }}>
                  <FontAwesomeIcon className="cursor-pointer ml-3" icon={faQuestionCircle} size="lg" color="grey" />
                </OverlayTrigger>
              </div>
              <div className="ml-auto d-flex">
                <div>
                  <Button variant="success" size="sm" onClick={() => this.chartDownload(this.memberCountChartRef)} >
                    <FontAwesomeIcon className="mr-2" icon={faFileImage} />
                    이미지 다운로드
                  </Button>
                  <Button className="ml-2" variant="outline-success" size="sm" onClick={() => this.chartDownload(this.memberCountChartRef)} >
                    <FontAwesomeIcon className="mr-2" icon={faFileExcel} />
                    엑셀 다운로드
                  </Button>
                </div>
              </div>
            </div>
            <div style={{
              height: 320
            }}>
              <Line
                ref={this.memberCountChartRef}
                data={{
                  labels: Array.from({ length: 20 }).map((_, index) => `11월 ${index + new Date().getDate() - 20}일`),
                  datasets: [{
                    label: '멤버 수',
                    borderColor: 'rgb(127, 70, 202)',
                    backgroundColor: 'rgba(127, 70, 202, 0.15)',
                    data: [324, 330, 332, 338, 344, 343, 347, 350, 357, 362, 374, 379, 384, 390, 391, 400, 404, 412, 415, 419]
                  }]
                }}
                options={CHART_OPTIONS} />
            </div>
          </Col>
          <Col xl={6}>
            <div className="d-flex">
              <h4 className="mb-3">메시지량 통계</h4>
              <div>
                <OverlayTrigger
                  trigger="hover"
                  overlay={
                    <Popover id="auto-task-process-popover">
                      <Popover.Title>
                        메시지량 통계
                    </Popover.Title>
                      <Popover.Content>
                        최근 한달간의 하루 전체 메시지량을 보여줍니다.
                    </Popover.Content>
                    </Popover>
                  } delay={{
                    show: 200,
                    hide: 150
                  }}>
                  <FontAwesomeIcon className="cursor-pointer ml-3" icon={faQuestionCircle} size="lg" color="grey" />
                </OverlayTrigger>
              </div>
              <div className="ml-auto d-flex">
                <div>
                  <Button variant="success" size="sm" onClick={() => this.chartDownload(this.memberCountChartRef)} >
                    <FontAwesomeIcon className="mr-2" icon={faFileImage} />
                    이미지 다운로드
                  </Button>
                  <Button className="ml-2" variant="outline-success" size="sm" onClick={() => this.chartDownload(this.memberCountChartRef)} >
                    <FontAwesomeIcon className="mr-2" icon={faFileExcel} />
                    엑셀 다운로드
                  </Button>
                </div>
              </div>
            </div>
            <div style={{
              height: 320
            }}>
              <Line
                ref={this.memberCountChartRef}
                data={{
                  labels: Array.from({ length: 20 }).map((_, index) => `11월 ${index + new Date().getDate() - 20}일`),
                  datasets: [{
                    label: '멤버 수',
                    borderColor: 'rgb(127, 70, 202)',
                    backgroundColor: 'rgba(127, 70, 202, 0.15)',
                    data: [412, 432, 417, 419, 394, 415, 481, 402, 491, 412, 418, 411, 418, 418, 412, 478, 422, 422, 421, 475]
                  }]
                }}
                options={CHART_OPTIONS} />
            </div>
          </Col>
        </Row>
      </>
    )
  }
}