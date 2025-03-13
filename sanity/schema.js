// sanity/schema.js
import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import page from './schemas/page';
import staff from './schemas/staff';
import event from './schemas/event';
import news from './schemas/news';


export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    page,
    staff,
    event,
    news,
  ]),
});