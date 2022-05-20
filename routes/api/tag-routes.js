const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    //find all items in the Tag model in the database.
    const getAllTags = await Tag.findAll({
      //and include the products tagged
      include: [{ model: Product }]
    });

    //return all items found.
    res.status(200).json(getAllTags);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(404).json(error, "Oops! Something went wrong. No tags here!")
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
