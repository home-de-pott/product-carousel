import '@babel/polyfill'; //for async

import waitUntil from 'async-wait-until';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '../client/components/App';
import Item from '../client/components/Item';

import testData from './testData';
import handle from '../client/handlers/handle';

jest.mock('../client/http/http');
jest.setTimeout(30000);
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let app, cdmSpy, doc;
  beforeAll(async () => {
    cdmSpy = sinon.spy(App.prototype, 'componentDidMount');
    doc = document.createElement('div');
    window.history.pushState({}, 'useless title', '/products/123');
    app = ReactDOM.render(<App />, doc);
    await waitUntil(() => cdmSpy.callCount === 1);
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(doc);
  });

  it('contains a button', () => {
    const buttons = doc.getElementsByTagName('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls componentDidMount', async () => {
    expect(cdmSpy.callCount).toBe(1);
  });

  it('Fetches related products after component mounts', () => {
    // Wait until the state has products
    //3 is the length of http/__mocks__/testData
    expect(app.state.products).toHaveLength(3);
  });

  it('renders related products to the DOM', () => {
    const products = doc.getElementsByClassName('carousel-item-brian');
    expect(products.length).toBe(3);
  });

  it('updates state with related products when getProduct event is propogated', async () => {
    const spySetState = sinon.spy(App.prototype, 'setState');
    const spyGetRelatedProducts = sinon.spy(
      App.prototype,
      'getRelatedProducts'
    );
    expect(spySetState.called).toBe(false);
    window.dispatchEvent(new CustomEvent('getProduct', { detail: { id: 1 } }));
    await waitUntil(() => spySetState.called, 5000);
    //why does spyGetRelatedProducts never get called? The original clearly is called
    expect(spySetState.called).toBe(true);
    expect(app.state.products.length).toBe(1);
  });

  //the following fails to work because click handler isn't called on button.click()
  // it('fires add to cart event when add to cart button is clicked', () => {
  //   const spyListener = sinon.spy();
  //   const fakeEvent = {
  //     stopPropagation: () => {},
  //   };

  //   window.addEventListener('addToCart', event => {
  //     spyListener();
  //     console.log('The button was clicked, and the window is listening', event);
  //   });
  //   const button = doc.querySelector('.add-to-cart');
  //   button.onclick = () => console.log('The button was clicked');
  //   expect(spyListener.callCount).toBe(0);
  //   button.click();
  //   expect(spyListener.callCount).toBe(1);
  // });
});

describe('<Item />', () => {
  const item = shallow(<Item product={testData[0]} />);

  it('fires add to cart event when add to cart button is clicked', () => {
    const spyListener = sinon.spy();
    const fakeEvent = {
      stopPropagation: () => {},
    };
    window.addEventListener('addToCart', spyListener);
    expect(spyListener.callCount).toBe(0);
    item.find('.add-to-cart').simulate('click', fakeEvent);
    expect(spyListener.callCount).toBe(1);
  });

  it('updates url when carousel item is clicked', () => {
    const spyGetProduct = sinon.spy(handle, 'getProduct');
    const carouselItem = item.find('.carousel-item-brian');
    carouselItem.simulate('click');
    const productId = spyGetProduct.args[0];
    expect(window.location.href.indexOf(productId)).toBeGreaterThan(-1);
  });

  it('fires getProduct event when carousel item is clicked', () => {
    const spyListener = sinon.spy();
    window.addEventListener('getProduct', spyListener);
    const carouselItem = item.find('.carousel-item-brian');
    expect(spyListener.callCount).toBe(0);
    carouselItem.simulate('click');
    expect(spyListener.callCount).toBe(1);
  });
});
