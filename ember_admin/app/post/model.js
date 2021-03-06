import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  transcript: DS.attr('string'),
  publishDate: DS.attr(),
  // updatedAt: DS.attr('date'),
  // createdAt: DS.attr('date'),
  permalink: DS.attr('string'),
  free: DS.attr('boolean'),
  difficulty: DS.attr('string'),
  difficulties: ['basic', 'intermediate', 'advanced'],
  taggings: DS.hasMany('tagging'),
  seconds: DS.attr('number'),
  thumbnailImage: DS.attr('file')

});
