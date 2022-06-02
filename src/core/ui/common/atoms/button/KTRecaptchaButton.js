import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';

const KTRecaptchaButton = (props) => {
  let captchaEnabled = process.env.REACT_APP_CAPTCHA_STATUS == 1;
  let _reCaptchaRef = React.createRef();
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log('RecaptchaButton loading change - ' + props.loading);
    setLoading(props.loading);
  }, [props.loading]);

  useEffect(() => {
    console.log('Bắt đầu handle effect', recaptchaToken);
    if (recaptchaToken != '') {
      props.onClick();
    }
  }, [recaptchaToken]);

  const startCaptchaSubmit = () => {
    console.log('Bắt đầu submit', _reCaptchaRef);
    _reCaptchaRef.current.reset();
    _reCaptchaRef.current.execute();
  };
  const onBtnClicked = () => {
    setLoading(true);
    if (captchaEnabled) {
      startCaptchaSubmit();
    } else {
      props.onClick();
    }
  };
  const onCaptchaErrored = async (recaptcha) => {
    console.log('RecaptchaButton error: ' + recaptcha);
  };
  const asyncScriptOnLoad = () => {
    // setLoading(false);
    console.log('RecaptchaButton scriptLoad - reCaptcha Ref-', _reCaptchaRef);
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        block
        className="btn-form"
        loading={loading}
        onClick={onBtnClicked}
      >
        <span className="font-face-lt">
          <span>{props.text}</span>
        </span>
      </Button>
      {captchaEnabled && (
        <ReCAPTCHA
          style={{ margin: 'auto', width: 'fit-content', marginBottom: '1em' }}
          theme="light"
          ref={_reCaptchaRef}
          size="invisible"
          sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
          onChange={setRecaptchaToken}
          onErrored={onCaptchaErrored}
          asyncScriptOnLoad={asyncScriptOnLoad}
        />
      )}
    </React.Fragment>
  );
};
export default KTRecaptchaButton;
