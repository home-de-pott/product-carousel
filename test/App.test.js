import '@babel/polyfill'; //for async

import waitUntil from 'async-wait-until';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import React from 'react';
import App from '../client/components/App';
import Item from '../client/components/Item';

import testData from './testData';
import handle from '../client/handlers/handle';

jest.mock('../client/http/http');
jest.setTimeout(30000);
Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  let app, cdmSpy;
  beforeAll(async () => {
    cdmSpy = sinon.spy(App.prototype, 'componentDidMount');
    app = mount(<App />);
    //wait until componentDidMount
    await waitUntil(() => cdmSpy.callCount === 1);
  });

  afterAll(() => {
    app.unmount();
  });
  it('calls componentDidMount', async () => {
    expect(cdmSpy.callCount).toBe(1);
  });

  it('Fetches related products after component mounts', () => {
    // Wait until the state has products
    //3 is the length of http/__mocks__/testData
    expect(app.state('products')).toHaveLength(3);
  });

  it('updates state with related products when getProduct event is propogated', async () => {
    const spySetState = sinon.spy(App.prototype, 'setState');
    const spyGetRelatedProducts = sinon.spy(
      App.prototype,
      'getRelatedProducts'
    );
    console.log(spySetState.called);
    expect(spySetState.called).toBe(false);
    window.dispatchEvent(new CustomEvent('getProduct', { detail: { id: 1 } }));
    await waitUntil(() => spySetState.called, 5000);
    //why does spyGetRelatedProducts never get called? The original clearly is called
    console.log(spySetState.called, spyGetRelatedProducts.called);
    expect(spySetState.called).toBe(true);
    expect(app.state().products.length).toBe(1);
  });
});

describe('<Item />', () => {
  const item = shallow(<Item product={testData[0]} />);
  it('fires add to cart event when add to cart button is clicked', () => {
    const spyListener = sinon.spy();
    const fakeEvent = {
      stopPropagation: () => {},
    };

    window.addEventListener('addToCart', spyListener);
    const button = item.find('.add-to-cart');
    expect(spyListener.callCount).toBe(0);
    button.simulate('click', fakeEvent); //passes fakeEvent to listener
    expect(spyListener.callCount).toBe(1);
  });

  it('updates url when carousel item is clicked', () => {
    const spyGetProduct = sinon.spy(handle, 'getProduct');
    const carouselItem = item.find('.carousel-item');
    carouselItem.simulate('click');
    const productId = spyGetProduct.args[0];
    expect(window.location.href.indexOf(productId)).toBeGreaterThan(-1);
  });

  it('fires getProduct event when carousel item is clicked', () => {
    const spyListener = sinon.spy();
    window.addEventListener('getProduct', spyListener);
    const carouselItem = item.find('.carousel-item');
    expect(spyListener.callCount).toBe(0);
    carouselItem.simulate('click');
    expect(spyListener.callCount).toBe(1);
  });
});
