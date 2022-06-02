import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import _ from 'lodash';
import useConfig from 'core/modules/config/domain/ConfigDomain';
import KTTag from '../kt-tag/KTTag';

const KTTagSubject = (props) => {
  const { tags, type, bold } = props;

  const configs = useConfig()[0];

  const [subjectTags, setSubjectTags] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(configs.subjects) && tags) {
      let subjectTags = [];
      tags.split(',').forEach((key) => {
        if (key.includes('subject')) {
          const subject = configs.subjects.filter((g) => {
            return g.value === key;
          });
          subjectTags.push(subject[0]);
        }
      });
      setSubjectTags(subjectTags);
    }
  }, [configs?.subjects, tags]);

  return (
    <Space wrap size={1}>
      {subjectTags.map((tag) => {
        return (
          <KTTag key={tag.value} type={type} bold={bold}>
            {tag.label}
          </KTTag>
        );
      })}
    </Space>
  );
};

export default KTTagSubject;
