export const TIME_OUT = 300000;
//------------------Constant for CM----------------------//
export const CorporateUserPosition = {
  legal_representative: 'legal_representative',
  accountant: 'accountant',
};

export const TABLE_PAGE_SIZE = 20;
export const TABLE_PAGE_INIT = 1;

export const dateFormatList = 'DD/MM/YYYY';

export const LC_TYPE = {
  LC_THONG_THUONG: '1',
  UPAS_LC: '2',
};

export const LC_STATUS = {
  KHOI_TAO: 1,
  CHO_KY_SO_KE_TOAN_TRUONG: 2,
  CHO_KY_SO_DOANH_NGHIEP: 3,
  DA_KY_SO: 4,
  TU_CHOI_KY_SO: 5,
  TU_CHOI_XU_LY: 6,
  DA_XU_LY: 7,
  CHO_XAC_NHAN_DRAFT: 8,
  TU_CHOI_DRAFT: 9,
  CHO_XAC_NHAN_TAI_TRO: 10,
  TU_CHOI_TAI_TRO: 11,
  TU_CHOI_BAO_GIA: 12,
  CHAP_NHAN_BAO_GIA: 13,
  HUY: 14,
};

export const LC_STATUS_LIST = [
  { value: 1, label: 'Khởi tạo' },
  { value: 2, label: 'Chờ ký số kế toán trưởng' },
  { value: 3, label: 'Chờ ký số doanh nghiệp' },
  { value: 4, label: 'Đã ký số' },
  { value: 5, label: 'Từ chối ký số' },
  { value: 6, label: 'Từ chố xử lý' },
  { value: 7, label: 'Đã xử lý' },
  { value: 8, label: 'Chờ xác nhận Draft' },
  { value: 9, label: 'Từ chối Draft' },
  { value: 10, label: 'Chờ xác nhận tài trợ' },
  { value: 11, label: 'Từ chối tài trợ' },
  { value: 12, label: 'Từ chối báo giá' },
  { value: 13, label: 'Chấp nhận báo giá' },
  { value: 14, label: 'Hủy' },
];

//------------------Constant for BM----------------------//
export const BANK_ROLE_LIST = [
  { name: 'Maker', value: 'Maker' },
  { name: 'Approver', value: 'Approver' },
];

export const BANK_BRANCH_LEVEL = [{ label: 'Hội sở chính', value: 'HO' }];

export const BANK_USER_GROUP_TYPE = [
  { label: 'Người dùng ngân hàng', value: 'BANK-USER' },
];

export const FUNDING_LIMIT_STATUS_LIST = [
  { value: 1, label: 'Chờ duyệt' },
  { value: 2, label: 'Đã duyệt' },
  { value: 3, label: 'Từ chối duyệt' },
];

export const FUNDING_LIMIT_STATUS = {
  CHO_DUYET: 1,
  DA_DUYET: 2,
  TU_CHOI_DUYET: 3,
};
export const USER_TYPE_BANK = 'Bank';
//------------------Constant for AM----------------------//

export const USER_TYPE_FPT = 'FPT';
