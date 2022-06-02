// argument type regex:
// - string: (.*)
// - number: (\d+)

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { defineFeature, loadFeature } from 'jest-cucumber';
// chú ý đường dẫn từ thư mục gốc
const feature = loadFeature(
  'src/core/ui/common/atoms/button/__specs__/KTIconButton.feature',
);
defineFeature(feature, (test) => {
  let props;
  let componentType;
  beforeEach(() => {
    // reset data
    props = {};
  });

  test('Kiểm tra hiển thị', ({ given, when, then }) => {
    given(/^Màn hình chứa KTIconButton$/, () => {
      componentType = 'KTIconButton';
    });
    when(/^điều kiện$/, () => {
      props = true;
    });
    given(/^trả về đúng$/, () => {
      expect(componentType).toBe('KTIconButton');
      expect(props).toBe(true);
    });
  });
});
