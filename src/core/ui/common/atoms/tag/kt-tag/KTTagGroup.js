import React from 'react';
import { MoreOutlined } from '@ant-design/icons';
import { Space, Popover } from 'antd';
import { chain } from 'lodash';
import KTTag from './KTTag';

const KTTagGroup = (props) => {
  const {
    tags = [],
    maxCount,
    maxPopoverPlacement = 'bottom',
    className = '',
  } = props;

  const numOfChildren = tags.length;

  if (maxCount && maxCount < numOfChildren) {
    let childrenShow = [];
    let childrenHidden = [];
    const ret = chain(tags)
      .groupBy('type') // thực hiện nhóm các phần tử thành các mảng theo tag type tương ứng
      .orderBy('length', 'asc') // chú ý cần sắp xếp theo độ dài các mảng loại phần tử sau khi groupby, nếu không sẽ bị lỗi
      .value();
    let groupCount = Object.keys(ret).length;
    let currentCount = maxCount;
    let sliceCount = Math.floor(currentCount / groupCount);
    let sliceCountMod = currentCount % groupCount;
    Object.values(ret).forEach((group) => {
      if (childrenShow.length >= maxCount) {
        childrenHidden.push(...group);
        return;
      }
      const applySlice = sliceCountMod > 0 ? sliceCount + 1 : sliceCount;
      if (group.length >= applySlice) {
        childrenShow.push(...group.slice(0, applySlice));
        childrenHidden.push(...group.slice(applySlice));
        sliceCountMod--;
      } else {
        // Trường hợp nhóm tag hết phần từ thì thực hiện giảm count tổng,
        // remove group hiện tại khỏi danh sách
        // thực hiện tính toán lại các biến đếm cho vòng mới
        childrenShow.push(...group);
        ret.shift();
        groupCount--;
        currentCount -= group.length;
        if (groupCount > 0) {
          sliceCount = Math.floor(currentCount / groupCount);
          sliceCountMod = currentCount % groupCount;
        }
      }
    });
    return (
      <Space wrap size={0} className={className}>
        {childrenShow.map(({ label, ...props }, index) => {
          return (
            <KTTag key={index} {...props}>
              {label}
            </KTTag>
          );
        })}
        <Popover
          key="kt-tag-group-popover-key"
          content={
            <Space
              wrap
              size={[4, 8]}
              style={{
                maxWidth: '30vw',
              }}
            >
              {childrenHidden.map(({ label, ...props }, index) => {
                return (
                  <KTTag key={index} {...props}>
                    {label}
                  </KTTag>
                );
              })}
            </Space>
          }
          trigger="hover"
          placement={maxPopoverPlacement}
        >
          <MoreOutlined
            size={24}
            style={{
              width: 0,
            }}
          />
        </Popover>
      </Space>
    );
  }
  return (
    tags && (
      <Space wrap size={4} className={className}>
        {tags.map(({ label, ...props }, index) => {
          return (
            <KTTag key={index} {...props}>
              {label}
            </KTTag>
          );
        })}
      </Space>
    )
  );
};

export default KTTagGroup;
