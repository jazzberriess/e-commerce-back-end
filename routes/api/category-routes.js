const router = require('express').Router();
const { Category, Product } = require('../../models');

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
    res.status(200).json(getCategories);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(500).json(error, "Oops! Something went wrong. No categories here!")
  }
});

// router.get('/:id', async (req, res) => {
//   // find one category by its `id` value
//   // be sure to include its associated Products
//   try {
//     //find category by primary key based on the id parameters.
//     const getCatId = await Category.findByPk(req.params.id);
//     console.log(getCatId);

//     //find all products where the category id is equal to the id parameters
//     const getProducts = await Product.findAll({
//       where: {
//         categoryId: req.params.id
//       }
//     });
//     console.log(req.params.id);
//     res.status(200).json({ getCatId, getProducts });

//   } catch (error) {
//     res.status(500).json(error);
//   }

// });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    //find category by primary key based on the id parameters and include the product details.
    const getCatId = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });

    res.status(200).json({ getCatId });

  } catch (error) {
    res.status(500).json(error);
  }

});


router.post('/', async (req, res) => {
  // create a new category
  try {
    //create a new category based on the data entered into the request body.
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      categoryName: req.body.categoryName,
    },
      {
        where: {
          id: req.params.id
        }
      })
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(400).json(error)
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
