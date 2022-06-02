import React, {
  useState,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react';
import { Modal, Grid, Row } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { KTButton, KTHeading, KTGuideButtons } from 'core/ui';

const { useBreakpoint } = Grid;

const calcWidthProps = (width, screens) => {
  const props = { width };

  if (screens.xxl) {
    props.width =
      window.innerWidth - 400 > 1300 ? window.innerWidth - 400 : 1300;
    return props;
  } else if (screens.xl || screens.lg) {
    props.width = window.innerWidth - 200;
    return props;
  } else if (screens.md) {
    props.width = window.innerWidth - 100;
    return props;
  }

  return props;
};

const KTModal = (
  {
    title,
    onSave,
    children,
    afterClose,
    confirmLoading,
    hasForm = true,
    className = '',
    maskClosable = false,
    guides = {},
    cancelText,
    okText,
    footer,
    autoWidth = false,
    width = 520,
    ...rest
  },
  ref,
) => {
  const screens = useBreakpoint();
  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  // const widthProps = useMemo(
  //   () => (autoWidth ? calcWidthProps(width, screens) : { width }),
  //   [autoWidth, screens, width],
  // );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const widthProps = autoWidth ? calcWidthProps(width, screens) : { width };

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close],
  );

  return useMemo(() => {
    return (
      <Modal
        maskClosable={maskClosable}
        className={`kt-modal ${
          hasForm ? `kt-modal-has-form` : 'kt-modal-no-form'
        } ${className}`}
        title={
          <Row align="middle">
            <KTHeading level={5} simple>
              {title}
            </KTHeading>
            &nbsp;&nbsp;
            <KTGuideButtons {...guides} />
          </Row>
        }
        visible={isOpen}
        onCancel={() => close()}
        footer={
          footer
            ? Array.isArray(footer)
              ? footer.length
                ? footer
                : null
              : footer
            : [
                <KTButton key="cancel" onClick={() => close()}>
                  {cancelText || 'Hủy'} <CloseOutlined />
                </KTButton>,
                onSave ? (
                  <KTButton
                    loading={confirmLoading}
                    key="save"
                    type="primary"
                    onClick={() => onSave()}
                  >
                    {okText || 'Lưu'} <SaveOutlined />
                  </KTButton>
                ) : null,
              ]
        }
        afterClose={afterClose}
        {...rest}
        {...widthProps}
      >
        {children}
      </Modal>
    );
  }, [
    maskClosable,
    hasForm,
    className,
    title,
    guides,
    isOpen,
    cancelText,
    confirmLoading,
    okText,
    afterClose,
    rest,
    children,
    close,
    onSave,
    footer,
    widthProps,
  ]);
};

export default forwardRef(KTModal);
