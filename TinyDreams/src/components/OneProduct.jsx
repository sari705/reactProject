import "./css/oneProduct.css"

function OneProduct({ product, setChoiseProduct }) {

    return (<div>
        <h2>{product.name}</h2>
        <img src={`/images/${product.images[0]}`} alt={product.images[0]} onClick={() => setChoiseProduct(product)} />
        <h3>{product.price}</h3>
        <div className="tags-container">
                {product.tag && product.tag.map((productTag, index) => (
                    <span key={index} className="tag">{productTag}</span>
                ))}
        </div>

    </div>);
}

export default OneProduct;
