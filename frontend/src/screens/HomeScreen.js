import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Alert from '../components/Alert'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const [filter, setFilter] = useState('all')
  const [productsFilter, setProductsFilter] = useState([])

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, product, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  useEffect(() => {
    setProductsFilter(products)
  }, [])
  useEffect(() => {
    setProductsFilter([])
    const filtered = products.map((p) => ({
      ...p,
      filtered: p.name.includes(filter),
    }))
    setProductsFilter(filtered)
  }, [filter])

  return (
    <>
      <div>
        {!keyword && <ProductCarousel />}
        <h1 className='pt-4'>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <div className='portfolio__labels'>
              <a
                href='/#'
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                All
              </a>
              <a
                href='/#'
                active={filter === 'Airpods Wireless Bluetooth Headphones'}
                onClick={() =>
                  setFilter('Airpods Wireless Bluetooth Headphones')
                }
              >
                Airpods Wireless Bluetooth Headphones
              </a>
              <a
                href='/#'
                active={filter === 'mobile'}
                onClick={() => setFilter('mobile')}
              >
                Mobile
              </a>
              <a
                href='/#'
                active={filter === 'ux-ui'}
                onClick={() => setFilter('ux-ui')}
              >
                UX/UI
              </a>
              <a
                href='/#'
                active={filter === 'others'}
                onClick={() => setFilter('others')}
              >
                Others
              </a>
            </div>

            <div className='portfolio__container'>
              {productsFilter.map((product) =>
                product.filtered === true ? (
                  <span key={product.name}>{product.name}</span>
                ) : (
                  'none'
                )
              )}
            </div>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </>
        )}
      </div>
    </>
  )
}

export default HomeScreen
