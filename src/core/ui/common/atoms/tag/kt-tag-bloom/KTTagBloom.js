import React from 'react';
import KTTag from '../kt-tag/KTTag';
import './KTTagBloom.less.css';

const KT_TAG_BLOOM_LEVELS = {
  1: 'Biết',
  3: 'Hiểu',
  5: 'Vận dụng',
  7: 'Vận dụng cao',
};

const KT_TAG_BLOOM_TYPE = {
  1: 'success',
  3: 'secondary',
  5: 'info',
  7: 'warning',
};

const KTTagBloom = ({ level = 0, emptyTitle = '' }) => {
  if (level === 0) {
    return (
      <KTTag title={emptyTitle} className="KTTagBloom" type="info">
        N/A
      </KTTag>
    );
  }

  return (
    <KTTag className="KTTagBloom" type={KT_TAG_BLOOM_TYPE[level]}>
      {KT_TAG_BLOOM_LEVELS[level]}
    </KTTag>
  );
};

export default KTTagBloom;
