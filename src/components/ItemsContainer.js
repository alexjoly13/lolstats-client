import React, { Component } from "react";
import { itemImgGetter } from "../helpers/images-helper";

import "./ItemsContainer.css";

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsSection: this.props.itemsData,
    };
  }

  componentDidMount() {}

  render() {
    const items = this.state.statsSection;
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-inline-block items-container">
          <div className="item-display-row">
            <div className="item-holder d-inline-flex mr-2">
              {itemImgGetter(items.item0)}
            </div>
            <div className="item-holder d-inline-flex mr-2">
              {itemImgGetter(items.item1)}
            </div>
            <div className="item-holder d-inline-flex">
              {itemImgGetter(items.item2)}
            </div>
          </div>
          <div className="item-display-row">
            <div className="item-holder d-inline-flex mr-2">
              {itemImgGetter(items.item3)}
            </div>
            <div className="item-holder d-inline-flex mr-2">
              {itemImgGetter(items.item4)}
            </div>
            <div className="item-holder d-inline-flex">
              {itemImgGetter(items.item5)}
            </div>
          </div>
        </div>

        <div className="d-inline-block ml-1">
          <div className="item-holder">{itemImgGetter(items.item6)}</div>
        </div>
      </div>
    );
  }
}

export default ItemsContainer;
