import { type SchemaTypeDefinition } from 'sanity'
import { visite } from './visite'
import { faq } from './faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [visite, faq],
}
