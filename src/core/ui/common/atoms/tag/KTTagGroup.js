// import React from 'react';
// import toArray from 'rc-util/lib/Children/toArray';
// import { cloneElement } from '../_util/reactNode';
// import { Popover } from 'antd';
// import KTTag from './KTTag';

// const KTTagGroup = (props) => {
//   const {  maxCount, maxStyle, size } = props;

//   const { children, maxPopoverPlacement = 'top' } = props;
//   const childrenWithProps = toArray(children).map((child, index) =>
//     cloneElement(child, {
//       key: `avatar-key-${index}`,
//     }),
//   );
//   const numOfChildren = childrenWithProps.length;
//   if (maxCount && maxCount < numOfChildren) {
//     const childrenShow = childrenWithProps.slice(0, maxCount);
//     const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
//     childrenShow.push(
//       React.createElement(
//         Popover,
//         {
//           key: 'avatar-popover-key',
//           content: childrenHidden,
//           trigger: 'hover',
//           placement: maxPopoverPlacement,
//           overlayClassName: `KTTagGroup-popover`,
//         },
//         React.createElement(KTTag, { style: maxStyle }, `+${numOfChildren - maxCount}`),
//       ),
//     );
//     return React.createElement(SizeContextProvider, { size: size }, React.createElement('div', { className: cls, style: props.style }, childrenShow));
//   }
//   return React.createElement(
//     SizeContextProvider,
//     { size: size },
//     React.createElement('div', { className: cls, style: props.style }, childrenWithProps),
//   );
// };
// export default KTTagGroup;
