exports.up = knex =>
  knex.schema.createTable('organizations', table => {
    table
      .uuid('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .string('name', 128)
      .notNullable()
      .unique()
    table.string('description', 1024)
  })

exports.down = knex => knex.schema.dropTableIfExists('organizations')
