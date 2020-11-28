import mongoose from 'mongoose'

const carouselSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    secondTitle: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: true,
    },
    button: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Carousel = mongoose.model('Carousel', carouselSchema)

export default Carousel
