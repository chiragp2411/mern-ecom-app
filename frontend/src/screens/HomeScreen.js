import React, { useEffect } from 'react';
import Product from '../components/Product';
// import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
// import data from '../data';

export default function HomeScreen() {
  // old code without redux
  /* const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []); */

  // new code with redux
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <div>
      {loading ? <LoadingBox></LoadingBox>
        :
        error ? <MessageBox variant="danger">{error}</MessageBox>
          :
          <div className="row center">
            {
              products.map((product) => (
                <Product id={product._id} product={product} />
              ))
            }
          </div>
      }

    </div>
  )
}