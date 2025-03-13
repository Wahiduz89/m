// sanity/schemas/staff.js
export default {
    name: 'staff',
    title: 'Staff Members',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'position',
        title: 'Position',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'bio',
        title: 'Bio',
        type: 'text',
        validation: Rule => Rule.required().max(200)
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.email()
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'Used for sorting staff members'
      }
    ],
    orderings: [
      {
        title: 'Manual Order',
        name: 'manualOrder',
        by: [{ field: 'order', direction: 'asc' }]
      }
    ]
  };