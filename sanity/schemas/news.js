// sanity/schemas/news.js
export default {
    name: 'news',
    title: 'News Articles',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        validation: Rule => Rule.required().max(200)
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          { type: 'block' },
          {
            type: 'image',
            fields: [{ name: 'alt', title: 'Alternative Text', type: 'string' }]
          }
        ]
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'category' }] }]
      }
    ]
  };