import Ember from 'ember';
import PostValidations from 'ember-admin/mixins/validations/post';
import {filterBy, sort} from 'ember-computed-decorators'
export default Ember.Controller.extend(PostValidations, {
  showErrors: true,
  tags: Ember.computed(function(){
    return this.store.find('tag');
  }),
  @filterBy('tags', 'tagType', 'subject') subjects,
  subjectsSort: ['taggings.length:desc'],
  @sort('subjects', 'subjectsSort') sortedSubjects,
  unusedTags: Ember.computed('sortedSubjects.@each', 'model.taggings.@each', function(){
    var all = this.get('sortedSubjects')
    var used = this.get('model.taggings').mapBy('tag.content')
    return _.difference(all, used)
  }),
  actions: {
    save: function(){
      var model = this.get('model')
      var file = model.get('temporaryThumbnailImage')
      model.set('thumbnailImage', file);
      this.validate().then(()=>{
        model.save().then(()=>{
          this.transitionToRoute('post.show', model)
        })
      }).catch(()=>{
        var errorHashes = this.get('errors.model')
        var errorKeys = Object.keys(errorHashes)
        this.get('flashMessages').clearMessages()
        errorKeys.forEach((key)=>{
          errorHashes[key].forEach((error)=>{
            this.get("flashMessages").danger(`${key} ${error}`, {sticky: true})
          })
        })

        console.log(this.get("errors"))
      })

    },
    addTag: function(tag){
      this.store.createRecord('tagging', {
        tag: tag,
        post: this.get('model')
      }).save();
    },
    removeTag: function(tagging){
      tagging.destroyRecord();
    }
  },
});
