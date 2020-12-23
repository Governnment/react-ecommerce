import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Alert from '../components/Alert'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)

  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush' className='placeorder'>
            <ListGroup.Item className='list-group-item-dark my-1'>
              <h2>Shipping</h2>
              <p>
                <strong className='mr-2'>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode} {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item className='list-group-item-dark my-1'>
              <h2>Payment Method</h2>
              <strong className='mr-1'>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item className='list-group-item-dark my-1'>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert>Your cart is empty</Alert>
              ) : (
                <ListGroup variant='flush' className='placeorder-items'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      className='list-group-item-dark'
                    >
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item className='list-group-item-dark'>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                {error && <Alert variant='danger'>{error}</Alert>}
              </ListGroup.Item>
              <ListGroup.Item className='list-group-item-dark'>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
