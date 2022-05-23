const router = require('express').Router();
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    //find all items in the Category model in the database.
    const getCategories = await Category.findAll({
      include: { model: Product }
    });

    //return all items found.
    console.log(`\x1b[38;5;126mAll categories obtained!\x1b[0m`)
    res.status(200).json(getCategories);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(500).json(error, "Oops! Something went wrong. No categories here!")
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    //find category by primary key based on the id parameters and include the product details.
    const getCatId = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    //if the ID doesn't exist, advise the user
    if (!getCatId) {
      res.json({ "Message": "Oops! A category with that ID doesn't exist!" });
    } else {
      console.log(`\x1b[38;5;126mShowing category ID: ${req.params.id}\x1b[0m`)
      res.status(200).json(getCatId);
    }
  } catch (error) {
    res.status(500).json(error);
  }

});


router.post('/', async (req, res) => {
  // create a new category
  try {
    //create a new category based on the data entered into the request body.
    const createCategory = await Category.create(req.body);
    console.log(`\x1b[38;5;126mCategory created! ID: ${createCategory.id}, Category Name: ${createCategory.category_name}\x1b[0m`);
    res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    },
      {
        where: {
          id: req.params.id
        }
      })
    console.log(`\x1b[38;5;126mCategory ${req.params.id} updated to: ${req.body.category_name}\x1b[0m`);
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log(destroyCategory);
    console.log(`\x1b[38;5;126mDeleted category ID: ${req.params.id}\x1b[0m`);
    res.status(200).json(destroyCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
