import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from 'antd';
import _ from 'lodash';
import useConfig from 'core/modules/config/domain/ConfigDomain';
import cssStyle from './KTTag.module.css';

const KTTag2 = (props) => {
  const { tags } = props;
  const configs = useConfig()[0];

  const [gradeTags, setGradeTags] = useState([]);
  const [subjectTags, setSubjectTags] = useState([]);

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

  return useMemo(() => {
    return (
      <Avatar.Group maxCount={2} size="small">
        {gradeTags.map((tag) => {
          return (
            <div
              key={'gt' + tag.value}
              className={`${cssStyle['kt-tag']} ${cssStyle['kt-grade-tag']}`}
            >
              {tag.label}
            </div>
          );
        })}
        {subjectTags.map((tag) => {
          return (
            <div
              key={'st' + tag.value}
              className={`${cssStyle['kt-tag']} ${cssStyle['kt-subject-tag']}`}
            >
              {tag.label}
            </div>
          );
        })}
      </Avatar.Group>
    );
  }, [gradeTags, subjectTags]);
};

export default KTTag2;
