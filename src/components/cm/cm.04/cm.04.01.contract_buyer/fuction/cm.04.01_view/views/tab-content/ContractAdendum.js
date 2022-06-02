import React, { useEffect, useState } from 'react';

import { Col, Row, Form, Tabs, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
const { TabPane } = Tabs;

var init = [
  //   // {
  //   //   addendumNo: 1,
  //   //   addendumName: '',
  //   //   addendumContent: '',
  //   // },
  //   // { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
];
// function callback(key) {
//   console.log(key);
// }
// const { Option } = Select;

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context] = useCM0401Domain();
  const { t } = useTranslation();

  // const [contractAddendum, setContractAddendum] = useState(
  //   context?.contractAddendum,
  // );
  const [contractAddendumInit, setContractAddendumInit] = useState(
    context?.contractAddendumInit,
  );

  useEffect(() => {
    // setContractAddendum(context?.contractAddendum);
    setContractAddendumInit(context?.contractAddendumInit);
    console.log('context o tab addume::: ', context);
  }, [context]);

  init = contractAddendumInit;

  const onChange = (activeKey) => {
    // setActiveState(activeKey);
  };

  return (
    <>
      <div>
        {/* <div className="content-step"> */}
        <Tabs onChange={onChange} type="card" className="tabs-style-view">
          {contractAddendumInit?.map((pane) => (
            <TabPane tab={pane.title} key={pane.key} className="tabsStyless">
              <Row>
                <Col span={23}>
                  <Row>
                    <Col span={1}></Col>
                    <Col span={7}>
                      <Form.Item>Phụ lục số</Form.Item>
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item>{pane.addendumNo}</Form.Item>
                    </Col>
                  </Row>

                  <Divider className="divider-view" />
                  <Row>
                    <Col span={1}></Col>
                    <Col span={7}>
                      <Form.Item>Tên phụ lục</Form.Item>{' '}
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item>{pane.addendumName}</Form.Item>
                    </Col>
                  </Row>
                  <Divider className="divider-view" />
                  <Row>
                    <Col span={1}></Col>
                    <Col span={7}>
                      <Form.Item>Nội dung phụ lục</Form.Item>
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item>
                        <pre className={'pre-textare-view'}>
                          {pane.addendumContent}
                        </pre>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={1}></Col>
              </Row>
            </TabPane>
          ))}
        </Tabs>
        {/* </div> */}
      </div>
    </>
  );
};

export default ConstractInfomation;
