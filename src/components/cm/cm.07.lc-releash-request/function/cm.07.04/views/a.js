//Data state//
// const [applicationOpeningLcRequest, setInput] = useState({
//   bankId: 1,
//   proposalCodeRelease: null,
//   contractType: 2,
//   contractCode: 'MHD123',
//   contractNumber: 'SHD123',

//   //tab 1
//   lcType: 'L/C thông thường (không phải UPAS L/C)',
//   corporateBuy: '',
//   corporateSell: '',
//   proposalDate: '2022-03-09',
//   bankConfirm: 1,
//   bankConfirmAddress: '',
//   bankTranfer: 1,
//   confirmationInstruction: 1,
//   confirmingBankRequest: 0,
//   moneyType: 'VND',
//   valueLc: 5000000,
//   negativeTolerance: 10,
//   positiveTolerance: 25,
//   termOfPayment: 1,
//   noteTermOfPayment: null,
//   paymentAmount: '100% trị giá',
//   dueDate: '2022-03-09',
//   dueAddress: 'HN',
//   fee: 'Phí ngân hàng phát hành do bên đề nghị chịu, các phí khác do bên thụ hưởng chịu.',
//   presentationAt: 'NH bất kỳ/ Any Bank',

//   //Tab 3
//   partialShipment: true,
//   transhipment: false,
//   placeOfReceipt: 'Hoang Mai, Ha Noi',
//   placeOfDestination: 'hoang mai hn',
//   portOfDeparture: 'mncjnjd',
//   lastestDeliveryDate: '2022-03-09',
//   portOfDestination: null,
//   deliveryTime: null,
//   deliveryTerm: 'ko co',
//   descriptionOfGoods: 'ok',
//   productsRequest: [],

//   //Tab 3
//   periodForPresentation: '2022-03-09',
//   otherCondition: 'no',
//   licenses: [],

//   //Tab 4
//   ttReimbursement: true,
//   holdAccount: 4,
//   feeAccount: 4,
//   paymentAccount: 4,
//   commitmentCustomer: 'adncjj',
// });

// // const [corporate, setCorporateData] = useState({});
// const [listCorporate, setListCorporate] = useState([]);
// const [listCorporateAccount, setListCorporateAccount] = useState([]);
// // const corporate = useRef({});
// //-----------end-------------------//

//Data function//

// useEffect(() => {
//   const getLogedUserCorporate = () => {
//     var config = domain.getCorporateByID();

//     config
//       .then((result) => {
//         axios(result)
//           .then(function (response) {
//             var tempObj = response.data.data;

//             if (applicationOpeningLcRequest.contractType == 2) {
//               setInput({
//                 ...applicationOpeningLcRequest,
//                 corporateBuy: tempObj.corporateId,
//               });
//               form.setFieldsValue({
//                 corporateBuy: tempObj.corporateName,
//                 corporateBuyAddress: tempObj.corporateAddress,
//               });
//             } else {
//               setInput({
//                 ...applicationOpeningLcRequest,
//                 corporateBuy: '',
//               });
//               form.setFieldsValue({
//                 corporateBuy: '',
//                 corporateBuyAddress: '',
//               });
//             }
//           })
//           .catch(function (error) {
//             console.log(error.data);
//           });
//       })
//       .catch((err) => console.log(err));
//   };

//   getLogedUserCorporate();
// }, [applicationOpeningLcRequest.contractType]);

// useEffect(() => {
//   const getLogedUserCorporateAccount = () => {
//     var config = domain.getCorporateAccountByCorporateID();

//     config
//       .then((result) => {
//         axios(result)
//           .then(function (response) {
//             var tempObj = response.data.data;
//             setListCorporateAccount(tempObj);
//           })
//           .catch(function (error) {
//             console.log(error.data);
//           });
//       })
//       .catch((err) => console.log(err));
//   };

//   getLogedUserCorporateAccount();
// }, []);

// useEffect(() => {
//   const init = () => {
//     setInput({
//       ...applicationOpeningLcRequest,
//       contractType: 2,

//       //tab 1
//       lcType: 'L/C thông thường (không phải UPAS L/C)',
//       confirmationInstruction: 1,
//       confirmingBankRequest: 0,
//       presentationAt: '',
//       termOfPayment: 1,
//       paymentAmount: '100% trị giá hóa đơn',
//       //Tab 2
//       partialShipment: true,
//       transhipment: true,
//       //Tab 3
//       //Tab 4
//       ttReimbursement: true,
//     });

//     if (applicationOpeningLcRequest.contractType == 2) {
//       setLCTypeList(contractType2LCType);
//     }

//     form.setFieldsValue({
//       contractType: applicationOpeningLcRequest.contractType,
//       paymentAmount: '100% trị giá hóa đơn',
//     });
//   };

//   init();
// }, []);

// useEffect(() => {
//   const getListCorporate = () => {
//     var config = domain.getAllCorporate();

//     config
//       .then((result) => {
//         axios(result)
//           .then(function (response) {
//             console.log('Fetched data');
//             console.log(response.data.data);
//             setListCorporate(response.data.data);
//           })
//           .catch(function (error) {
//             console.log(error.data);
//           });
//       })
//       .catch((err) => console.log(err));
//   };

