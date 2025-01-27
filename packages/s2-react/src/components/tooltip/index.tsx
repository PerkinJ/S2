import { isEmpty, isNil } from 'lodash';
import React from 'react';
import {
  ListItem,
  TooltipData,
  TooltipOperatorOptions,
  TooltipOptions,
  TooltipSummaryOptions,
  TooltipNameTipsOptions,
  TooltipHeadInfo as TooltipHeadInfoType,
  TooltipInterpretationOptions,
  getTooltipDefaultOptions,
} from '@antv/s2';
import { TooltipDetail } from './components/detail';
import { Divider } from './components/divider';
import { TooltipHead } from './components/head-info';
import { TooltipInfos } from './components/infos';
import { Interpretation } from './components/interpretation';
import { TooltipOperator } from './components/operator';
import { SimpleTips } from './components/simple-tips';
import { TooltipSummary } from './components/summary';
import { TooltipRenderProps } from './interface';

import './index.less';

export const TooltipComponent: React.FC<TooltipRenderProps> = (props) => {
  const renderDivider = () => {
    return <Divider />;
  };

  const renderOperation = (
    operator: TooltipOperatorOptions,
    onlyMenu?: boolean,
  ) => {
    return (
      operator && (
        <TooltipOperator
          onClick={operator.onClick}
          menus={operator.menus}
          onlyMenu={onlyMenu}
        />
      )
    );
  };

  const renderNameTips = (nameTip: TooltipNameTipsOptions) => {
    const { name, tips } = nameTip || {};
    return <SimpleTips name={name} tips={tips} />;
  };

  const renderSummary = (summaries: TooltipSummaryOptions[]) => {
    return !isEmpty(summaries) && <TooltipSummary summaries={summaries} />;
  };

  const renderHeadInfo = (headInfo: TooltipHeadInfoType) => {
    const { cols, rows } = headInfo || {};

    return (
      (!isEmpty(cols) || !isEmpty(rows)) && (
        <>
          {renderDivider()}
          <TooltipHead cols={cols} rows={rows} />
        </>
      )
    );
  };

  const renderDetail = (details: ListItem[]) => {
    return !isEmpty(details) && <TooltipDetail list={details} />;
  };

  const renderInfos = (infos: string) => {
    return infos && <TooltipInfos infos={infos} />;
  };

  const renderInterpretation = (
    interpretation: TooltipInterpretationOptions,
  ) => {
    return interpretation && <Interpretation {...interpretation} />;
  };

  const renderContent = (data?: TooltipData, options?: TooltipOptions) => {
    const option = getTooltipDefaultOptions(options);
    const { operator, onlyMenu } = option;
    const { summaries, headInfo, details, interpretation, infos, tips, name } =
      data || {};
    const nameTip = { name, tips };

    if (onlyMenu) {
      return renderOperation(operator, true);
    }
    return (
      <>
        {renderOperation(operator)}
        {renderNameTips(nameTip)}
        {renderSummary(summaries)}
        {renderInterpretation(interpretation)}
        {renderHeadInfo(headInfo)}
        {renderDetail(details)}
        {renderInfos(infos)}
      </>
    );
  };

  const { data, options, content } = props;

  if (!isNil(content)) {
    return content as React.ReactElement;
  }

  return <>{renderContent(data, options)}</>;
};
