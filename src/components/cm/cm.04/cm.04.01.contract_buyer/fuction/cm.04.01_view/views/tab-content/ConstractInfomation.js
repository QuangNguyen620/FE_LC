import React, { useEffect } from 'react';
import { Col, Row, Form, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
import RejectSignBuyer from './RejectSignBuyer';

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();

  //console.log('ConstractInfomation');

  //get Options or hardcode Options
  // const [listPositions, setListPositions] = useState([
  //   { label: 'Người đại diện pháp luật', value: 'legal_representative' },
  //   { label: 'Kế toán trưởng', value: 'accountant' },
  // ]);

  // const [sellerNameOptions, setSelerNameOptions] = useState([]);
  // const [representativeSellerOptions, setrepresentativeSellerOptions] =
  //   useState([]);
  // const [buyerNameOptions, setBuyerNameOptions] = useState([]);
  // const [representativeBuyerOptions, setrepresentativeBuyerOptions] = useState(
  //   [],
  // );

  useEffect(() => {
    // console.log('context::: ', context);
    // setSelerNameOptions(context?.sellerNameOptions);
    // setrepresentativeSellerOptions(context?.representativeSellerOptions);
    // setBuyerNameOptions(context?.buyerNameOptions);
    // setrepresentativeBuyerOptions(context?.representativeBuyerOptions);
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

  // // thay đổi với các input type = date;
  // function getSellerName(sellerId) {
  //   let sellerNameOptions = context?.sellerNameOptions;
  //   if (sellerNameOptions != undefined && sellerNameOptions != null) {
  //     sellerNameOptions.forEach((element) => {
  //       if (element.value == sellerId) {
  //         return element.label;
  //       }
  //     });
  //   }
  // }
  console.log('ConstractInfomation::: ');

  return (
    <>
      <div className="content-step">
        <Row>
          <Col span={24}>
            <Row>
              <Col span={23}>
                <Row>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Mã hợp đồng</Form.Item>
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractCode'}>
                      {context?.contractCode}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Số hợp đồng</Form.Item>
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractNo'}>
                      {context?.contractNo}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Căn cứ Luật</Form.Item>
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'pursuantLaw'}>
                      <pre className={'pre-textare-view'}>
                        {context?.pursuantLaw}
                      </pre>
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Ngày lập Hợp đồng</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'contractEstablishmentDate'}>
                      {context?.contractEstablishmentDate}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Tên Bên bán</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'sellerName'}>
                      {context?.sellerCorporateName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Địa chỉ bên bán</Form.Item>
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'sellerAddress'}>
                      {context?.sellerAddress}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Đại diện Bên bán</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'representativeSeller'}>
                      {context?.representativeSellerName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Chức vụ</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'sellerPosition'}>
                      {context?.sellerPositionName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Tên Bên mua</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'buyerName'}>
                      {context?.buyerCorporateName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Địa chỉ Bên mua</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'buyerAddress'}>
                      {context?.buyerAddress}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Đại diện Bên mua</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'representativeBuyer'}>
                      {context?.representativeBuyerName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item>Chức vụ</Form.Item>{' '}
                    <span className={'text-require'}> </span>
                  </Col>
                  <Col span={16}>
                    <Form.Item name={'buyerPosition'}>
                      {context?.buyerPositionName}
                    </Form.Item>
                  </Col>
                  <Divider className="divider-view" />
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
            <Row
              style={{
                display: context?.showViewRejectSignBuyer ? 'flex' : 'none',
              }}
            >
              <Col span={24}>
                <RejectSignBuyer />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConstractInfomation;