//   getListCorporate();
// }, []);

// function onReleashBankChange(value) {
//   setInput({
//     ...applicationOpeningLcRequest,
//     bankId: value,
//   });
// }

// function onContactTypeChange(value) {
//   setInput({
//     ...applicationOpeningLcRequest,
//     contractType: value,
//   });
// }

// function onContractCodeChange(e) {
//   setInput({
//     ...applicationOpeningLcRequest,
//     contractCode: e.target.value,
//   });
// }

// function onContractNumberChange(e) {
//   setInput({
//     ...applicationOpeningLcRequest,
//     contractNumber: e.target.value,
//   });
// }

// const handleSaveDateProduct = (data) => {
//   console.log('a');

//   setInput({ ...applicationOpeningLcRequest, productsRequest: data });
// };

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

// Add new user group--------------

// const submitHandler = () => {
//   var lcRequest = {
//     bankId: applicationOpeningLcRequest.bankId,
//     proposalCodeRelease: applicationOpeningLcRequest.proposalCodeRelease,
//     contractType: applicationOpeningLcRequest.contractType,
//     contractCode: applicationOpeningLcRequest.contractCode,
//     contractNumber: applicationOpeningLcRequest.contractNumber,

//     //tab 1
//     lcType: applicationOpeningLcRequest.lcType,
//     corporateBuyId: applicationOpeningLcRequest.corporateBuy,
//     corporateSellId: applicationOpeningLcRequest.corporateSell,
//     proposalDate: convert(applicationOpeningLcRequest.proposalDate),
//     // '2022-03-09',
//     bankConfirmId: applicationOpeningLcRequest.bankConfirm,
//     bankConfirmAddress: applicationOpeningLcRequest.bankConfirmAddress,
//     bankTranferId: applicationOpeningLcRequest.bankTranfer,
//     confirmationInstruction:
//       applicationOpeningLcRequest.confirmationInstruction,
//     confirmingBankRequest: applicationOpeningLcRequest.confirmingBankRequest,
//     moneyType: applicationOpeningLcRequest.moneyType,
//     valueLc: applicationOpeningLcRequest.valueLc,
//     negativeTolerance: applicationOpeningLcRequest.negativeTolerance,
//     positiveTolerance: applicationOpeningLcRequest.positiveTolerance,
//     termOfPayment: applicationOpeningLcRequest.termOfPayment,
//     noteTermOfPayment: applicationOpeningLcRequest.noteTermOfPayment,
//     paymentAmount: applicationOpeningLcRequest.paymentAmount,
//     dueDate: convert(applicationOpeningLcRequest.dueDate),
//     dueAddress: applicationOpeningLcRequest.dueAddress,
//     fee: applicationOpeningLcRequest.fee,
//     presentationAt: applicationOpeningLcRequest.presentationAt,

//     //Tab 3
//     partialShipment: applicationOpeningLcRequest.partialShipment,
//     transhipment: applicationOpeningLcRequest.transhipment,
//     placeOfReceipt: applicationOpeningLcRequest.placeOfReceipt,
//     placeOfDestination: applicationOpeningLcRequest.placeOfDestination,
//     portOfDeparture: applicationOpeningLcRequest.portOfDeparture,
//     lastestDeliveryDate: convert(
//       applicationOpeningLcRequest.lastestDeliveryDate,
//     ),
//     portOfDestination: applicationOpeningLcRequest.portOfDestination,
//     deliveryTime: convert(applicationOpeningLcRequest.deliveryTime),
//     deliveryTerm: applicationOpeningLcRequest.deliveryTerm,
//     descriptionOfGoods: applicationOpeningLcRequest.descriptionOfGoods,
//     productsRequest: applicationOpeningLcRequest.productsRequest,

//     //Tab 3
//     periodForPresentation: applicationOpeningLcRequest.periodForPresentation,
//     otherCondition: applicationOpeningLcRequest.otherCondition,
//     licenses: applicationOpeningLcRequest.licenses,

//     //Tab 4
//     ttReimbursement: applicationOpeningLcRequest.ttReimbursement,
//     holdAccountId: applicationOpeningLcRequest.holdAccount,
//     feeAccountId: applicationOpeningLcRequest.feeAccount,
//     paymentAccountId: applicationOpeningLcRequest.paymentAccount,
//     commitmentCustomer: applicationOpeningLcRequest.commitmentCustomer,
//   };
//   var data = new FormData();
//   data.append('file', selectedFile);
//   data.append('applicationOpeningLcRequest', JSON.stringify(lcRequest));
//   console.log('Received values of form: ', data);
//   var configPromise = domain.createApplicationOpeningLc(data);
//   configPromise
//     .then((result) => {
//       axios(result)
//         .then(function (response) {
//           console.log(response.data);
//           setAddSuccessfulDialogVisible(true);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     })
//     .catch((err) => console.log(err));
// };
//--------------end------------------//

