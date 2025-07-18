// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    slug: {
      type: "string",
      description: "The slug of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The tags of the post",
      required: false
    },
    published: {
      type: "boolean",
      description: "Whether the post is published",
      required: false,
      default: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content/blog",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: []
  },
  disableImportAliasWarning: true
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-YKOR3KTU.mjs.map
