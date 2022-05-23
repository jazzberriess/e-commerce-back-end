const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    //find all items in the Product model in the database.
    const getAllProducts = await Product.findAll({
      //and include their category and tags
      include: [{ model: Category, model: Tag }]
    });

    //return all items found.
    console.log(`\x1b[38;5;126mAll products obtained!\x1b[0m`)
    res.status(200).json(getAllProducts);
  } catch (error) {
    //error handling
    console.error(error);
    res.status(404).json(error, "Oops! Something went wrong. No products here!")
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    //find product by primary key based on the id parameters.
    const getProdId = await Product.findByPk(req.params.id, {

      //include the category and tag details for the product
      include: [{ model: Category, model: Tag }]
    });
    //if the ID doesn't exist, tell the user
    if (!getProdId) {
      res.json({ "Message": "Oops! A product with that ID doesn't exist!" });
    } else {
      console.log(`\x1b[38;5;126mShowing product ID: ${req.params.id}\x1b[0m`)
      res.status(200).json(getProdId);
    }
  } catch (error) {
    res.status(500).json(error);
  }

});

// create new product
router.post('/', async (req, res) => {
  //greab the details from the req.body that are needed for a new product and then create it using the newProdcut varaible
  const newProduct = {
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tagIds,
  }

  if (newProduct.product_name === "") {
    return res.json({ "Message": "You must enter a product name!" });
  }

  await Product.create(newProduct)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model

      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      console.log(productTags)
      if (productTags.length === 0) {
        console.log("Product updated!");
      }
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      if (!req.body.tagIds) {
        return productTagIds;
      }

      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const destroyProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    console.log(`\x1b[38;5;126mDeleted product ID: ${req.params.id}\x1b[0m`);

    res.status(200).json(destroyProduct);
  } catch (error) {
    res.status(400).json(error)
  }
});

module.exports = router;
