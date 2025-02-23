
function OneProduct({ product, setChoiseProduct }) {

    return (<div>
        <h2>{product.name}</h2>
        <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={() => setChoiseProduct(product)} />
        <h3>{product.price}</h3>

    </div>);
}

export default OneProduct;
