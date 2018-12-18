import React from 'react';

export default class Product extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: 1,
            goldPrice: this.props.goldPriceAlt,
            retailPrice: this.props.retailPriceAlt,
            incrementGold: this.props.goldPriceAlt,
            incrementRetail: this.props.retailPriceAlt,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.arrowClick = this.arrowClick.bind(this);
        this.addAttr = this.addAttr.bind(this);     
    }
    addAttr = (node) => {
        node.setAttribute('data-product-id', this.props.uniqueId);
    }
    handleClick(e) {
        e.preventDefault();
        if (e.target.classList.contains('m')) {
            this.setState({incrementGold: this.props.goldPriceAlt,
                incrementRetail: this.props.retailPriceAlt});
            this.setState({goldPrice: this.props.goldPriceAlt * this.state.inputValue,
                retailPrice: this.props.retailPriceAlt * this.state.inputValue});
        } else {
            this.setState({incrementGold: this.props.goldPrice,
            incrementRetail: this.props.retailPrice});
            this.setState({goldPrice: this.props.goldPrice * this.state.inputValue,
                retailPrice: this.props.retailPrice * this.state.inputValue});
        }
        if (!e.target.classList.contains('x')) {
            const active = e.target.parentNode.getElementsByClassName('active').item(0);
            active.classList.remove('active');
            e.target.classList.add('active'); 
        }
    }

    handleInput(e) {
        e.preventDefault();
        this.setState({inputValue: e.target.value, goldPrice: this.state.incrementGold * e.target.value,
            retailPrice: this.state.incrementRetail * e.target.value});
    }

    arrowClick(e) {
        e.preventDefault();
        if (e.target.classList.contains('up')) {
            this.setState({inputValue: this.state.inputValue + 1,
            goldPrice: this.state.goldPrice + this.state.incrementGold,
            retailPrice: this.state.retailPrice + this.state.incrementRetail });
        } else {
            this.setState({inputValue: this.state.inputValue - 1,
            goldPrice: this.state.goldPrice - this.state.incrementGold,
            retailPrice: this.state.retailPrice - this.state.incrementRetail });
        }
    }

    render() {
        return (
            <div className="product-container">
                <div className="product-photo product"><img src={this.props.img} alt=""/></div>
                <div className="second-block">
                    <span className="product-code product">{this.props.code}</span>
                    <div className="product-description product">{this.props.title}</div>
                    <div className="product-keywords product">
                        <span>Могут понадобиться: </span>{this.props.keywords}
                    </div>
                </div>
                <div className="third-block">
                    <div className="product-status product">
                        <span>{this.props.status}</span><br/>
                    </div>
                    <div className="product-price product">
                        По карте клуба: <span>{this.state.goldPrice}</span><span className="icon-rouble"></span><br/>
                        <span className="gray">{this.state.retailPrice}</span><span className="icon-rouble gray"></span>
                    </div>
                    <div id="select" className='x' onClick={this.handleClick}>
                        <div className="select m active">За м. кв.</div>
                        <div className="select p">За упаковку</div>
                    </div>
                    <div className="help">
                        <div className="icon-x"></div>
                        <div className="help-text">Продается упаковками:<br/> 1 упак. = {this.props.ratio} м. кв.</div>
                    </div>
                    <div className="product-count">
                        <input type="text" value={this.state.inputValue} onChange={this.handleInput}/>
                        <span className="arrow up" onClick={this.arrowClick}></span>
                        <span className="arrow down" onClick={this.arrowClick}></span>  
                    </div>
                    <div className="basket" ref={this.addAttr}>
                        <span className="icon-basket"></span>
                        <span>В корзину</span>
                    </div>
                </div>
            </div>
        );
    }
}