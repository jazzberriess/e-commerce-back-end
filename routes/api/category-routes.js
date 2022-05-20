const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products

  try {
    //find all items in the Category model in the database.
    const getCategories = await Category.findAll();

    //return all items found.
    res.status(200).json(getCategories);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(500).res.json(error, "Oops! Something went wrong. No categories here!")
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const getCatId = await Category.findByPk(req.params.id);
    console.log(getCatId);
    // ), {
    const getProducts = await Product.findAll({
      where: {
        categoryId: req.params.id
      }
    });
    console.log(req.params.id);
    res.status(200).json({ getCatId, getProducts });

  } catch (error) {
    res.status(500).json(error);
  }

});


router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
