import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import _ from 'lodash';
import useConfig from 'core/modules/config/domain/ConfigDomain';
import KTTag from '../kt-tag/KTTag';

const KTTagGrade = (props) => {
  const { tags, type, bold } = props;

  const configs = useConfig()[0];

  const [gradeTags, setGradeTags] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(configs.grades) && tags) {
      let gradeTags = [];
      tags.split(',').forEach((key) => {
        if (key.includes('grade')) {
          const grade = configs.grades.filter((g) => {
            return g.value === key;
          });
          gradeTags.push(grade[0]);
        }
      });
      setGradeTags(gradeTags);
    }
  }, [configs?.grades, tags]);
  return (
    <Space wrap size={1}>
      {gradeTags.map((tag) => {
        return (
          <KTTag key={tag.value} type={type} bold={bold}>
            {tag.label}
          </KTTag>
        );
      })}
    </Space>
  );
};

export default KTTagGrade;
