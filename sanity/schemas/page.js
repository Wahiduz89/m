// sanity/schemas/page.js
export default {
    name: 'page',
    title: 'Page',
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
        name: 'heroImage',
        title: 'Hero Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'subtitle',
        title: 'Subtitle',
        type: 'string'
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'announcements',
        title: 'Announcements',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'announcement' }]
          }
        ]
      },
      {
        name: 'featuredNews',
        title: 'Featured News',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'news' }]
          }
        ]
      }
    ]
  };