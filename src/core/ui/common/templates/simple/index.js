import PropTypes from 'prop-types';
import { KTPageHeader } from '../../organisms/KTPageHeader';
import { KTSimpleLayout } from './KTSimpleLayout';
import KTSimpleLayoutPosition from './KTSimpleLayoutPosition';
import { Content } from 'antd/lib/layout/layout';

KTSimpleLayout.Header = KTPageHeader;

KTSimpleLayout.Header.propTypes = {
  position: PropTypes.string,
};
KTSimpleLayout.Header.defaultProps = {
  position: KTSimpleLayoutPosition.HeaderPanel,
};

KTSimpleLayout.Content = Content;

KTSimpleLayout.Content.propTypes = {
  position: PropTypes.string,
};
KTSimpleLayout.Content.defaultProps = {
  position: KTSimpleLayoutPosition.ContentPanel,
};

KTSimpleLayout.propTypes = {
  /**
   * Kích thước
   */
  children: PropTypes.array,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

KTSimpleLayout.defaultProps = {
  children: [],
  onClick: undefined,
};

export { KTSimpleLayout };
