import mongoose from 'mongoose'

const sliderSchema = mongoose.Schema(
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
      required: false,
    },
    button: {
      type: String,
      required: false,
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

const Slide = mongoose.model('Slide', sliderSchema)

export default Slide
