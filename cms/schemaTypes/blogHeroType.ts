import {defineField, defineType} from 'sanity'

export const blogHeroType = defineType({
  name: 'blogHero',
  title: 'Blog Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Main title for the blog hero section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Subtitle or description for the blog section',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'announcement',
      title: 'Announcement',
      type: 'string',
      description: 'Optional announcement to display under the hero section',
    }),
    defineField({
      name: 'announcementLink',
      title: 'Announcement Link',
      type: 'url',
      description: 'Link for when the announcement is clicked',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
}) 