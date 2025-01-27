import cx from 'classnames';
import { isEmpty } from 'lodash';
import React, { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FieldType } from '../constant';
import { SwitcherField, SwitcherItem } from '../interface';
import { getSwitcherClassName } from '../util';
import { SingleItem } from './single-item';
import './index.less';

export interface DimensionCommonProps
  extends Pick<SwitcherField, 'selectable' | 'expandable'> {
  fieldType: FieldType;
  draggingItemId?: string;
  onVisibleItemChange: (
    fieldType: FieldType,
    checked: boolean,
    id: string,
    parentId?: string,
  ) => void;
}

export type DimensionItemProps = DimensionCommonProps & {
  index: number;
  item: SwitcherItem;
  expandChildren: boolean;
};

export const DimensionItem: FC<DimensionItemProps> = ({
  fieldType,
  item: { id, displayName, checked = true, children = [] },
  expandable,
  expandChildren,
  selectable,
  index,
  draggingItemId,
  onVisibleItemChange,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={cx(
            getSwitcherClassName(selectable ? 'checkable-list' : 'normal-list'),
            {
              'list-dragging': snapshot.isDragging,
            },
          )}
        >
          <SingleItem
            dragHandleProps={provided.dragHandleProps}
            fieldType={fieldType}
            id={id}
            displayName={displayName}
            checked={checked}
            onVisibleItemChange={onVisibleItemChange}
            selectable={selectable}
            className={cx(selectable ? 'checkable-item' : 'normal-item', {
              'item-collapse': !expandChildren,
            })}
          />

          {expandable &&
            expandChildren &&
            !isEmpty(children) &&
            draggingItemId !== id && (
              <div
                className={cx('child-items', {
                  'item-hidden': !expandChildren,
                })}
              >
                {children.map((item) => (
                  <SingleItem
                    key={item.id}
                    id={item.id}
                    fieldType={fieldType}
                    displayName={item.displayName}
                    disabled={!checked}
                    checked={item.checked}
                    parentId={id}
                    selectable={selectable}
                    onVisibleItemChange={onVisibleItemChange}
                    className="checkable-item"
                  />
                ))}
              </div>
            )}
        </div>
      )}
    </Draggable>
  );
};
