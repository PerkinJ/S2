---
title: 链接跳转
order: 4
---

将单元格文本标记为含有下划线的链接样式，实现链接跳转 🔗, 对于透视表和明细表，有细微的区别

<img src="https://gw.alipayobjects.com/mdn/rms_56cbb2/afts/img/A*1VD9RY8cxLcAAAAAAAAAAAAAARQnAQ" width="600" alt="preview" />

## 标记链接字段

```ts
const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
  },
};

const s2options = {
  width: 600,
  height: 600,
  interaction: {
    linkFields: ['city'],
  }
};
```

使用 `S2Event.GLOBAL_LINK_FIELD_JUMP` 监听链接点击

```ts
s2.on(S2Event.GLOBAL_LINK_FIELD_JUMP, (data) => {
  const { key, record } = data;
  ...
});
```

## 透视表

支持将行头 `rows` 标记为链接样式，`columns` 和 `values` 无效

```ts
const s2DataConfig = {
  fields: {
    rows: ['province', 'city'],
    columns: ['type'],
    values: ['price'],
  },
};

const s2options = {
  width: 600,
  height: 600,
  interaction: {
    linkFields: ['province', 'city'],
  }
};

const s2 = new PivotSheet(container, s2DataConfig, s2options);

s2.on(S2Event.GLOBAL_LINK_FIELD_JUMP, (data) => {
  const { key, record } = data;
  const value = record[key]
  // 拼装自己的跳转地址
  location.href = `https://path/to/${key}=${value}}`;
});

s2.render();
```

<playground path='interaction/advanced/demo/pivot-link-jump.ts' rid='container' height='400'></playground>

## 明细表

支持将行头 `columns` 标记为链接样式

```ts
import { TableSheet } from '@antv/s2';
const s2DataConfig = {
  fields: {
    columns: ['type', 'price', 'province', 'city'],
  },
};

const s2options = {
  width: 600,
  height: 600,
  interaction: {
    linkFields: ['type', 'price', 'province'],
  }
};

const s2 = new TableSheet(container, s2DataConfig, s2options);

s2.on(S2Event.GLOBAL_LINK_FIELD_JUMP, (data) => {
  const { key, record } = data;
  const value = record[key]
  // 拼装自己的跳转地址
  location.href = `https://path/to/${key}=${value}}`;
});

s2.render();
```

<playground path='interaction/advanced/demo/table-link-jump.ts' rid='container2' height='400'></playground>
