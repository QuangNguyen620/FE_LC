import React, { useEffect, useState } from 'react';

import { Col, Row, Input, Form, Select, Tabs, Divider, Button } from 'antd';
import { KTTitle } from 'core/ui';
import { useTranslation } from 'react-i18next';
import {} from '@ant-design/icons';
import '../../../../components/less/CM.04.01.less';
import { useCM0401Domain } from '../../domains/CM.04.01Domain';
const { TextArea } = Input;

var init = [
  // {
  //   addendumNo: 1,
  //   addendumName: '',
  //   addendumContent: '',
  // },
  // { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
];
// function callback(key) {
//   console.log(key);
// }
// const { Option } = Select;

const ConstractInfomation = ({ lang = 'vi' }) => {
  const [context, domain] = useCM0401Domain();
  const { t } = useTranslation();

  const [contractAddendum, setContractAddendum] = useState(
    context?.contractAddendum,
  );
  const [contractAddendumInit, setContractAddendumInit] = useState(
    context?.contractAddendumInit,
  );
  const [count, setCount] = useState(1);
  // const [countDel, setCountDel] = useState(0);

  useEffect(() => {
    setContractAddendum(context?.contractAddendum);
    setContractAddendumInit(context?.contractAddendumInit);
    setCount(context?.countAddendum);
    console.log('context o tab addume::: ', context);
  }, [context]);

  init = contractAddendumInit;

  // khi thay đổi tab plhd form
  function onChangeDataContractAddendum(data) {
    domain.onChangeDataContractAddendum(data);
  }
  // khi thay đổi tab plhd form
  function onChangeDataContractAddendumInit(data) {
    domain.onChangeDataContractAddendumInit(data);
  }
  // khi thay đổi khi add plhd
  function onChangeCountAddendum(data) {
    domain.onChangeCountAddendum(data);
  }

  const add = () => {
    const activeKey = count;
    var tempAdd = {
      title: 'Phụ lục hợp đồng',
      content: 'Content of new Tab',
      key: activeKey,
      ['addendumNo' + activeKey]: activeKey,
      ['addendumName' + activeKey]: '',
      ['addendumContent' + activeKey]: '',
    };

    //khởi tạo và set data số phụ lục

    let temp = {};
    temp.key = activeKey;
    temp.addendumNo = activeKey;
    temp.addendumName = '';
    temp.addendumContent = '';

    init.push(temp);

    var tempList = contractAddendum;
    tempList.push(tempAdd);

    onChangeDataContractAddendum(...tempList);
    onChangeDataContractAddendumInit(init);
    onChangeCountAddendum(count + 1);
    // setContractAddendum(...contractAddendum, tempList);

    console.log('contractAddendumAdd::', contractAddendum);
    console.log('panesAdd::', contractAddendum);
    console.log('initAdd::', init);
  };

  // const onChange = (activeKey) => {
  //   // setActiveState(activeKey);
  // };

  const onEdit = (targetKey, action) => {
    console.log('onEdit::', action);
    if (action == 'add') {
      add(targetKey);
    } else if (action == 'remove') {
      remove(targetKey);
    }
  };

  const remove = (key) => {
    var tempList = contractAddendum;
    const idx = tempList.findIndex((item) => +item.key === +key);
    tempList.splice(idx, 1);
    init.splice(idx, 1);

    onChangeDataContractAddendum(...tempList);
    onChangeDataContractAddendumInit(init);
  };

  // thay đổi với các input type = Text;
  function onChangeContractAnnexText(e, key) {
    // console.log('pane::', e);
    // var data = e.target.value;
    // var index = this.name.replace(/[^0-9]/g, '');
    // var name = this.name.replace(/[^a-zA-Z]/g, '');
    // // var index = this.name.slice(-1);
    // // var name = this.name;
    // // name = name.slice(0, name.length - 1);
    // init[index - 1][name] = data?.trim();
    // console.log('contractAddendum::', init);
    // onChangeDataContractAddendumInit(init);
    console.log('key::', key);

    const idx = init.findIndex((item) => +item.addendumNo === +key);
    var name = this.name.replace(/[^a-zA-Z]/g, '');

    init[idx][name] = e.target.value;

    console.log('idx::', idx);
    console.log('contractAddendum::', init);
    onChangeDataContractAddendumInit(init);
  }

  // thay đổi với các input type = Text;
  function onChangeAddendumName(e, key) {
    console.log('key::', key);

    const idx = init.findIndex((item) => +item.addendumNo === +key);

    init[idx].addendumName = e.target.value;

    console.log('contractAddendum::', idx);
    console.log('contractAddendum::', init);
    onChangeDataContractAddendumInit(init);
  }
  // thay đổi với các input type = Text;
  function onChangeAddendumContent(e, key) {
    console.log('key::', key);

    const idx = init.findIndex((item) => +item.addendumNo === +key);

    init[idx].addendumContent = e.target.value;

    console.log('contractAddendum::', idx);
    console.log('contractAddendum::', init);
    onChangeDataContractAddendumInit(init);
  }
  return (
    <>
      <div className={'container-addendum'}>
        {/* <Row>
          <Col span={24}>
            <Button
              className="common-btn button-add-adendum"
              onClick={() => {
                add();
              }}
            >
              {'Thêm phụ lục đính kèm + '}
            </Button>
          </Col>
        </Row> */}
        {contractAddendum?.map((addendum, index) => (
          <div className="content-step">
            <Row>
              <Col span={24}>
                <KTTitle size={2}>
                  <b>PHỤ LỤC {index + 1}</b>
                </KTTitle>
              </Col>
              <Divider />
              <Col span={23}>
                <Row>
                  <Col span={8}>
                    Phụ lục số
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      // name={'addendumNo' + [addendum?.key]}
                      initialValue={index + 1}
                    >
                      <Input
                        disabled
                        defaultValue={index + 1}
                        // name={'addendumNo' + [addendum?.key]}
                        onChange={onChangeContractAnnexText}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    Tên phụ lục hợp đồng{' '}
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'addendumName' + [addendum?.key]}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message:
                            'Trường tên phụ lục không được phép để trống!',
                        },
                        {
                          max: 100,
                          message:
                            'Trường tên phụ lục không được phép để vượt quá 100 ký tự!',
                        },
                      ]}
                    >
                      <Input
                        name={'addendumName' + [addendum?.key]}
                        onChange={(e) => onChangeAddendumName(e, addendum?.key)}
                        // onChange={onChangeContractAnnexText}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    Nội dung phụ lục hợp đồng
                    <span style={{ color: '#F5222D' }}>*</span>
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      name={'addendumContent' + [addendum?.key]}
                      rules={[
                        {
                          whitespace: true,
                          required: true,
                          message: 'Trường nội dung không được phép để trống!',
                        },
                        {
                          max: 5000,
                          message:
                            'Trường nội dung không được phép để vượt quá 5000 ký tự!',
                        },
                      ]}
                    >
                      <TextArea
                        name={'addendumContent' + [addendum?.key]}
                        onChange={(e) =>
                          onChangeAddendumContent(e, addendum?.key)
                        }
                        // onChange={onChangeContractAnnexText}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={1}></Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <Button
                  // style={{ display: contractAddendum.length == 1 ? 'none' : 'flex' }}
                  className="button-delete"
                  onClick={(e) => {
                    onEdit(addendum.key, 'remove');
                    // am010401Domain.exitHandler(id);
                  }}
                >
                  Xóa phụ lục này
                </Button>
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </>
  );
};

export default ConstractInfomation;
