const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [{ model:Product }]
  }).then(categories => res.json(categories))
  .catch(e => res.status(400).json(e));
  
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    // be sure to include its associated Products
    where: { id:req.params.id},
    include: [{ model:Product }]
  }).then(category => res.json(category))
  .catch(e => res.status(400).json(e));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(createdCategory => res.status(200).json(createdCategory))
  .catch(e => res.status(400).json(e))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id:req.params.id }
  })
  .then(updateCategory => {
    if(updateCategory[0] === 0){
      return res.status(400).json({ message: "Can't find category"});
    }
    res.status(200).json({ message: "Category updated successfully"});
  })
  .catch(e => res.status(400).json(e));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id:req.params.id }
  })
  .then(delRow => {
    if(delRow === 0){
      return res.status(400).json({ message: "Can't find category"})
    }
    res.status(200).json({ message: "Category deleted successfully"});
  })
  .catch(e => res.status(400).json(e));
});

module.exports = router;
