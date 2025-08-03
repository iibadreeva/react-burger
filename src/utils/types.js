import PropTypes from 'prop-types';

export const dataPropTypes = PropTypes.shape({
  __id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});
