import React, { useMemo } from 'react';
import { Row, Pagination } from 'antd';
import './KTPagination.css';

const KTPagination = (props) => {
  const { totalCount, pageSize, currentPage, showSizeChanger, onChange } =
    props;

  return useMemo(() => {
    return (
      <Row justify="end" className="kt-pagination">
        <Pagination
          total={totalCount}
          showTotal={(total, range) =>
            `Hiển thị từ ${range[0]} đến ${range[1]} trong số ${total} bản ghi`
          }
          defaultPageSize={pageSize}
          defaultCurrent={currentPage}
          showSizeChanger={showSizeChanger}
          showLessItems={true}
          onChange={onChange}
        />
      </Row>
    );
  }, [props]);
};
export default KTPagination;
