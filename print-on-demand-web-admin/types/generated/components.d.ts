import type { Schema, Struct } from '@strapi/strapi';

export interface SizeTShirtSize extends Struct.ComponentSchema {
  collectionName: 'components_size_t_shirt_sizes';
  info: {
    displayName: 't-shirt-size';
    icon: 'cube';
  };
  attributes: {
    size: Schema.Attribute.Enumeration<['S', 'M', 'L', 'XL']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'size.t-shirt-size': SizeTShirtSize;
    }
  }
}
