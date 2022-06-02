import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row, Form, Select, Input, Button, Space, Tree } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { KTTitle } from 'core/ui';

import { useHistory } from 'react-router';
import '../../../../common/less/BM010301.less';
import { BM010301Domain } from '../../domains/BM010301ViewDomain';
var axios = require('axios');
const { Option } = Select;

const BM010301AuthorizeAdd = ({ lang = 'vi', ...props }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const history = useHistory();
  const { t } = useTranslation();
  const [context, domain] = BM010301Domain();

  const [expandedKeys, setExpandedKeys] = useState(['Root', 'system-admin']);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // const [language_menu_visible, setMenuVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [userGroup, setUserGroup] = useState({
    groupId: '',
    userGroupCode: '',
    userGroupName: '',
    channels: '',
    userType: '',
    groupType: '',
    branchLevel: '',
    branch: '',
    department: '',
    role: '',
    status: 0,
    description: '',
    permission: null,
    rolesDescription: '',
    roleResponse: null,
  });
  //Value state

  useEffect(() => {
    setTreeData([context?.userGroupPermission?.roleResponse]);
    setCheckedKeys(context?.bankUserGroup?.permissionList);
    setExpandedKeys(['Root', 'system_management', 'bank_management']);
    console.log('useEffect--', context);
  }, [context?.userGroupPermission]);

  //------------------------------//
  const onExpand = (expandedKeysValue) => {
    console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
    domain.onChangePemission(checkedKeysValue);
  };

  return (
    <>
      <div className={'main-container'}>
        <Row className={'padding-title'}>
          {/* abc */}
          <Col span={1}></Col>
          <Col span={21}>
            <Row>
              <Col span={24}>
                <Tree
                  disabled
                  checkable
                  onExpand={onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={onCheck}
                  checkedKeys={checkedKeys}
                  // onSelect={onSelect}
                  selectedKeys={selectedKeys}
                  treeData={treeData}
                />
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    </>
  );
};

export default BM010301AuthorizeAdd;
