const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    // be sure to include its associated Product data
    include: [{ model:Product }]
  })
  .then(tag => res.json(tag))
  .catch(e => res.status(500).json(e));
  
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: { id:req.params.id },
    // be sure to include its associated Product data
    include: [{ model:Product }]
  })
  .then(tag => res.json(tag))
  .catch(e => res.status(500).json(e));
  
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(createTag => res.status(200).json(createTag))
  .catch(e => res.status(400).json(e));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({ tag_name:req.body.tag_name }, {
    where: { id:req.params.id }
  })
  .then(updateTag => {
    if (updateTag[0] === 0){
      return res.status(400).json({ message: "Can't find tag"})
    }
    res.status(200).json({ message: "Tag updated successfully" });
  })
  .catch(e => res.status(400).json(e));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id:req.params.id }
  })
  .then(delTag => {
    if(delTag === 0) {
      return res.status(400).json({ message: "Can't find tag"})
    }
    res.status(200).json({ message: "Tag successfully deleted"});
  })
  .catch(e => res.status(400).json(e));
});

module.exports = router;
