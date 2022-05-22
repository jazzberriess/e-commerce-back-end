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
      include: [{ model: Product, }]
    });

    //return all items found.
    res.status(200).json(getAllTags);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(404).json(error, "Oops! Something went wrong. No tags here!")
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    //find category by primary key based on the id parameters.
    const getTagId = await Tag.findByPk(req.params.id, {

      //include the category details for the product
      include: [{ model: Product }]
    });
    console.log(getTagId);
    res.status(200).json({ getTagId });

  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    //create a new tag based on the data entered into the request body.
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag, `Created tag: ${req.body.tag_name}`);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id
        }
      })
    console.log(updateTag)
    res.status(200).json(updateTag);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    res.status(200).json(`Deleted tag ID: ${req.params.id}`);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
