const

  before_update = event => {
    if (event.params.data.version !== undefined ) {
      event.params.data.version ++
    }  
  },

  after_create_or_update = event => {
  },

  after_delete = event => {
  }




module.exports = {

  // beforeCreate: before_create_or_update,
  beforeUpdate: before_update,

  afterCreate: after_create_or_update,
  afterUpdate: after_create_or_update,

  afterDelete: after_delete,

}
