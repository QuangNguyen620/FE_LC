// logging-in.steps.js
// argument type regex:
// - string: (.*)
// - number: (\d+)
import React from 'react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { configure } from '@testing-library/dom';
import { KTPrimaryText, KTBodyText, KTTitle, KTSubTitle } from '../';

// chú ý đường dẫn từ thư mục gốc
const feature = loadFeature(
  'src/core/ui/common/atoms/typo/text/__specs__/KTText.feature',
);

configure({
  computedStyleSupportsPseudoElements: true,
});

defineFeature(feature, (test) => {
  let props;

  beforeEach(() => {
    // reset data
    props = {};
  });

  afterEach(cleanup);

  test('Kiểm tra hiển thị Title', ({ given, when, then }) => {
    given(/^Màn hình chứa KTTitle$/, () => {});

    when(
      /^theme is (.*), color is (.*), size is (.*)$/,
      (theme, color, size) => {
        props = { theme, color, size: parseInt(size) };
      },
    );

    then(
      /^Hiển thị đúng màu (.*) và kích thước (.*)$/,
      (expected_color, expected_size) => {
        let { container } = render(<KTTitle {...props} />);
        expect(container.firstChild).toHaveStyle(
          `color: ${expected_color} !important;`,
        );
        // expect(container.firstChild).toHaveStyle(`font-size: ${expected_size};`);
      },
    );
  });

  test('Kiểm tra hiển thị SubTitle', ({ given, when, then }) => {
    given('Màn hình chứa KTSubTitle', () => {});

    when(
      /^theme is (.*), color is (.*), size is (.*)$/,
      (theme, color, size) => {
        props = { theme, color, size: parseInt(size) };
      },
    );

    then(
      /^Hiển thị đúng màu (.*) và kích thước (.*)$/,
      (expected_color, expected_size) => {
        let { container } = render(<KTSubTitle {...props} />);
        expect(container.firstChild).toHaveStyle(
          `color: ${expected_color} !important;`,
        );
        // expect(container.firstChild).toHaveStyle(`font-size: ${expected_size};`);
      },
    );
  });

  test('Kiểm tra hiển thị BodyText', ({ given, when, then }) => {
    given('Màn hình chứa KTBodyText', () => {});

    when(
      /^theme is (.*), color is (.*), size is (.*)$/,
      (theme, color, size) => {
        props = { theme, color, size: parseInt(size) };
      },
    );

    then(
      /^Hiển thị đúng màu (.*) và kích thước (.*)$/,
      (expected_color, expected_size) => {
        let { container } = render(<KTBodyText {...props} />);
        expect(container.firstChild).toHaveStyle(
          `color: ${expected_color} !important;`,
        );
        // expect(container.firstChild).toHaveStyle(`font-size: ${expected_size};`);
      },
    );
  });

  test('Kiểm tra hiển thị PrimaryText', ({ given, when, then }) => {
    given('Màn hình chứa KTPrimaryText', () => {});

    when(
      /^theme is (.*), color is (.*), size is (.*)$/,
      (theme, color, size) => {
        props = { theme, color, size: parseInt(size) };
      },
    );

    then(
      /^Hiển thị đúng màu (.*) và kích thước (.*)$/,
      (expected_color, expected_size) => {
        let { container } = render(<KTPrimaryText {...props} />);
        expect(container.firstChild).toHaveStyle(
          `color: ${expected_color} !important;`,
        );
        // expect(container.firstChild).toHaveStyle(`font-size: ${expected_size};`);
      },
    );
  });
});
