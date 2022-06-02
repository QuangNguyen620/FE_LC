import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Tabs,
  message,
  InputNumber,
  Steps,
  Card,
  Spin,
  Divider,
} from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleFilled,
  EditFilled,
} from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import log from './ModuleLogger';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import moment from 'moment';
import CommonInfoContent from './step-content/CommonInfo';
import CAInfomation from './step-content/CAInfomation';
import LawRepresentatorInfomation from './step-content/LawRepresentatorInfomation';
import AccountantInfomation from './step-content/AccountantInfomation';
import AccountInfomation from './step-content/AccountInfomation';
import UserInfomation from './step-content/UserInfomation';
import ServicePackageInfomation from './step-content/ServicePackageInformation';
import CreateSuccessfullModal from './modal/CreateSuccessfullModal';
// import CreateFailModal from './modal/CreateFailModal';
// import eKYCFailedModal from './modal/eKYCFailedModal';

import { CreateCorporateDomain } from '../domains/ViewCorporateDomain';
import { useLocation } from 'react-router-dom';
import './ViewCorporate.less';
import '../../../../../assets/less/LC-common.less';

const { Step } = Steps;
const CreateCorporateContent = ({ lang = 'vi', ...props }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [context, domain] = CreateCorporateDomain();
  var [activeKey, setActiveKey] = useState('0');
  const location = useLocation();

  useEffect(() => {
    domain.initDomain();
  }, []);

  useEffect(() => {
    log.debug('useEffect--', context);
    form.setFieldsValue({
      lawRepresentatorPaperType: context?.lawRepresentatorPaperType,
      accountantPaperType: context?.accountantPaperType,
    });
    setActiveKey(context?.activeKey);
  }, [context]);

  function callback(key) {
    domain.onChangeActiveKey(key);
    console.log(key);
  }
  function prev(e) {
    var activeKeyNew = (activeKey - 1).toString();
    domain.onChangeActiveKey(activeKeyNew);
    // setActiveKey(activeKey--);
  }

  const { TabPane } = Tabs;

  return (
    <>
      <Row style={{ padding: 16 }}>
        <Col align="left" className="card-container" span={24}>
          <Card
            // className="custom-card"
            bordered={false}
            title={
              <KTTitle size={2}>
                Xem thông tin tài khoản khách hàng doanh nghiệp
              </KTTitle>
            }
          >
            <Form form={form} layout="horizontal">
              <Col span={24}>
                <Tabs
                  defaultActiveKey="0"
                  onChange={callback}
                  activeKey={activeKey}
                >
                  <TabPane tab="Thông tin chung" key="0">
                    <CommonInfoContent form={form} />
                  </TabPane>
                  <TabPane tab="Thông tin chữ ký số" key="1">
                    <CAInfomation form={form} />
                  </TabPane>
                  <TabPane tab="Thông tin người đại diện pháp luật" key="2">
                    <LawRepresentatorInfomation />
                  </TabPane>
                  <TabPane tab="Thông tin kế toán trưởng" key="3">
                    <AccountantInfomation />
                  </TabPane>
                  <TabPane tab="Thông tin người dùng" key="4">
                    <UserInfomation />
                  </TabPane>
                  <TabPane tab="Thông tin tài khoản ngân hàng" key="5">
                    <AccountInfomation />
                  </TabPane>
                  <TabPane tab="Gói dịch vụ" key="6">
                    <ServicePackageInfomation />
                  </TabPane>
                </Tabs>
              </Col>

              <Divider></Divider>
              <div className="steps-action">
                <Row className={'padding-md'}>
                  <Col span={12}>
                    <Button
                      style={{ display: activeKey == '0' ? 'none' : 'flex' }}
                      className="secondary-btn"
                      onClick={(e) => {
                        prev(e);
                        // domain.exitHandler();
                      }}
                    >
                      <span>
                        <LeftOutlined />
                      </span>
                      Quay lại
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      className="common-btn right-step-action"
                      onClick={(e) => domain.editHandler(e)}
                    >
                      Chỉnh sửa
                      <span style={{ marginLeft: '5px' }}>
                        <EditFilled />
                      </span>
                    </Button>
                  </Col>
                </Row>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateCorporateContent;