{
  /* <Row style={{ paddingLeft: 16, paddingTop: 16 }}>
          <Col span={15}>
            <KTTitle size={2}>Đề nghị phát hành L/C</KTTitle>
          </Col>
        </Row>

        <Row style={{ padding: 16 }}>
          <Col span={24}>
            <Form
              form={form}
              onFinish={submitHandler}
              onFinishFailed={onFinishFailed}
              layout="horizontal"
            >
              <Row>
                <Col span={23}>
                  <Row>
                    <Col span={8}>
                      Mã đề nghị phát hành L/C
                      <span style={{ color: '#F5222D' }}></span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'proposalCodeRelease'}>
                        <Input disabled name="proposalCodeRelease" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Ngân hàng phát hành{' '}
                      <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        onChange={onReleashBankChange}
                        name={'releseashBankId'}
                      >
                        <Select placeholder={'Chọn ngân hàng phát hành'}>
                          {bankList.map((bank) => (
                            <Select.Option value={bank.id}>
                              {bank.bankName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Loại hợp đồng<span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'contractType'}>
                        <Select
                          onChange={onContactTypeChange}
                          placeholder="Chọn loại hợp đồng"
                        >
                          {' '}
                          {contractTypeList.map((type) => (
                            <Select.Option value={type.value}>
                              {type.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={8}>
                      Mã hợp đồng <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      {applicationOpeningLcRequest.contractType == 2 ? (
                        <Form.Item name={'contractCode'}>
                          <Input
                            onChange={onContractCodeChange}
                            name="contractCode"
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item name={'contractCode'}>
                          <Select name="contractCode"></Select>
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Số hợp đồng <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      {applicationOpeningLcRequest.contractType == 2 ? (
                        <Form.Item name={'contractNumber'}>
                          <Input
                            onChange={onContractNumberChange}
                            name="contractNumber"
                          />
                        </Form.Item>
                      ) : (
                        <Form.Item name={'contractNumber'}>
                          <Input disabled name="contractNumber" />
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      Đính kèm hợp đồng{' '}
                      <span style={{ color: '#F5222D' }}>*</span>
                    </Col>
                    <Col span={16}>
                      <Form.Item name={'file'}>
                        {isFilePicked ? (
                          <div>
                            <p>{selectedFile.name}</p>
                          </div>
                        ) : (
                          <p>Select a file to show details</p>
                        )}{' '}
                        <span>
                          <label
                            for="file-upload-contact"
                            class="custom-file-upload "
                          >
                            Đính kèm
                          </label>
                          <input
                            type="file"
                            name="file"
                            onChange={changeHandler}
                            id="file-upload-contact"
                          />
                          <Button
                            style={{ height: '31px' }}
                            className="common-btn"
                          >
                            Upload
                          </Button>
                        </span>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <Tabs defaultActiveKey="0" onChange={callback}>
                        <TabPane tab="Thông tin chung" key="0">
                          <CommonInfoContent
                            applicationOpeningLcRequest={
                              applicationOpeningLcRequest
                            }
                            lcTypeList={lcTypeList}
                            bankList={bankList}
                            moneyTypeList={moneyTypeList}
                            setInput={setInput}
                            listCorporate={listCorporate}
                            form={form}
                          />
                        </TabPane>
                        <TabPane tab="Giao hàng" key="1">
                          <ShipmentContent
                            applicationOpeningLcRequest={
                              applicationOpeningLcRequest
                            }
                            setInput={setInput}
                            form={form}
                            handleSaveDateProduct={handleSaveDateProduct}
                          />
                        </TabPane>
                        <TabPane tab="Chứng từ xuất trình" key="2">
                          <DocumentContent
                            applicationOpeningLcRequest={
                              applicationOpeningLcRequest
                            }
                            setInput={setInput}
                            form={form}
                            timeUnitList={timeUnitList}
                          />
                        </TabPane>
                        <TabPane tab="Các điều khoản đặc biệt" key="3">
                          <SpecialRegularContent
                            applicationOpeningLcRequest={
                              applicationOpeningLcRequest
                            }
                            setInput={setInput}
                            form={form}
                            listCorporateAccount={listCorporateAccount}
                          />
                        </TabPane>
                      </Tabs>
                    </Col>
                  </Row>

                  <div style={{ textAlign: '-webkit-center' }} id="form-footer">
                    <Form.Item>
                      <Space
                        direction="horizontal"
                        size={16}
                        style={{
                          marginRight: 'auto',
                        }}
                      >
                        <Button className="common-btn">Tạo Draft L/C</Button>
                        <Button
                          className="common-btn"
                          onClick={(e) => {
                            openSendModal();
                          }}
                        >
                          Gửi yêu cầu tạo Draft L/C đến NHPH
                        </Button>
                        <Button className="common-btn">Lưu</Button>
                        <Button className="common-btn" htmlType="submit">
                          Xác nhận
                        </Button>
                        <Button
                          onClick={(e) => {
                            domain.exitHandler();
                          }}
                          className="secondary-btn"
                        >
                          Đóng
                        </Button>
                      </Space>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={1}></Col>
              </Row>
            </Form>
          </Col>
        </Row> */
}
