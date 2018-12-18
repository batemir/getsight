import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import './css/fontello.css';
import './css/fontello-embedded.css';
import Product from './Components/Product';

const root = document.getElementById('root');

const run = (data) => {
    const tags = data.map((product) => {
        const imgUrl = product.primaryImageUrl;
        const newUrl = `${imgUrl.slice(0, imgUrl.length - 4)}_220x220_1.jpg`;
        const code = `Код: ${product.code.slice(5)}`;
        const status = product.isActive ? 'Наличие' : 'Нет в наличии';
        return <Product uniqueId={product.productId} code={code}
        title={product.title} img={newUrl} keywords={product.assocProducts}
        status={status} goldPrice={product.priceGold} retailPrice={product.priceRetail}
        goldPriceAlt={Math.round(product.priceGoldAlt)} retailPriceAlt={Math.round(product.priceRetailAlt)}
        ratio={(1 / product.unitRatioAlt).toFixed(2) }/>;
    });
    ReactDOM.render(tags, root);
};

fetch('../products.json', {method: 'GET'})
    .then(res => res.json()).then(data => {
        run(data);
});