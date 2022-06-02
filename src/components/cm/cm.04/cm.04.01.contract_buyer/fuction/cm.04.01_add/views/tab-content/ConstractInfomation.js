import React, { useEffect, useState } from 'react';
import {
  Col,
  Row,
  Input,
  Form,
  Select,
  DatePicker,
  Divider,
} from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
import moment from 'moment';

const { TextArea } = Input;

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();
  const dateFormatList = 'DD/MM/YYYY';

  //console.log('ConstractInfomation');
  function convert(str) {
    if (str != undefined && str != null && str != '') {
      var date = new Date(str),
        mnth = ('0' + (date.getMonth() + 1)).slice(-2),
        day = ('0' + date.getDate()).slice(-2);
      if (dateFormatList == 'DD/MM/YYYY') {
        return [day, mnth, date.getFullYear()].join('/');
      } else {
        return [date.getFullYear(), mnth, day].join('-');
      }
    } else {
      return '';
    }
  }

  //get Options or hardcode Options
  const [listPositions, setListPositions] = useState([
    { label: 'Người đại diện pháp luật', value: 'legal_representative' },
    { label: 'Kế toán trưởng', value: 'accountant' },
  ]);

  const [sellerNameOptions, setSelerNameOptions] = useState([]);
  const [representativeSellerOptions, setrepresentativeSellerOptions] =
    useState([]);
  const [buyerNameOptions, setBuyerNameOptions] = useState([]);
  const [representativeBuyerOptions, setrepresentativeBuyerOptions] = useState(
    [],
  );

  useEffect(() => {
    // console.log('context::: ', context);
    setSelerNameOptions(context?.sellerNameOptions);
    setrepresentativeSellerOptions(context?.representativeSellerOptions);
    setBuyerNameOptions(context?.buyerNameOptions);
    setrepresentativeBuyerOptions(context?.representativeBuyerOptions);
  }, [context]);

  // const representativeSellerOptions = [...props.representativeSellerOptions];
  // //console.log('representativeSellerOptions::: ', representativeSellerOptions);

  // const buyerNameOptions = [...props.buyerNameOptions];
  //console.log('buyerNameOptions::: ', buyerNameOptions);

  // const representativeBuyerOptions = [...props.representativeBuyerOptions];
  //console.log('representativeBuyerOptions::: ', representativeBuyerOptions);

  // khi thay đổi tên bên bán
  function onChangeConstractSelectSellerName(e) {
    console.log('onChangeConstractSelectSellerName::: ');
    domain.onChangeConstractSelectSellerName(this.name, e);
    // props.onChangeConstractSelectSellerName(this.name, e);
  }

  // khi thay đổi ng đại diện bên bán
  function onChangerepresentativeSeller(e) {
    domain.onChangerepresentativeSeller(this.name, e);
  }

  // khi thay đổi ng đại diện bên mua
  function onChangerepresentativeBuyer(e) {
    domain.onChangerepresentativeBuyer(this.name, e);
  }

  // thay đổi với các input type = date;
  function onChangeConstractText(e) {
    domain.onChangeConstractText(e);
  }

  // thay đổi với các input type = Select;
  function onChangeConstractSelect(e) {
    domain.onChangeConstractSelect(this.name, e);
  }

  // thay đổi với các input type = date;
  function onChangeConstractDate(e) {
    domain.onChangeConstractDate(this.name, e);
  }

  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <KTTitle size={2}>
                  <b>Thông tin chung</b>
                </KTTitle>
              </Col>
              <Divider className="divider-customer" />
            </Row>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Mã hợp đồng
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractCode'}>
                      <Input
                        disabled
                        name="contractCode"
                        onChange={onChangeConstractText}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Số hợp đồng
                    <span style={{ color: '#F5222D' }}></span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'contractNo'}
                      rules={[
                        // {
                        //   whitespace: true,
                        //   required: true,
                        //   message:
                        //     'Trường số hợp đồng không được phép để trống!',
                        // },
                        {
                          max: 20,
                          message:
                            'Trường số hợp đồng không được phép vượt quá 20 ký tự!',
                        },
                      ]}
                    >
                    <Input
                        name="contractNo"
                        onChange={onChangeConstractText}
                        maxLength={20}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Căn cứ Luật
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'pursuantLaw'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường căn cứ luật không được phép để trống!',
                        },
                        {
                          max: 500,
                          message:
                            'Trường căn cứ luật không được phép vượt quá 500 ký tự!',
                        },
                      ]}
                    >
                    <TextArea
                        name="pursuantLaw"
                        onChange={onChangeConstractText}
                        maxLength={500}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Ngày lập hợp đồng{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'contractEstablishmentDate'}
                      initialValue={moment(new Date())}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường ngày lập Hợp đồng không được phép để trống!',
                        },
                      ]}
                    >
                      <DatePicker
                        name="contractEstablishmentDate"
                        style={{ width: '100%' }}
                        defaultValue={moment(new Date())}
                        format={dateFormatList}
                        placeholder="DD/MM/YYYY"
                        onChange={onChangeConstractDate}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tên bên bán <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'sellerName'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường tên bên bán không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'sellerName'}
                        onChange={onChangeConstractSelectSellerName}
                        // placeholder="Chọn"
                      >
                        {context?.sellerNameOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Địa chỉ bên bán
                    <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'sellerAddress'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường địa chỉ bên bán không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="sellerAddress"
                        onChange={onChangeConstractText}
                        // value={user1Deputyelements}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Đại diện bên bán <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'representativeSeller'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường đại diện Bên bán không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'representativeSeller'}
                        onChange={onChangerepresentativeSeller}
                      >
                        {representativeSellerOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chức vụ <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'sellerPosition'}>
                      <Select disabled name={'sellerPosition'}>
                        {listPositions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tên bên mua <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'buyerName'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường tên bên mua không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'buyerName'}
                        onChange={onChangeConstractSelect}
                      >
                        {buyerNameOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Địa chỉ bên mua <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'buyerAddress'}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường địa chỉ bên mua không được phép để trống!',
                        },
                      ]}
                    >
                      <Input
                        name="buyerAddress"
                        onChange={onChangeConstractText}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Đại diện bên mua <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'representativeBuyer'}
                      rules={[
                        {
                          required: true,
                          message:
                            'Trường đại diện Bên mua không được phép để trống!',
                        },
                      ]}
                    >
                      <Select
                        name={'representativeBuyer'}
                        onChange={onChangerepresentativeBuyer}
                      >
                        {representativeBuyerOptions?.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Chức vụ <span className={'text-require'}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'buyerPosition'}>
                      <Select disabled name={'buyerPosition'}>
                        {listPositions.map((element) => (
                          <Select.Option value={element.value}>
                            {element.label}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
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

export default ConstractInfomation;
