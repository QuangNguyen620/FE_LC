import React, { useState } from 'react';
import { Tooltip, Popover, Space, Button } from 'antd';
import {
  InfoCircleOutlined,
  PlayCircleOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ModalVideo from 'react-modal-video';

export const KTGuideButtons = ({
  video_url,
  guide_text,
  doc_url,
  subTitle,
}) => {
  const [showYoutube, setShowYoutube] = useState(false);
  return (
    <Space size="small">
      {subTitle}
      {guide_text && (
        <Popover placement="topLeft" content={guide_text} title="Trợ giúp">
          <Button
            type="link"
            shape="circle"
            icon={<InfoCircleOutlined />}
            size="small"
            style={{ fontSize: '16px', color: '#B8B8B8' }}
          />
        </Popover>
      )}
      {doc_url && (
        <Tooltip title="Tài liệu hướng dẫn">
          <Link to={{ pathname: doc_url }} target="_blank">
            <Button
              type="link"
              ghost={false}
              shape="circle"
              icon={<ReadOutlined />}
              size="small"
              style={{ fontSize: '16px', color: '#B8B8B8' }}
            />
          </Link>
        </Tooltip>
      )}
      {video_url && (
        <>
          <Tooltip title="Video hướng dẫn">
            <Button
              ghost={false}
              type="link"
              shape="circle"
              icon={<PlayCircleOutlined />}
              size="small"
              style={{ fontSize: '16px', color: '#B8B8B8' }}
              onClick={() => setShowYoutube(true)}
            ></Button>
          </Tooltip>
          <ModalVideo
            channel="youtube"
            autoplay
            isOpen={showYoutube}
            videoId={video_url}
            onClose={() => setShowYoutube(false)}
          />
        </>
      )}
    </Space>
  );
};
