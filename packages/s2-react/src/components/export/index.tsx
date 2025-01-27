import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import cx from 'classnames';
import {
  SpreadSheet,
  copyData,
  copyToClipboard,
  download,
  S2_PREFIX_CLS,
} from '@antv/s2';
import { DotIcon } from '../icons/index';

export interface DataSet {
  icon?: React.ReactNode;
  name: string;
  value: string;
  type?: 'text' | 'location' | 'date';
  disabled?: boolean;
}

export interface ExportCfgProps {
  open: boolean;
  className?: string;
  icon?: React.ReactNode;
  copyOriginalText?: string;
  copyFormatText?: string;
  downloadOriginalText?: string;
  downloadFormatText?: string;
  successText?: string;
  errorText?: string;
  fileName?: string;
}
export interface ExportProps extends ExportCfgProps {
  sheet: SpreadSheet;
}

export const Export: React.FC<ExportProps> = ({
  className,
  icon,
  copyOriginalText = '复制原始数据',
  copyFormatText = '复制格式化数据',
  downloadOriginalText = '下载原始数据',
  downloadFormatText = '下载格式化数据',
  successText = '操作成功',
  errorText = '操作失败',
  sheet,
  fileName = 'sheet',
  ...restProps
}) => {
  const PRE_CLASS = `${S2_PREFIX_CLS}-export`;

  const exportData = (isFormat: boolean) => {
    const data = copyData(sheet, '\t', isFormat);
    if (copyToClipboard(data)) {
      message.success(successText);
    } else {
      message.error(errorText);
    }
  };

  const downLoadData = (isFormat: boolean) => {
    const data = copyData(sheet, ',', isFormat);
    try {
      download(data, fileName);
      message.success(successText);
    } catch (err) {
      message.error(errorText);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="copyOriginal" onClick={() => exportData(false)}>
        {copyOriginalText}
      </Menu.Item>
      <Menu.Item key="copyFormat" onClick={() => exportData(true)}>
        {copyFormatText}
      </Menu.Item>
      <Menu.Item key="downloadOriginal" onClick={() => downLoadData(false)}>
        {downloadOriginalText}
      </Menu.Item>
      <Menu.Item key="downloadFormat" onClick={() => downLoadData(true)}>
        {downloadFormatText}
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      className={cx(PRE_CLASS, className)}
      {...restProps}
    >
      <a
        className="ant-dropdown-link"
        key="export"
        onClick={(e) => e.preventDefault()}
      >
        {icon || <DotIcon />}
      </a>
    </Dropdown>
  );
};
