import { createIntl } from '@ant-design/pro-table';

/* eslint-disable no-template-curly-in-string */
const intlProvider_vi_VN = createIntl('vi_VN', {
  moneySymbol: '₫',
  tableForm: {
    search: 'Tìm kiếm',
    reset: 'Làm lại',
    submit: 'Gửi đi',
    collapsed: 'Mở rộng',
    expand: 'Thu gọn',
    inputPlaceholder: 'nhập dữ liệu',
    selectPlaceholder: 'Vui lòng chọn',
  },
  form: {
    lightFilter: {
      more: 'Xem thêm',
      clear: 'Làm mới',
      confirm: 'Ok',
      itemUnit: 'N/A',
    },
  },
  alert: {
    clear: 'Bỏ chọn',
    selected: 'Đã chọn',
    item: 'mục',
  },
  pagination: {
    total: {
      range: 'Hiển thị ',
      total: 'trong số',
      item: 'bản ghi',
    },
  },
  tableToolBar: {
    leftPin: 'Ghim trái',
    rightPin: 'Ghim phải',
    noPin: 'Bỏ ghim',
    leftFixedTitle: 'Cố định trái',
    rightFixedTitle: 'Cố định phải',
    noFixedTitle: 'Chưa cố định',
    reset: 'Làm lại',
    columnDisplay: 'Cột hiển thị',
    columnSetting: 'Cấu hình',
    fullScreen: 'Chế độ toàn màn hình',
    exitFullScreen: 'Thoát chế độ toàn màn hình',
    reload: 'Làm mới',
    density: 'Mật độ hiển thị',
    densityDefault: 'Mặc định',
    densityLarger: 'Mặc định',
    densityMiddle: 'Trung bình',
    densitySmall: 'Chật',
  },
});

export default intlProvider_vi_VN;
