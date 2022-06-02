import React, { useState, useEffect, useRef } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Space,
  DatePicker,
  Radio,
  Tag,
  Divider,
} from 'antd';
import { PaperClipOutlined, SyncOutlined } from '@ant-design/icons';
import { KTTitle } from 'core/ui';
import moment from 'moment';
import { CM1602Domain } from '../../../domains/CM.07.Domain';
import ViewPDFModal from '../../viewFile/viewPDFModal';
const { Option } = Select;

const CommonInfoContent = ({ lang = 'vi', ...props }) => {
  const dateFormatList = 'DD/MM/YYYY';
  const [context, domain] = CM1602Domain();

  const [visiblePDFModal, setVisiblePDFModal] = useState(false);
  const filePath = useRef();
  const closeModal = () => {
    setVisiblePDFModal(false);
  };
  const openModal = () => {
    setVisiblePDFModal(true);
  };

  useEffect(() => {
    if (context?.lcApplication?.contractTypeValue == 1) {
      filePath.current = context?.contractFileUrlContractType1;
      console.log(filePath.current);
    } else {
      filePath.current = context?.lcApplication?.contractFileUrl;
      console.log(filePath.current);
    }
  }, [context]);
  return (
    <>
      <ViewPDFModal
        isVisbled={visiblePDFModal}
        file={filePath.current}
        onClose={closeModal}
      />

      <div style={{ background: 'white', borderRadius: '5px' }}>
        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Loại hợp đồng<span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.contractType}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Mã hợp đồng <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.contractCode}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Số hợp đồng <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <p>{context?.lcApplication?.contractNumber}</p>
                  </Col>
                </Row>
                <Divider></Divider>
                <Row>
                  <Col span={8}>
                    Hợp đồng mua bán <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    {context?.lcApplication?.contractTypeValue == 2 && (
                      <Tag
                        icon={<PaperClipOutlined />}
                        color="blue"
                        onClick={(e) => openModal(e)}
                      >
                        File hợp đồng đã ký
                      </Tag>
                    )}
                    {context?.lcApplication?.contractTypeValue == 1 &&
                      context?.contractFileUrlContractType1 == '' && (
                        <Tag icon={<SyncOutlined spin />} color="blue">
                          File hợp đồng đã ký
                        </Tag>
                      )}
                    {context?.lcApplication?.contractTypeValue == 1 &&
                      context?.contractFileUrlContractType1 != '' && (
                        <Tag
                          icon={<PaperClipOutlined />}
                          color="blue"
                          onClick={(e) => openModal(e)}
                        >
                          File hợp đồng đã ký
                        </Tag>
                      )}
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CommonInfoContent;
